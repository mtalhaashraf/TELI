import { z } from 'zod';

export const addAssistantFormSchema = z.object({
	name: z.string().max(40),
	firstMessage: z.string(),
	systemPrompt: z.string()
});

export type AddAssistantFormType = typeof addAssistantFormSchema;
