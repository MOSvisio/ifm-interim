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

    api.getFavorite(0).subscribe(data => {
      for (var offre of data["emplois"])
      {
        console.log("ofre :  " + offre['id'] + " this offre : " + this.id)
        if (Number(offre['id']) === Number(this.id))
        {
          this.heart_icon  = "heart";
        }
      }
    })
  }

  ngOnInit() {
  }

  onHeartClicked() {
    if (this.heart_icon === "heart-outline")
    {
      console.log("call api put")
      this.api.addFavoriteEmploiId(this.id);
    }
    else {
      console.log("call remove fav")
      this.api.removeFavoriteEmploiId(this.id);
    }
    this.heart_icon = (this.heart_icon === "heart") ? "heart-outline" : "heart";
  }

  onPostClicked() {

    this.api.addCandidatureId(this.id);
  
  }

}
