import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pseudo: string = "";
  level: String = "";
  errorMessage: string = "";
  ErrorIsHidden: boolean = true;
  colorTextError: string = "red";
  formIsHidden: boolean = false;
  questionIsHidden: boolean = true;
  question: string = "De quelle couleur est le cheval blanc d'Henry IV";
  reponses: string[] = ["Blanc", "Noir", "Marron", "Je ne sais pas"];
  questionSuivanteIsHidden: boolean = true;

  
  constructor() {}

  clickMe() {
    if (this.pseudo.length <3) {
      this.ErrorIsHidden = false;
      this.errorMessage = "Veuillez rentrer un pseudo de 3 caractère minimum !";
    } else {
      this.ErrorIsHidden = true;
    }

    if (this.level=="") {
      this.ErrorIsHidden = false;
      this.errorMessage = "Veuillez selectionner un niveau !";
    } else {
      this.ErrorIsHidden = true;
    }

    if (this.ErrorIsHidden == true) {
      this.formIsHidden = true;
      this.questionIsHidden = false;
    }

  }

  clickRequest() {
    this.questionSuivanteIsHidden = false;
  }

}
