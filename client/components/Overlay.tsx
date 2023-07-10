import React from 'react'

type Props = {
    children?: React.ReactNode
    className?: string
    onClose?: () => void
}

export default function Overlay({ children, className, onClose }: Props) {
    return (
        <div className="z-10 fixed inset-0 flex justify-center items-center">
            <div
                className="bg-slate-500 opacity-70 absolute inset-0 z-40"
                onClick={onClose}
            />
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative z-50 bg-white ${className}`}
            >
                {children}
            </div>
        </div>
    )
}
