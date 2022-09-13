import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nb: number = 0;

  constructor(private dataSrv: DataService) {
    console.log("Home Page");
    this.dataSrv.str = 'Hello';
    console.log(this.dataSrv.str);
  }

  // Récupération d'un nombre aléatoire du service généré de manière synchrone
  getNumber() {    
    this.nb = this.dataSrv.getRandomNumber();
  }

  // Récupération asynchrone d'un nombre aléatoire à travers une promise
  // qui est ensuite traitée avec les mots-clés then et catch.
  getNumberThen() {
    this.dataSrv.getRandomNumberPromise().then((result: number) => {
      this.nb = result;
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      console.log("Fin !");
    });
  }

  // Récupération asynchrone d'un nombre aléatoire à travers une promise
  // grâce aux mots-clés async et await
  async getNumberAsync() {
    try {
      this.nb = await this.dataSrv.getRandomNumberPromise();
    } catch (error) {
      console.log(error);
    }
  }
}
