import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pseudo: string = "";
  level: String = "";
  errorMessage: string = "";
  ErrorIsHidden: boolean = false;
  colorText: string = "blue";
  colorTextError: string = "red";
  formIsHidden: boolean = false;
  questionIsHidden: boolean = false;
  question: string = "De quelle couleur est le cheval blanc d'Henry IV";
  reponses: string[] = ["Blanc", "Noir", "Marron", "Je ne sais pas"];
  questionSuivanteIsHidden: boolean = false;

  
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  clickMe() {
    if (this.pseudo.length <3) {
      this.ErrorIsHidden = false;
      this.showAlertPseudo();
    } else {
      this.ErrorIsHidden = true;
    }

    if (this.level=="") {
      this.ErrorIsHidden = false;
      this.showAlertLevel();
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

  async showAlertPseudo() {
    const alert = await this.alertCtrl.create({
      header: "ALERTE !",
      message: "Veuillez rentrer un pseudo de 3 caractère minimum !",
      buttons: ['OK'],
    });
    alert.present();
  }

  async showAlertLevel() {
    const alert = await this.alertCtrl.create({
      header: "ALERTE !",
      message: "Veuillez selectionner un niveau !",
      buttons: ['OK'],
    });
    alert.present();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Votre réponse est : A',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

}
