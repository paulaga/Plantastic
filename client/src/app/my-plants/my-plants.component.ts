import { Component, OnInit } from '@angular/core';
import { plantsService } from '../../services/plants.service';
import { Router } from '../../../node_modules/@angular/router';
import { SessionService } from '../../services/session';
import { FileUploader } from '../../../node_modules/ng2-file-upload';

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.component.html',
  styleUrls: ['./my-plants.component.css']
})
export class MyPlantsComponent implements OnInit{

  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/api/plants`,
    method: 'POST'
  });

  plants: Array<Object> = [];
  newPlant: Object = {
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
  feedback;

  constructor(private session: SessionService, private plantsService: plantsService, private router: Router) {
    this.plantsService.getPlants(this.session.user._id)
      .subscribe(data => {
        this.plants = data;
        this.refreshPlants();
      });
  }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  addPlant(plant){
    //this.plantsService.newPlant(this.newPlant)
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', plant.name);
      form.append('birth', plant.birth);
      form.append('light', plant.light);
      form.append('room', plant.room);
      form.append('waterTimes', plant.waterTimes);
      form.append('lastWater', plant.lastWater);
      form.append('nextWater', plant.nextWater);
      form.append('fertilize', plant.fertilize);
      form.append('transplant', plant.transplant);
      form.append('author', this.session.user._id);
    }
    this.uploader.uploadAll();
    console.log(plant)
    this.uploader.onCompleteItem = () => {
      console.log(plant)
      this.refreshPlants();
      //this.router.navigate(['/profile']);
    }
      //.subscribe(() => this.refreshPlants());
  }

  refreshPlants() {
    this.plantsService.getPlants(this.session.user._id)
      .subscribe(data => (this.plants = data));
  }
}
