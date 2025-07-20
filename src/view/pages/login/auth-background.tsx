"use client"

import { useEffect, useRef } from "react"

interface FloatingElement {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    rotation: number
    rotationSpeed: number
    type: "circle" | "square" | "triangle"
    color: string
}

export default function AuthBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const elementsRef = useRef<FloatingElement[]>([])
    const animationRef = useRef<number>()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createFloatingElements = () => {
            const elements: FloatingElement[] = []
            const elementCount = Math.floor((canvas.width * canvas.height) / 20000)

            const types: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"]
            const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]

            for (let i = 0; i < elementCount; i++) {
                elements.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    size: Math.random() * 15 + 5,
                    opacity: Math.random() * 0.4 + 0.1,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02,
                    type: types[Math.floor(Math.random() * types.length)],
                    color: colors[Math.floor(Math.random() * colors.length)],
                })
            }
            elementsRef.current = elements
        }

        const drawShape = (element: FloatingElement) => {
            ctx.save()
            ctx.translate(element.x, element.y)
            ctx.rotate(element.rotation)
            ctx.globalAlpha = element.opacity

            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, element.size)
            gradient.addColorStop(0, element.color)
            gradient.addColorStop(1, element.color + "00")

            ctx.fillStyle = gradient

            switch (element.type) {
                case "circle":
                    ctx.beginPath()
                    ctx.arc(0, 0, element.size, 0, Math.PI * 2)
                    ctx.fill()
                    break
                case "square":
                    ctx.fillRect(-element.size / 2, -element.size / 2, element.size, element.size)
                    break
                case "triangle":
                    ctx.beginPath()
                    ctx.moveTo(0, -element.size / 2)
                    ctx.lineTo(-element.size / 2, element.size / 2)
                    ctx.lineTo(element.size / 2, element.size / 2)
                    ctx.closePath()
                    ctx.fill()
                    break
            }

            ctx.restore()
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            elementsRef.current.forEach((element) => {
                // Update position
                element.x += element.vx
                element.y += element.vy
                element.rotation += element.rotationSpeed

                // Bounce off edges
                if (element.x < 0 || element.x > canvas.width) element.vx *= -1
                if (element.y < 0 || element.y > canvas.height) element.vy *= -1

                // Keep within bounds
                element.x = Math.max(0, Math.min(canvas.width, element.x))
                element.y = Math.max(0, Math.min(canvas.height, element.y))

                drawShape(element)
            })

            animationRef.current = requestAnimationFrame(animate)
        }

        resizeCanvas()
        createFloatingElements()
        animate()

        window.addEventListener("resize", () => {
            resizeCanvas()
            createFloatingElements()
        })

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            window.removeEventListener("resize", resizeCanvas)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" style={{ zIndex: 1 }} />
}
