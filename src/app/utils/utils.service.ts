import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  public getRandomInteger(min: number, max: number): number {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

}
