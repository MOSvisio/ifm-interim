import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  offres: Observable<any>;

  constructor(public httpClient: HttpClient) { }

  getAllOffres() {
    return this.httpClient.get("https://damp-scrubland-46949.herokuapp.com/emplois");
  }

  getOffreById(id) {
    return this.httpClient.get("https://damp-scrubland-46949.herokuapp.com/emplois/" + id);
  }

  getFavorite(id) {
    return this.httpClient.get("https://damp-scrubland-46949.herokuapp.com/favorises/" + id);
  }

}
