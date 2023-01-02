import { Message } from './message';

const now: Date = new Date();

export const CHAT: Message[] = [
  { convId: '0', fromId: '0', text: 'Dr. Nice', datetime: now},
  { convId: '1', fromId: '1', text: 'Bombasto', datetime: now},
  { convId: '2', fromId: '0', text: 'Celeritas', datetime: now},
  { convId: '3', fromId: '1', text: 'Magneta', datetime: now},
  { convId: '4', fromId: '1', text: 'RubberMan', datetime: now},
  { convId: '5', fromId: '0', text: 'Dynama', datetime: now},
  { convId: '6', fromId: '0', text: 'Dr. IQ', datetime: now},
  { convId: '7', fromId: '1', text: 'Magma', datetime: now},
  { convId: '8', fromId: '1', text: 'Tornado', datetime: now}
];