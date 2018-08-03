import { Component, OnInit } from '@angular/core';
import { plantsService } from '../../services/plants.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
const moment = require("moment");
moment.locale("es");
moment().format('LL');

@Component({
  selector: 'app-one-plant',
  templateUrl: './one-plant.component.html',
  styleUrls: ['./one-plant.component.css']
})
export class OnePlantComponent implements OnInit {
  plant;
  plantId;

  constructor(
    private plantsService : plantsService, 
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(params => {
      this.plantId = params.id;
      this.plantsService.getOnePlant(params.id)
      .subscribe( plant => {
        this.plant = plant;
        this.plant['birth'] = moment(plant['birth']).format('LL');
        this.plant['lastWater'] = moment(plant['lastWater']).format('LL');
        this.plant['nextWater'] = moment(plant['nextWater']).format('LL');
      });
    });
}

  ngOnInit() {
  }

}
