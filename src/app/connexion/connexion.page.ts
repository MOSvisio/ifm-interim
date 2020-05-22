import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  username : string;
  password : string;

  constructor(public api : ApiService) { }

  ngOnInit() {
  }

  onUserChanged(event) {
    
    this.username = event.target.value
   console.log(this.username)
  }

  onPasswordChanged(event) {
    this.password = event.target.value
  }

  onClick() {
    this.api.connexion(this.username, this.password);
  }

}
