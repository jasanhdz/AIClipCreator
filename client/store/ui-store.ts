import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

type TUIStore = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
    showAudio: boolean
    setShowAudio: (showAudio: boolean) => void
    message: string
    setMessage: (message: string | ((prevState: string) => string)) => void
}

const UIStore: StateCreator<TUIStore, [['zustand/devtools', TUIStore]]> = (
    set
) => ({
    showModal: false,
    setShowModal: (showModal) => set({ showModal }),
    showAudio: false,
    setShowAudio: (showAudio) => set({ showAudio }),
    message: '',
    setMessage: (message: string | ((prevState: string) => string)) => {
        set((state) => ({
            message:
                typeof message === 'function'
                    ? message(state.message)
                    : message,
        }))
    },
})

export const useUIStore = create(devtools(UIStore))
