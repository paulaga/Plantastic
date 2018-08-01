import { Component } from '@angular/core';
import { plantsService } from '../../services/plants.service';
import { Router } from '../../../node_modules/@angular/router';

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
    rip: '',
    ligth: '',
    room: '',
    water: {
      last: '', 
      next: ''
    },
    fertilize: '',
    transplant: ''
  };

  constructor(private plantsService: plantsService, private router: Router) {
    this.plantsService.getPlants()
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
    this.plantsService.getPlants()
      .subscribe(data => (this.plants = data));
  }
}
