import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  expandProp: string = 'full';

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: "ALERTE !",
      message: "Ceci est une alerte !",
      buttons: ['OK'],
    });
    alert.present();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      header: 'Toast',
      message: 'Toastons !',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  htmlBtn() {
    this.expandProp = undefined;
  }

  ionBtn() {
    if (this.expandProp == 'full') {
      this.expandProp = 'block';
    } else {
      this.expandProp = 'full';
    }
  }
}
