import { apiGet } from './client';
import type { EventItem } from '../types/events';

export async function fetchAllEvents(): Promise<EventItem[]> {
  return apiGet<EventItem[]>('/events');
}

export async function fetchEventById(id: string): Promise<EventItem> {
  return apiGet<EventItem>(`/events/${id}`);
}


