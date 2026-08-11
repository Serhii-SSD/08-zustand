'use server';

import { createNote } from './api';
import type { CreateNoteParams } from './api';
import { revalidatePath } from 'next/cache';

export async function createNoteAction(formData: FormData) {
  const note: CreateNoteParams = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    tag: formData.get('tag') as CreateNoteParams['tag'],
  };

  const result = await createNote(note);
  revalidatePath('/notes/filter/all');
  return result;
}