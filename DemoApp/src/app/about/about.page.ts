import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  pseudo: string = '';
  id: number = 0;

  constructor(private dataSrv: DataService, 
    private activatedRoute: ActivatedRoute, 
    private navCtrl: NavController) {
    console.log('About Page');
    let pseudo = this.dataSrv.getData();
  }

  // Deux manières de récupérer les paramètres de l'URL
  // Utilisez l'une ou l'autre méthode, pas les deux en même temps
  ngOnInit() {
    // 1 - A travers un observable (de manière asynchrone)
    this.activatedRoute.params.subscribe((params) => {
      this.pseudo = params.name;
      this.id = params.id;
      console.log('II : ' + this.pseudo);
    });
    console.log('I : ' + this.pseudo);

    // 2 - A travers un snapshot des paramètres (synchrone)
    this.pseudo = this.activatedRoute.snapshot.params.name;
    this.id = this.activatedRoute.snapshot.params.id;
  }

  goBack() {
    this.navCtrl.back();
  }
}
