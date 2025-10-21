export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  model: string;
  prompt: string;
  stream: boolean;
}

export interface ChatResponse {
  response: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

