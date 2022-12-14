import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  str: string = '';
  baseUrl: string = "https://cataas.com";
  user: any = {
    'name': '',
    'id': 0,
    'city': ''
  };
  data: any;

  constructor(private http: HttpClient) {
    console.log("Data Service");
  }

  getData() {
    return this.data;
  }

  setData(d: any) {
    this.data = d;
  }

  getCat(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + "/cat?json=true").toPromise().then((result: any) => {
        console.log(result);
        resolve(this.baseUrl + result.url);
        reject("Impossible de récupérer l'image : vérifiez votre connexion internet.");
      });
    });
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
