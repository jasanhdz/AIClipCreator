import { BsFillLightningChargeFill } from 'react-icons/bs'

type Props = {
    videoFile: File | null
    videoUrl?: string
    transformVideo?: () => void
}

export default function Video({ videoFile, videoUrl, transformVideo }: Props) {
    return (
        <div>
            <div className="flex justify-between">
                <span className="font-bold text-lg mb-2 ellipsis-1">
                    Tu video: {videoFile?.name}
                </span>
                <button onClick={transformVideo}>
                    <BsFillLightningChargeFill className="text-2xl" />
                </button>
            </div>
            <video
                className="mx-auto max-h-full object-contain"
                style={{ maxHeight: '85vh' }}
                id="video"
                src={videoUrl}
                controls
                muted
            >
                Tu navegador no soporta videos
            </video>
        </div>
    )
}
