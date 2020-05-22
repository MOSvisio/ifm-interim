import { Component, ApplicationRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  offres: any;

  constructor(public api : ApiService, public router : Router) {
    this.offres = api.favs;    
  }


  onSearchChange(event){
    let items = Array.from(document.querySelector('ion-list').children) as HTMLElement[];
    requestAnimationFrame(() => {
      items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().includes(event.target.value.toLowerCase());
        item.style.display = shouldShow ? 'block' : 'none';

      });
    });
  }

  onButtonClicked(id) {
    console.log(id);
    this.router.navigate(['/tabs/emploi/' + id]);
  }


}
