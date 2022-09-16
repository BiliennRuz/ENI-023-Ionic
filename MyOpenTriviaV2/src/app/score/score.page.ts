import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  score: string = ''

  constructor(private activatedRoute: ActivatedRoute,
    private navCtrl: NavController) { }

  async ngOnInit() {
    this.score = this.activatedRoute.snapshot.params.score;
    await Preferences.set({
      key: 'score',
      value: this.score,
    });
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }

}
