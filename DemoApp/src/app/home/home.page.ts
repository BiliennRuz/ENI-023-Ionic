import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  hello: string = "Hello all !";
  nb: number = 0;
  isHidden: boolean = true;
  name: string = "Titi";
  fruits: string[] = ["papaye", "framboise", "citron", "kiwi", "banane"];
  colorText: string = "#AA0000";

  constructor() {}

  clickMe() {
    this.hello = "Ce tombeau sera votre tombeau !";
    this.nb++;
    this.isHidden = !this.isHidden;
  }
}
