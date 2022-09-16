import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pseudo: string = '';
  difficulties: string[] = ['easy', 'medium', 'hard'];
  difficulty: string = 'easy';
  saveInfos: boolean = false;
  score: number = 0;

  constructor(private alertCtrl: AlertController, private router: Router) {}

  async ngOnInit() {
    let pseudo: any = await Preferences.get({ key: 'pseudo' });
    let diff: any = await Preferences.get({ key: 'difficulty' });
    let score: any = await Preferences.get({ key: 'score' });
    if (pseudo.value) {
      this.pseudo = pseudo.value;
    }
    if (diff.value) {
      this.difficulty = diff.value;
    }
    if (score.value) {
      this.score = score.value;
    }
  }

  async begin() {
    if (this.pseudo.length >= 3) {
      if (this.saveInfos) {
        await Preferences.set({ key: 'pseudo', value: this.pseudo });
        await Preferences.set({ key: 'difficulty', value: this.difficulty });
      } else {
        await Preferences.remove({ key: 'pseudo' });
        await Preferences.remove({ key: 'difficulty' });        
        await Preferences.remove({ key: 'score' });
      }
      this.router.navigate(['/game', this.pseudo, this.difficulty, this.score, this.saveInfos]);
    } else {
      const alert = await this.alertCtrl.create({
        header: "Informations manquantes",
        message: 'Veuillez rentrer un pseudo de 3 caractères minimum.',
      });
      alert.present();
    }
  }
}
