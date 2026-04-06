import { chatMessageSchema } from '@/lib/chat-message-contract'
import { DEFAULT_REASONING_EFFORT, REASONING_EFFORT_VALUES } from '@/lib/types'
import { z } from 'zod'

// --- Request schema ---

export const chatRequestSchema = z.object({
  prompt: z.string().trim().min(1),
  reasoningEffort: z.enum(REASONING_EFFORT_VALUES).default(DEFAULT_REASONING_EFFORT),
  messages: z.array(chatMessageSchema)
})

export type ChatRequest = z.infer<typeof chatRequestSchema>
