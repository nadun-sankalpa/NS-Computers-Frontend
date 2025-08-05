"use client";

import React from 'react';

export const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Floating particles with red variants */}
            {[...Array(25)].map((_, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full animate-pulse ${
                        i % 4 === 0
                            ? "w-2 h-2 bg-red-400/50"
                            : i % 4 === 1
                            ? "w-1 h-1 bg-red-500/40"
                            : i % 4 === 2
                            ? "w-1.5 h-1.5 bg-cyan-400/35"
                            : "w-1 h-1 bg-red-600/30"
                    }`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        animationDuration: `${2 + Math.random() * 4}s`,
                    }}
                />
            ))}

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-red-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" />
            <div
                className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-gradient-to-r from-cyan-500/10 to-red-500/12 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
            />
            <div
                className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-r from-red-600/8 to-orange-500/8 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "2s" }}
            />
        </div>
    );
};

export default AnimatedBackground;
