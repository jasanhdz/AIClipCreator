import { EVEN_LABS_API_KEY } from 'app/const/environments'

type Props = {
    content: string
    voiceId?: string
    audio: HTMLAudioElement
}

export function textToSpeechService({
    content,
    voiceId = 'EXAVITQu4vr4xnSDxMaL',
    audio,
}: Props): Promise<string> {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`

    const mediaSource = new MediaSource()
    audio.src = URL.createObjectURL(mediaSource)

    return new Promise((resolve, reject) => {
        mediaSource.addEventListener('sourceopen', () => {
            const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg')

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept-type': 'audio/mpeg',
                    'xi-api-key': `${EVEN_LABS_API_KEY}`,
                },
                body: JSON.stringify({
                    text: content,
                    model_id: 'eleven_multilingual_v1',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                    },
                }),
            }).then(async (response) => {
                if (!response.body || !response.ok) {
                    reject(
                        new Error(
                            `Error fetching text to speech: ${response.statusText}`
                        )
                    )
                    return
                }

                const reader = response.body.getReader()
                const chunks: Uint8Array[] = []

                const processStream = async () => {
                    while (true) {
                        const { done, value } = await reader.read()

                        if (done) {
                            mediaSource.endOfStream()
                            resolve(
                                URL.createObjectURL(
                                    new Blob(chunks, { type: 'audio/mpeg' })
                                )
                            )
                            break
                        }

                        if (sourceBuffer.updating) {
                            await new Promise((resolve) => {
                                sourceBuffer.addEventListener(
                                    'updateend',
                                    resolve,
                                    { once: true }
                                )
                            })
                        }

                        chunks.push(value)
                        sourceBuffer.appendBuffer(value)
                    }
                }

                await processStream()
            })
        })
    })
}
