declare const ChatCompletionRequestMessageRoleEnum: {
    readonly System: 'system'
    readonly User: 'user'
    readonly Assistant: 'assistant'
}

declare type ChatCompletionRequestMessageRoleEnum =
    (typeof ChatCompletionRequestMessageRoleEnum)[keyof typeof ChatCompletionRequestMessageRoleEnum]

interface ChatCompletionRequestMessage {
    /**
     * The role of the author of this message.
     * @type {string}
     * @memberof ChatCompletionRequestMessage
     */
    role: ChatCompletionRequestMessageRoleEnum
    /**
     * The contents of the message
     * @type {string}
     * @memberof ChatCompletionRequestMessage
     */
    content: string
    /**
     * The name of the user in a multi-user chat
     * @type {string}
     * @memberof ChatCompletionRequestMessage
     */
    name?: string
}

type GPTResponseData = {
    content: string
    role: 'system' | 'user' | 'assistant'
}

type GPTRequestData = {
    message: string
    botId: string | null
    chatId: string | null
    lastMessages: ChatCompletionRequestMessage[]
}

type OpenAIModel =
    | 'gpt-3.5-turbo'
    | 'gpt-4'
    | 'davinci'
    | 'curie'
    | 'babbage'
    | 'ada'
    | 'content-filter-alpha-c4'
    | 'content-filter-dev'

type TCompletionConfig = {
    model: OpenAIModel
    messages: ChatCompletionRequestMessage[]
}
