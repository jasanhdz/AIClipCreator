import { useVideoStore } from 'app/store/video-store'
import Video from './Video'

type Props = {
    transformVideo: () => void
}

export default function VideoPlayer({ transformVideo }: Props) {
    const { videoUrl, videoFile } = useVideoStore((state) => state)

    if (!videoUrl) return null

    return (
        <div className="grid">
            <Video
                transformVideo={transformVideo}
                videoFile={videoFile}
                videoUrl={videoUrl}
            />
        </div>
    )
}
