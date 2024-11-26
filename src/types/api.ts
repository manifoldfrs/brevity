export interface SummaryResponse {
  summary: string;
  keyPoints: string[];
  confidence: number;
  processingTimeMs: number;
}

export interface ErrorResponse {
  error: string;
  code: string;
  details?: unknown;
}

export type ApiResponse<T> =
  | { success: true; data: T; }
  | { success: false; error: ErrorResponse; };