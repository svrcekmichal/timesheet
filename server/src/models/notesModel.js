// @flow

import type {Note} from "./../globalFlowTypes";

let noteId = 1;

const notes: Array<Note> = [];

export const getWeekNotes = (weekId: number) => notes.filter(note => note.weekId === weekId);

export const addNote = (userId: number, weekId: number, message: string): Note => {
  const note = {
    id: noteId++,
    userId,
    weekId,
    message
  }
  notes.push(note);
  return note;
}