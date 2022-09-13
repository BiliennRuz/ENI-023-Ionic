import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  str: string = '';

  constructor() {
    console.log("Data Service");
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 100);
  }

  getRandomNumberPromise(): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(Math.floor(Math.random() * 100));
      reject(-1);
    })
  }
}
