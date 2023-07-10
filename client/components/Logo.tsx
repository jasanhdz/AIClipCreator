import React from 'react'
import logo from '../reelMaker.svg'

type Props = {
    size?: number
}

export default function Logo({}: Props) {
    return (
        <div className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <p className="font-sans font-bold text-gray-900 text-2xl">
                ReelMaker
            </p>
        </div>
    )
}
