export interface ContextItem {
  id: string;
  text: string;
  timestamp: number;
}

export interface AppState {
  currentContext: ContextItem | null;
  history: ContextItem[];
}