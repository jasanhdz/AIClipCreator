type Props = {
    name?: string
    setFile?: (file: File) => void
    label?: string
}

export default function UploadFileForm({
    name,
    setFile,
    label = 'Sube Tu video para procesarlo...',
}: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (files) {
            const file = files[0]
            console.log(file)
            setFile?.(file)
        }
    }

    return (
        <div>
            <h2 className="font-bold text-lg mb-2">{label}</h2>
            <div className="px-4 py-6 border flex items-center justify-center">
                <input
                    onChange={handleChange}
                    type="file"
                    name={name}
                    id="file"
                />
            </div>
        </div>
    )
}
