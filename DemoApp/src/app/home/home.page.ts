import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nb: number = 0;
  name: string = 'Toto';

  constructor(private router: Router, private dataSrv: DataService) {
    console.log("Home Page"); 
  }

  goTo() {
    this.dataSrv.setData(this.name);
    this.router.navigate(['/about', this.name, 42]);
  }
 
}
