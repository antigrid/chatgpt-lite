import type { ChatMessage } from '@/lib/types'
import { DefaultChatTransport } from 'ai'

export function createChatTransport() {
  return new DefaultChatTransport<ChatMessage>({
    api: '/api/chat',
    prepareSendMessagesRequest: ({ messages, body, headers }) => {
      const prompt = typeof body?.prompt === 'string' ? body.prompt : ''
      const reasoningEffort = typeof body?.reasoningEffort === 'string' ? body.reasoningEffort : undefined

      return {
        headers: {
          ...headers,
          Accept: 'text/event-stream'
        },
        body: {
          prompt,
          reasoningEffort,
          messages: messages.map(({ role, parts }) => ({ role, parts }))
        }
      }
    }
  })
}
