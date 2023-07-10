import { useCallback } from 'react'

type TInputForm = {
    label: string
    placeholder: string
    buttonText: string
    id: string
    name?: string
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function InputForm({
    label,
    placeholder,
    buttonText,
    id,
    name,
    onSubmit,
}: TInputForm) {
    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            onSubmit?.(e)
        },
        [onSubmit]
    )

    return (
        <form onSubmit={handleSubmit} className="grid gap-2">
            <label htmlFor={id}>{label}</label>
            <textarea
                name={name || id}
                id={id}
                placeholder={placeholder}
                className="border-2 outline-none border-pink-200 focus:border-blue-700 rounded-lg p-2 w-full resize-none"
                rows={2}
            />
            <button className="py-2 px-10 bg-blue-900 text-white rounded-lg justify-self-end">
                {buttonText}
            </button>
        </form>
    )
}
