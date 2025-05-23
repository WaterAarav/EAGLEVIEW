export interface Note {
  id: number;
  content: string;
  maxCharacters: number;
}

export interface NotesState {
  notes: Note[];
  currentPage: number;
  viewMode: 'notebook' | 'spread';
}

export type NotesAction = 
  | { type: 'SET_LINE'; pageId: number; content: string }
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { type: 'GOTO_PAGE'; pageId: number }
  | { type: 'TOGGLE_VIEW_MODE' }
  | { type: 'SET_VIEW_MODE'; mode: 'notebook' | 'spread' }
  | { type: 'RESET_NOTES' };