import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pseudo: string = '';
  difficulties: string[] = ['easy', 'medium', 'hard'];
  difficulty: string = 'easy';
  save: boolean = true;

  async ngOnInit() {
      const { value } = await Preferences.get({ key: 'pseudo' });
      this.pseudo = value;
      console.log('recup pseudo :' + this.pseudo);
  }

  constructor(private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router) {}

  async begin() {
    if (this.pseudo.length >= 3) {

      console.log(this.save);
      if (this.save) {
        //const setPseudo = async () => {
          await Preferences.set({
            key: 'pseudo',
            value: this.pseudo,
          });
        //};
        console.log('save pseudo: ' + this.pseudo);
        //const setDifficulty = async () => {
          await Preferences.set({
            key: 'difficulty',
            value: this.difficulty
          });
          console.log('save difficulty: ' + this.difficulty);
        //};
      } else {
        const removePseudo = async () => {
          await Preferences.remove({ key: 'pseudo' });
        };
        const removeDifficulty = async () => {
          await Preferences.remove({ key: 'difficulty' });
        };
      }
      
      //this.hideForm = true;
      //this.loadListQuestions();
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
