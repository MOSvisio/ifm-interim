import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(  public nav : NavController ) { }

  ngOnInit() {
  }

  onClick() {
    this.nav.navigateForward("/connexion");
  }

}
