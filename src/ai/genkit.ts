/**
 * @fileoverview This file initializes the Genkit AI instance.
 */
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { defineDotprompt, fromObject } from '@genkit-ai/dotprompt';

export const ai = genkit({
  plugins: [
    googleAI(),
    defineDotprompt({
      prompt: fromObject({
        templates: "prompts.d.ts"
      })
    })
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
