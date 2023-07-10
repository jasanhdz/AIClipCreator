import { textToSpeechService } from 'app/services/text-to-speech-service'
import Overlay from './Overlay'
import { useUIStore } from 'app/store/ui-store'
import { useRef } from 'react'
import { useVideoStore } from 'app/store/video-store'

export default function ModalResult() {
    const {
        setShowModal,
        showModal,
        showAudio,
        setShowAudio,
        message,
        setMessage,
    } = useUIStore((state) => state)
    const { audioUrl, setAudioUrl } = useVideoStore((state) => state)
    const audioRef = useRef<HTMLAudioElement>(null)
    const handleCloseModal = () => {
        setShowModal(false)
        audioRef.current?.pause()
        audioRef.current?.removeAttribute('src')
        setMessage('')
    }

    const handleConvertToAudio = () => {
        setShowAudio(true)
        textToSpeechService({
            content: message,
            audio: audioRef.current!,
        }).then((url) => {
            console.log('finished')
            console.log(url)
            setAudioUrl(url)
        })
    }

    if (!showModal) return null

    return (
        <Overlay
            className="max-w-2xl py-3 px-4 rounded-md"
            onClose={handleCloseModal}
        >
            <h3 className="text-lg font-bold mb-2">
                Este es el resultado de tu guion generado por IA
            </h3>
            <p>{message}</p>
            <div className="flex justify-center">
                <button
                    onClick={handleConvertToAudio}
                    className="bg-blue-500 mt-10 py-2 px-5 text-white rounded-md w-fit"
                >
                    Convertir texto a 📢
                </button>

                <audio
                    className={showAudio ? 'block' : 'hidden'}
                    ref={audioRef}
                    autoPlay
                    controls
                ></audio>

                {audioUrl && (
                    <a download="audio.mp3" href={audioUrl}>
                        Descargar audio
                    </a>
                )}
            </div>
        </Overlay>
    )
}
