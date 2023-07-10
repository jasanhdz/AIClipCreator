import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

export type TChangeAspectRatio = {
    videoFile: File
    outputName?: string
    setProgress?: (progress: number) => void
}

const ffmpeg = createFFmpeg({ log: true })

export async function changeAspectRatio({
    videoFile,
    outputName = 'output',
    setProgress,
}: TChangeAspectRatio) {
    await ffmpeg.load()

    ffmpeg.FS('writeFile', 'temp.mp4', await fetchFile(videoFile))

    ffmpeg.setProgress(({ ratio }) => {
        setProgress?.(ratio)
    })

    await ffmpeg.run(
        '-i',
        'temp.mp4',
        '-vf',
        'crop=ih*(9/16):ih',
        '-crf',
        '21',
        '-c:a',
        'copy',
        `${outputName}.mp4`
    )

    const data = ffmpeg.FS('readFile', `${outputName}.mp4`)

    console.log({
        data,
    })

    return new Blob([data.buffer], { type: 'video/mp4' })
}
