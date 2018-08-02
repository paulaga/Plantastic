import { Component, Input, OnInit } from '@angular/core';
import { plantsService } from '../../services/plants.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit{
  @Input() plant;
  tips;
  newTip = {
    text: '',
    plantId:''
  };

  constructor(private plantsService: plantsService, private router: Router) { 
    
  }

  ngOnInit() {
    this.plantsService.getTips(this.plant)
    .subscribe(data => {
      this.newTip.plantId = this.plant;
      this.tips = data;
      this.refreshTips();
    })
  }

  submitTip(){
    this.plantsService.createTips(this.newTip)
      .subscribe(() => this.refreshTips());
    this.newTip.text = '';
  }

  refreshTips() {
    this.plantsService.getTips(this.plant)
      .subscribe(data => (this.tips = data));
  }

}