import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from 'model/room'
import { ROOMS } from 'model/mock-rooms'

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor() { }

  getRooms(): Observable<Room[]> {
    const rooms = of(ROOMS);
    return rooms;
  }
}
