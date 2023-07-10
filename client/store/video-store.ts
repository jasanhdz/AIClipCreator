import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

type TVideoStore = {
    videoFile: File | null
    setVideoFile: (file: File) => void
    setVideoUrl: (url: string) => void
    videoUrl: string | null
    progressConversion: number
    setProgressConversion: (progress: number) => void
    isLoadingConversion: boolean
    setIsLoadingConversion: (isLoading: boolean) => void
    audioUrl: string | null
    setAudioUrl: (url: string | null) => void
    setAudioFile: (file: File) => void
    audioFile: File | null
}

const VideoStore: StateCreator<
    TVideoStore,
    [['zustand/devtools', TVideoStore]]
> = (set) => ({
    videoUrl: null,
    videoFile: null,
    setVideoFile: (file) => {
        const url = URL.createObjectURL(file)
        set({ videoFile: file, videoUrl: url })
    },
    setVideoUrl: (url) => set({ videoUrl: url }),
    progressConversion: 0,
    setProgressConversion: (progress) => set({ progressConversion: progress }),
    isLoadingConversion: false,
    setIsLoadingConversion: (isLoading) =>
        set({ isLoadingConversion: isLoading }),
    audioUrl: null,
    setAudioUrl: (url) => set({ audioUrl: url }),
    setAudioFile: (file) => set({ audioFile: file }),
    audioFile: null,
})

export const useVideoStore = create(devtools(VideoStore))
