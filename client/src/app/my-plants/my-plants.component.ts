import { Component, OnInit } from "@angular/core";
import { plantsService } from "../../services/plants.service";
import { SessionService } from "../../services/session.service";
import { FileUploader } from "ng2-file-upload";
import { notifService } from "../../services/notif.service";
import { NotificationsService } from "../../../node_modules/angular2-notifications";
import { environment } from "../../environments/environment";
import * as moment from 'moment';
let es = moment.locale("es");

const { BASEURL } = environment;

@Component({
  selector: "app-my-plants",
  templateUrl: "./my-plants.component.html",
  styleUrls: ["./my-plants.component.css"]
})
export class MyPlantsComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `${BASEURL}/api/plants`,
    method: "POST"
  });

  notif;

  plants;
  newPlant = {
    image: "",
    name: "",
    birth: "",
    light: "",
    room: "",
    waterTimes: "",
    lastWater: "",
    nextWater: "",
    fertilize: "",
    transplant: "",
    author: ""
  };
  feedback;
  toast;

  constructor(
    private session: SessionService,
    private notifService: notifService,
    private plantsService: plantsService,
    private _service: NotificationsService
  ) {}

  ngOnInit() {
    this.session.isLogged().subscribe(() => {
      this.notifService.getNotif(this.session.user._id).subscribe(data => {
        this.notif = data;
        console.log(this.notif);
        let content = "";
        this.notif.forEach(e => {
          if (content !== e.message) {
            content = e.message;
            let toast = this._service.info('', content,{
              clickToClose: true
            });

            toast.click.subscribe(event => {
              console.log(e)
              console.log(e.plantId)
              this.plants.forEach(plant => {
                if(plant._id == e.plantId){
                  console.log(`Planta antes: ${plant.lastWater}`)
                  console.log(moment())
                  plant.lastWater = moment().format();
                  let updateLast = plant.lastWater;
                  this.plantsService.updatePlant(plant._id, updateLast).subscribe();
                  this.notifService.removeNotif(e._id).subscribe();
                  console.log(`Planta despues: ${plant.lastWater}`)
                }
              })
            });
          }
        });
      });

      this.plantsService.getPlants(this.session.user._id).subscribe(data => {
        this.plants = data;
        this.refreshPlants();
      });

      this.uploader.onSuccessItem = (item, response) => {
        this.feedback = JSON.parse(response).message;
      };

      this.uploader.onErrorItem = (item, response, status, headers) => {
        this.feedback = JSON.parse(response).message;
      };
    });
  }

  addPlant(plant) {
    //this.plantsService.newPlant(this.newPlant)
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("name", plant.name);
      form.append("birth", plant.birth);
      form.append("light", plant.light);
      form.append("room", plant.room);
      form.append("waterTimes", plant.waterTimes);
      form.append("lastWater", plant.lastWater);
      form.append("nextWater", plant.nextWater);
      form.append("fertilize", plant.fertilize);
      form.append("transplant", plant.transplant);
      form.append("author", this.session.user._id);
    };
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = () => {
      this.refreshPlants();
    };
  }

  refreshPlants() {
    this.plantsService
      .getPlants(this.session.user._id)
      .subscribe(data => (this.plants = data));
  }
}
