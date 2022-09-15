import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pseudo: string = '';
  difficulties: string[] = ['easy', 'medium', 'hard'];
  difficulty: string = 'easy';

  constructor(private alertCtrl: AlertController, private router: Router) {}

  async begin() {
    if (this.pseudo.length >= 3) {
      this.router.navigate(['/game', this.pseudo, this.difficulty]);
    } else {
      const alert = await this.alertCtrl.create({
        header: "Informations manquantes",
        message: 'Veuillez rentrer un pseudo de 3 caractères minimum.',
      });
      alert.present();
    }
  }
}
