import { Component } from '@angular/core';
import { plantsService } from '../../services/plants.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent {
  tip;
  newTip = {
    text: '',
    plantId: this.plantsService.plant._id
  };

  constructor(private plantsService: plantsService, private router: Router) { 
    this.plantsService.getTips(this.plantsService.plant._id)
    .subscribe(data => {
      this.tip = data;
      this.refreshTips();
    })
  }

  submitTip(){
    this.plantsService.createTips(this.newTip)
      .subscribe(() => this.refreshTips());
  }

  refreshTips() {
    this.plantsService.getTips(this.plantsService.plant._id)
      .subscribe(data => (this.tip = data));
  }

}