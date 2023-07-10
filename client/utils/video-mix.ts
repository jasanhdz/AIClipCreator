import type { TChangeAspectRatio } from './video-format'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({ log: true })

interface TAddAudioToVideo extends TChangeAspectRatio {
    audioFile: File
}

export async function addAudioToVideo({
    videoFile,
    audioFile,
    setProgress,
}: TAddAudioToVideo) {
    await ffmpeg.load()

    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile))
    ffmpeg.FS('writeFile', 'audio.mp3', await fetchFile(audioFile))

    await ffmpeg.run(
        '-i',
        'input.mp4',
        '-i',
        'audio.mp3',
        '-c:v',
        'copy',
        '-c:a',
        'aac',
        '-map',
        '0:v:0',
        '-map',
        '1:a:0',
        '-shortest',
        'output.mp4'
    )

    const data = ffmpeg.FS('readFile', 'output.mp4')

    return new Blob([data.buffer], { type: 'video/mp4' })
}
