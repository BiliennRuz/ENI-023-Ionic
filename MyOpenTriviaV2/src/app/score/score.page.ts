import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  score: string = ''

  constructor(private activatedRoute: ActivatedRoute,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.score = this.activatedRoute.snapshot.params.score;
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }

}
