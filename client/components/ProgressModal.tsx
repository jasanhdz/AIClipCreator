import { useVideoStore } from 'app/store/video-store'
import Overlay from './Overlay'

function ProgressModal() {
    const { progressConversion, isLoadingConversion } = useVideoStore(
        (state) => state
    )
    const progress = (progressConversion * 100).toFixed(0)

    if (!isLoadingConversion) return null

    return (
        <Overlay className="p-7 rounded-lg">
            <div>
                <h3>Progreso de conversión</h3>
                <div className="h-8 w-full bg-gray-400 rounded-md overflow-hidden my-4">
                    <div
                        className="h-full bg-blue-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-center">{progress}%</p>
            </div>
        </Overlay>
    )
}

export default ProgressModal
