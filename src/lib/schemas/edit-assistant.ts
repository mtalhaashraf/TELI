import { z } from 'zod';

export const editAssistantFormSchema = z.object({
	name: z.string().min(2).max(40),
	firstMessage: z.string(),
	systemPrompt: z.string()
});

export type EditAssistantFormType = typeof editAssistantFormSchema;
