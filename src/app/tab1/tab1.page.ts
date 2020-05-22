import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  offres: any;
  number: number = 0;

  constructor(public api : ApiService, public router : Router) {
    api.getAllOffres().subscribe(data => {
      this.offres = data;
      console.log(data)
      for (let val in this.offres) {
        this.number = this.number + 1;
      }
    });
    
  }

  onSearchChange(event){
    this.number = 0;
    let items = Array.from(document.querySelector('ion-list').children) as HTMLElement[];
    requestAnimationFrame(() => {
      items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().includes(event.target.value.toLowerCase());
        item.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow)
          this.number++;
      });
    });
  }

  onButtonClicked(id) {
    console.log(id);
    this.router.navigate(['/tabs/emploi/' + id]);
  }

}
