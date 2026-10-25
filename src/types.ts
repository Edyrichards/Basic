/** Normalized activity item from any source. One row per Slack message, calendar event, or note. */
export type Source = "slack" | "calendar" | "notes";

export interface Message {
  /** Stable id: `${source}:${tenant}:${nativeId}` */
  id: string;
  source: Source;
  /** Client / company this activity belongs to. Never mixed across tenants. */
  tenant: string;
  /** Grouping key for extraction: Slack thread_ts, calendar UID, note path. */
  threadId: string;
  channel: string;
  /** ISO 8601 timestamp */
  ts: string;
  authorId: string | null;
  authorName: string | null;
  text: string;
  /** Display names of people involved (thread participants, attendees). */
  participants: string[];
  meta: Record<string, unknown>;
}

export type Direction = "outbound" | "inbound";
export type ObligationState = "open" | "aging" | "done" | "dropped" | "renegotiated";

export interface Evidence {
  messageId: string;
  kind: "origin" | "update" | "close";
  quote: string;
  ts: string;
}

export interface Obligation {
  id: string;
  tenant: string;
  direction: Direction;
  counterparty: string;
  summary: string;
  /** ISO date (YYYY-MM-DD) or null when no deadline was stated. */
  dueDate: string | null;
  /** The literal phrase the deadline came from, for audit. */
  dueText: string | null;
  conditional: string | null;
  state: ObligationState;
  confidence: number;
  createdAt: string;
  updatedAt: string;
  /** Model-proposed row not yet reviewed by the user. */
  reviewed: boolean;
  closeReason: string | null;
  originThreadId: string;
}

export type ProposalType = "close" | "nudge";
export type ProposalStatus = "pending" | "accepted" | "rejected";

export interface Proposal {
  id: string;
  obligationId: string;
  type: ProposalType;
  /** For close: evidence quote. For nudge: the draft text. Never sent anywhere by the system. */
  body: string;
  evidenceMessageId: string | null;
  createdAt: string;
  status: ProposalStatus;
}

export interface Thread {
  key: string; // `${tenant}|${source}|${threadId}`
  tenant: string;
  source: Source;
  threadId: string;
  channel: string;
  messages: Message[];
}

export interface Usage {
  model: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
}
