import { Component, OnInit } from '@angular/core';
import { plantsService } from '../../services/plants.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { FileUploader } from 'ng2-file-upload';
import { notifService } from '../../services/notif.service';
import { NotificationsService } from '../../../node_modules/angular2-notifications';
import { environment } from '../../environments/environment';

const { BASEURL } = environment;

@Component({
  selector: 'app-my-plants',
  templateUrl: './my-plants.component.html',
  styleUrls: ['./my-plants.component.css']
})
export class MyPlantsComponent implements OnInit{

  uploader: FileUploader = new FileUploader({
    url: `${BASEURL}/api/plants`,
    method: 'POST'
  });
  
  notif;
  
  plants;
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
    author: ''
  };
  feedback;                  

  constructor(
    private session: SessionService, 
    private notifService: notifService, 
    private plantsService: plantsService, 
    private _service: NotificationsService,
    private router: Router) {

      const toast = this._service.info({
        clickToClose: true
      });
      
      toast.click.subscribe()
      // toast.click.subscribe(data => {
      //   console.log(`Essss`+ data)
      //   this.notif = data;
      //   this.notifService.updateNotif(data.id, data.last);
      //   console.log("llegó")
      // });
    }
  
  ngOnInit() {
    this.session.isLogged().subscribe(() => {

      this.notifService.getNotif(this.session.user._id)
      .subscribe(data => {
        this.notif = data;
        console.log(this.notif);
        let content = '';
        this.notif.forEach(e =>{
          if(content !== e.message){
            content = e.message;
            this._service.info(content);
          }
        });
      });
  
      this.plantsService.getPlants(this.session.user._id)
      .subscribe(data => {
        this.plants = data;
        this.refreshPlants();
      });
  
      this.uploader.onSuccessItem = (item, response) => {
        this.feedback = JSON.parse(response).message;
      };
  
      this.uploader.onErrorItem = (item, response, status, headers) => {
        this.feedback = JSON.parse(response).message;
      };

    })
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
    this.uploader.onCompleteItem = () => {
      this.refreshPlants();
    }
  }  

  refreshPlants() {
    this.plantsService.getPlants(this.session.user._id)
      .subscribe(data => (this.plants = data));
  }
}
