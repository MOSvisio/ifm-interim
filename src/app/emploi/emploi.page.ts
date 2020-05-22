import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.page.html',
  styleUrls: ['./emploi.page.scss'],
})
export class EmploiPage implements OnInit {

  id : string;
  offre : any;
  poste : string;
  titre : string;
  ville : string;
  description : string;
  activite : string;
  description_poste : string;
  heart_icon : string = "heart-outline";

  constructor(public activatedRoute : ActivatedRoute, public api : ApiService) { 
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    api.getOffreById(this.id).subscribe(data => {
      this.offre = data;
      this.poste = data["poste"]
      this.titre = data["titre"]
      this.ville = data["ville"]
      this.description = data["description"]
      this.activite = data["activite"]
      this.description_poste = data["description_poste"]
    })
  }

  ngOnInit() {
  }

  onHeartClicked() {
    this.heart_icon = (this.heart_icon === "heart") ? "heart-outline" : "heart";
  }

}
