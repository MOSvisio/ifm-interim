import { Injectable, ApplicationRef } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Router } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Tab3Page } from './tab3/tab3.page';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  offres: any;
  personne: any;
  id: number;
  favs: any;
  candidature : any;

  constructor(public httpClient: HttpClient, public nav : NavController, public app : ApplicationRef, public router : Router) {
    this.getAllOffres().subscribe(data => {
      this.offres = data;
    })
    
   }

   onConnectionComplete() {
    this.getPersonne(this.id).subscribe(data => {
      this.personne = data;
      this.getFavorite(1).subscribe(data => {
        this.favs = data['emplois'];
      });
      this.getCandidature(1).subscribe(data => {
        this.candidature = data['emplois']; 
      });
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
    if (this.personne['favoris'] !== null)
      return this.httpClient.get("https://damp-scrubland-46949.herokuapp.com/favorises/" + this.personne['favoris']['id'])
    return null;
  }

  getCandidature(id) {
    return this.httpClient.get("https://damp-scrubland-46949.herokuapp.com/candidatures/" + this.personne['candidature']['id'])
  }

  getPersonne(id) {
    return this.httpClient.get("https://damp-scrubland-46949.herokuapp.com/personnes/" + id);
  }

  addFavoriteEmploiId(id) {
    let dataArray  = {
      "emplois" : []
    }

    let favoris = this.getFavorite(0)
    console.log("wtf")
    favoris.subscribe(data => {

      let emplois = data["emplois"]
      for (var offre of emplois) {
        let newData = {"id": offre['id']}
        dataArray["emplois"].push(newData)
      }
      dataArray["emplois"].push( {"id": Number(id)} )
      console.log(dataArray)
      this.httpClient.put("https://damp-scrubland-46949.herokuapp.com/favorises/" + this.personne['favoris']['id'], dataArray).subscribe(data => {
        console.log(data['_body']);
        this.getFavorite(1).subscribe(data => {
          this.favs = data['emplois'];
          console.log("get new array");
        });
      }, error => {
        console.log(error);
      });
      
    })
    
  }

  removeFavoriteEmploiId(id) {
    let dataArray  = {
      "emplois" : []
    }
    console.log(id)
    this.getFavorite(0).subscribe(data => {

      let emplois = data["emplois"]
      for (var offre of emplois) {
        let newData = {"id": offre['id']}
        if (Number(offre['id']) !== Number(id))
        {
          dataArray["emplois"].push(newData)
        }
      }
      console.log(dataArray)
      this.httpClient.put("https://damp-scrubland-46949.herokuapp.com/favorises/" + this.personne['favoris']['id'], dataArray).subscribe(data => {
        console.log(data['_body']);
        this.getFavorite(1).subscribe(data => {
          this.favs = data['emplois'];
          console.log("get new array");
        });
       }, error => {
        console.log(error);
      });
      
    })
  }

  addCandidatureId(id) {
    let dataArray  = {
      "emplois" : []
    }
    this.getCandidature(0).subscribe(data => {

      let emplois = data["emplois"]
      for (var offre of emplois) {
        let newData = {"id": offre['id']}
        dataArray["emplois"].push(newData)
      }
      dataArray["emplois"].push( {"id": Number(id)} )
      console.log(dataArray)
      this.httpClient.put("https://damp-scrubland-46949.herokuapp.com/candidatures/" + this.personne['candidature']['id'], dataArray).subscribe(data => {
        console.log(data['_body']);
        this.getCandidature(1).subscribe(data => {
          this.candidature = data['emplois'];
          console.log("get new array");
        });
       }, error => {
        console.log(error);
      });
      
    })
  }

  removeCandidatureId(id) {
    let dataArray  = {
      "emplois" : []
    }
    console.log(id)
    this.getCandidature(0).subscribe(data => {

      let emplois = data["emplois"]
      for (var offre of emplois) {
        let newData = {"id": offre['id']}
        if (Number(offre['id']) !== Number(id))
        {
          dataArray["emplois"].push(newData)
        }
      }
      console.log(dataArray)
      this.httpClient.put("https://damp-scrubland-46949.herokuapp.com/candidatures/" + this.personne['candidature']['id'], dataArray).subscribe(data => {
        console.log(data['_body']);
        this.getCandidature(1).subscribe(data => {
          this.candidature = data['emplois'];
          console.log("get new array");
        });
       }, error => {
        console.log(error);
      });
      
    })
  }

  connexion(user, mdp) {
    let data = {
      "identifier" : user,
      "password" : mdp
    }
    this.httpClient.post("https://damp-scrubland-46949.herokuapp.com/auth/local", data).subscribe(data => {
      this.id = data['user']['id'];
      if (this.id !== null)
      {
        this.onConnectionComplete();
        this.nav.navigateForward('/tabs/tab1')
      }
    })
  }

}
