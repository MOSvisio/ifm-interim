import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  offres: Observable<any>;
  personne: any;
  id: number = 1;

  constructor(public httpClient: HttpClient) {
    this.getPersonne(this.id).subscribe(data => {
      this.personne = data;
    })
   }

  getAllOffres() {
    return this.httpClient.get("https://damp-scrubland-46949.herokuapp.com/emplois");
  }

  getOffreById(id) {
    return this.httpClient.get("https://damp-scrubland-46949.herokuapp.com/emplois/" + id);
  }

  getFavorite(id) {
    let idFavoris;
    return this.httpClient.get("https://damp-scrubland-46949.herokuapp.com/favorises/" + this.personne['favoris']['id'])
  }

  getPersonne(id) {
    return this.httpClient.get("https://damp-scrubland-46949.herokuapp.com/personnes/" + id);
  }

  addFavoriteEmploiId(id) {
    let dataArray  = {
      "emplois" : []
    }
    this.getFavorite(0).subscribe(data => {

      let emplois = data["emplois"]
      for (var offre of emplois) {
        dataArray["emplois"].push(offre['id'])
      }
      dataArray["emplois"].push(id)
      this.httpClient.put("https://damp-scrubland-46949.herokuapp.com/favorises/" + this.personne['favoris']['id'], dataArray);
    })
  }

}
