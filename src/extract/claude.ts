import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { Usage } from "../types.js";
import { EMPTY_EXTRACTION, ExtractionSchema, type Extraction } from "./schema.js";
import { SYSTEM_PROMPT, renderUserMessage, type ExtractionInput } from "./prompt.js";

export interface Extractor {
  readonly name: string;
  extract(input: ExtractionInput): Promise<{ result: Extraction; usage: Usage | null }>;
}

/** Returns nothing. Used by tests and by `--dry-run` to exercise the pipeline without a model. */
export class NullExtractor implements Extractor {
  readonly name = "null";
  async extract(): Promise<{ result: Extraction; usage: Usage | null }> {
    return { result: EMPTY_EXTRACTION, usage: null };
  }
}

export interface ClaudeExtractorOptions {
  model: string;
  effort?: "low" | "medium" | "high" | "xhigh" | "max";
  client?: Anthropic;
}

/**
 * One structured-output call per thread. Server-side refusal fallbacks are enabled by default on the
 * models that support them (Opus 5.x, Sonnet 5.5, Fable). Haiku has no fallback path.
 */
export class ClaudeExtractor implements Extractor {
  readonly name: string;
  private readonly client: Anthropic;
  private readonly model: string;
  private readonly effort: ClaudeExtractorOptions["effort"];

  constructor(opts: ClaudeExtractorOptions) {
    this.client = opts.client ?? new Anthropic();
    this.model = opts.model;
    this.name = opts.model;
    this.effort = opts.effort;
  }

  async extract(input: ExtractionInput): Promise<{ result: Extraction; usage: Usage | null }> {
    const supportsFallback = /^claude-(opus-5|sonnet-5-5|fable)/.test(this.model);
    const userText = renderUserMessage(input);
    let lastErr: unknown = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await this.client.beta.messages.parse({
          model: this.model,
          max_tokens: 16000,
          system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
          messages: [{ role: "user", content: userText }],
          output_config: {
            format: zodOutputFormat(ExtractionSchema),
            ...(this.effort ? { effort: this.effort } : {}),
          },
          ...(supportsFallback ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" } : {}),
        });
        const usage: Usage = {
          model: response.model,
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
          cacheReadTokens: response.usage.cache_read_input_tokens ?? 0,
          cacheWriteTokens: response.usage.cache_creation_input_tokens ?? 0,
        };
        if (response.stop_reason === "refusal") {
          return { result: { ...EMPTY_EXTRACTION, notes: `model refused: ${response.stop_details?.explanation ?? "no explanation"}` }, usage };
        }
        if (response.stop_reason === "max_tokens") {
          return { result: { ...EMPTY_EXTRACTION, notes: "truncated at max_tokens" }, usage };
        }
        if (!response.parsed_output) {
          lastErr = new Error("parsed_output was null (schema mismatch)");
          continue;
        }
        return { result: response.parsed_output, usage };
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError || err instanceof Anthropic.InternalServerError || err instanceof Anthropic.APIConnectionError) {
          lastErr = err;
          await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
          continue;
        }
        throw err;
      }
    }
    throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
  }
}
