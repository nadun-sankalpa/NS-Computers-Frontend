import React from 'react';

export function CardTitle({ children }: { children: React.ReactNode }) {
    return <h3 className="text-xl font-bold mb-2">{children}</h3>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
    return <div className="text-lg font-semibold mb-2">{children}</div>;
}

export function CardDescription({ children }: { children: React.ReactNode }) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">{children}</p>;
}

export function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-lg shadow-md p-4 bg-white dark:bg-zinc-900">
            {children}
        </div>
    );
}

export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="text-sm text-zinc-700 dark:text-zinc-300">{children}</div>;
}

export function CardFooter({ children }: { children: React.ReactNode }) {
    return <div className="flex items-center justify-between pt-4">{children}</div>;
}
