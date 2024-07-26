import { z } from 'zod';

export const addCampaignFormSchema = z.object({
	campaignname: z
		.string({ required_error: 'Campaign Name is required' })
		.min(5, 'Enter minimum 5 letters name'),
	startdate: z.string(),
	enddate: z.string(),
	Assistant: z.object({
		value: z.string(),
		label: z.string()
	}).refine((Assistant) => Assistant.label.length > 0 && Assistant.value.length > 0, {
		message: "At least one option must be selected",
	  }),
	Client: z.object({
		value: z.string(),
		label: z.string()
	}).refine((Client) => Client.label.length > 0 && Client.value.length > 0, {
		message: "At least one option must be selected",
	  }),
	script: z.string(),
	desiredoutcome: z.string(),
	description: z.string()
});

export type AddCampaignFormType = typeof addCampaignFormSchema;
