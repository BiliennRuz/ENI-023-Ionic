import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pseudo: string = '';
  difficulties: string[] = ['easy', 'medium', 'hard'];
  difficulty: string = 'easy';
  nextQuestion: boolean = false;
  hideForm: boolean = false;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  async begin() {
    if (this.pseudo.length >= 3) {
      this.hideForm = true;
    } else {
      const alert = await this.alertCtrl.create({
        header: "Informations manquantes",
        message: 'Veuillez rentrer un pseudo de 3 caractères minimum.',
      });
      alert.present();
    }
  }

  async answer(ans: string) {
    this.nextQuestion = true;
    const toast = await this.toastCtrl.create({
      message : 'Votre réponse est : ' + ans,
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }
}
