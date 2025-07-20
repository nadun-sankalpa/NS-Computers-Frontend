import React from 'react';

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
