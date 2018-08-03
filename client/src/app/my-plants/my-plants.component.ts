import { Component } from '@angular/core';
import { plantsService } from '../../services/plants.service';
import { Router } from '../../../node_modules/@angular/router';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.component.html',
  styleUrls: ['./my-plants.component.css']
})
export class MyPlantsComponent {

  plants: Array<Object> = [];
  newPlant = {
    image: '',
    name: '',
    birth: '',
    light: '',
    room: '',
    waterTimes: '',
    lastWater: '',
    nextWater: '',
    fertilize: '',
    transplant: '',
    author: this.session.user._id
  };

  constructor(private session: SessionService, private plantsService: plantsService, private router: Router) {
    this.plantsService.getPlants(this.session.user._id)
      .subscribe(data => {
        this.plants = data;
        this.refreshPlants();
      });
  }

  submitPlant(){
    this.plantsService.newPlant(this.newPlant)
      .subscribe(() => this.refreshPlants());
  }

  refreshPlants() {
    this.plantsService.getPlants(this.session.user._id)
      .subscribe(data => (this.plants = data));
  }
}
