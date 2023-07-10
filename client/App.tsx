import { useVideoStore } from './store/video-store'
import { useUIStore } from './store/ui-store'
import { changeAspectRatio } from './utils/video-format'
import { addAudioToVideo } from './utils/video-mix'
import {
    Navbar,
    InputForm,
    ModalResult,
    ProgressModal,
    UploadFileForm,
    VideoPlayer,
} from 'app/components'
import { useCallback } from 'react'
import { openAIStream } from './services/openai-service'

export default function App() {
    const {
        videoFile,
        setVideoUrl,
        setProgressConversion,
        setIsLoadingConversion,
        setVideoFile,
        setAudioFile,
        audioFile,
    } = useVideoStore((state) => state)
    const { setShowModal, setMessage } = useUIStore((state) => state)

    const convertToTiktok = async () => {
        if (!videoFile) return
        setIsLoadingConversion(true)

        changeAspectRatio({
            videoFile,
            setProgress: setProgressConversion,
        })
            .then((blob) => {
                const newURL = URL.createObjectURL(blob)
                setVideoUrl(newURL)
                const newFile = new File([blob], videoFile.name, {
                    type: 'video/mp4',
                })
                setVideoFile(newFile)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoadingConversion(false)
            })
    }

    const handleLoadAudioToVideo = () => {
        if (!videoFile || !audioFile) return

        setIsLoadingConversion(true)
        addAudioToVideo({
            videoFile,
            audioFile,
            setProgress: setProgressConversion,
            outputName: 'video-with-audio',
        })
            .then((blob) => {
                const newURL = URL.createObjectURL(blob)
                setVideoUrl(newURL)
                const newFile = new File([blob], videoFile.name, {
                    type: 'video/mp4',
                })
                setVideoFile(newFile)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoadingConversion(false)
            })
    }

    const handleSaveMessage = useCallback((message: string) => {
        setMessage((prev) => prev + message)
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget)
        const guide = formData.get('guide')

        if (!guide) return
        setShowModal(true)

        const messagesSystem = {
            role: 'system',
            content:
                'Eres un asistente para crear textos para videos de tiktok y reels de instagram y youtube, los textos que relizas no tienen mas de 75 palabras',
        }
        const messagesUser = { role: 'user', content: guide }
        const messages = [
            messagesSystem,
            messagesUser,
        ] as ChatCompletionRequestMessage[]

        openAIStream({
            messages,
            model: 'gpt-3.5-turbo',
            callback: handleSaveMessage,
        }).finally(() => {
            console.log('finish')
        })
    }

    return (
        <>
            <ProgressModal />
            <Navbar />
            <ModalResult />
            <main
                className="px-4 2xl:px-0 mx-auto max-w-8xl"
                style={{ height: 'calc(100vh - 48px)' }}
            >
                <div className="grid grid-cols-12 h-full">
                    <div className="col-span-3 h-full dark:bg-slate-600 px-2 py-3 border-r border-gray-200">
                        <UploadFileForm
                            label="Sube tu audio"
                            name="audio"
                            setFile={setAudioFile}
                        />
                        <button
                            onClick={handleLoadAudioToVideo}
                            className="bg-blue-500 py-2 my-3 mx-auto block px-4 rounded-lg text-white outline-none"
                        >
                            Montar audio
                        </button>
                        <InputForm
                            buttonText="Generar guión"
                            placeholder="Escribe tu guión aquí..."
                            name="guide"
                            onSubmit={handleSubmit}
                            label="Escribe tu guión aquí..."
                            id="guide"
                        />
                    </div>
                    <div className="col-span-9 h-full dark:bg-slate-900 px-2 py-3">
                        {!videoFile && (
                            <UploadFileForm
                                label="Sube tu video"
                                name="video"
                                setFile={setVideoFile}
                            />
                        )}
                        <VideoPlayer transformVideo={convertToTiktok} />
                    </div>
                </div>
            </main>
        </>
    )
}
