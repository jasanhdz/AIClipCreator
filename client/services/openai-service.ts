import { OPENAI_API_KEY } from 'app/const/environments'

type TOpenAIStream = {
    messages: ChatCompletionRequestMessage[]
    model: OpenAIModel
    callback?: (text: string) => void
}

export async function openAIStream({
    messages,
    model,
    callback,
}: TOpenAIStream): Promise<void> {
    return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model,
            messages,
            temperature: 0,
            stream: true,
        }),
    }).then(async (response) => {
        if (!response.body || !response.ok) {
            throw new Error(
                `Error fetching GPT completion: ${response.statusText}`
            )
        }
        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        let buffer = ''

        const processStream = async () => {
            const { value, done } = await reader.read()

            if (done) {
                return
            }

            buffer += decoder.decode(value, { stream: true })
            let index = buffer.indexOf('\n')

            while (index > -1) {
                const line = buffer.slice(0, index).trim()
                buffer = buffer.slice(index + 1)
                index = buffer.indexOf('\n')

                const cleanLine = line.replace(/^data: /, '')
                if (cleanLine === '[DONE]') {
                    return
                }

                if (cleanLine) {
                    const parsedLine = JSON.parse(cleanLine)
                    const { content } = parsedLine.choices[0].delta as {
                        content?: string
                    }
                    if (content) {
                        callback?.(content)
                    }
                }
            }

            await processStream()
        }

        await processStream()
    })
}
