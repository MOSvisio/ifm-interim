import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  formulaire = {
    nom: this.api.personne['nom'], 
    prenom: this.api.personne['prenom'], 
    ville: this.api.personne['ville'],
    email: this.api.personne['email'],
    telephone: this.api.personne['telephone'],
    type_contrat: this.api.personne['type_contrat'],
    emploi_rechercher: this.api.personne['emploi_rechercher'],
    localisation: this.api.personne['localisation'],
    rayon: this.api.personne['rayon'],
    disponibilite: this.api.personne['disponibilite']
  };

  constructor(public api : ApiService) { }

  ngOnInit() {
  }

  onClick() {
    console.log(this.formulaire);
    
    // Appel modif api
    console.log(this.api.updateProfile(
      this.formulaire['nom'],
      this.formulaire['prenom'],
      this.formulaire['ville'],
      this.formulaire['email'],
      this.formulaire['telephone'],
      this.formulaire['type_contrat'],
      this.formulaire['emploi_rechercher'],
      this.formulaire['localisation'],
      this.formulaire['rayon'],
      this.formulaire['disponibilite']
      ))
  }

}
