import { Component, OnInit } from '@angular/core';
import { plantsService } from '../../services/plants.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
let es = moment.locale("es");

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
    private router: Router, 
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(params => {
      this.plantId = params.id;
      this.plantsService.getOnePlant(params.id)
      .subscribe( plant => {
        this.plant = plant;
        this.plant['birth'] = moment(plant['birth']).format('LL');
        this.plant['lastWater'] = moment(plant['lastWater'])
        this.plant['nextWater'] = moment(plant['lastWater']).add(plant['waterTimes'], 'days').calendar();
        this.plant['lastWater'] = moment(plant['lastWater']).format('LL'); // Sobrescribe con formato
      });
    });
}

  ngOnInit() {
  }

  deletePlant(id){
    this.plantsService.removePlant(id)
    .subscribe(() => this.router.navigate(['/profile']));
  }

}
//localeData.longDateFormat(dateFormat);
// var fr = moment().locale('fr');
// fr.localeData().months(moment([2012, 0])) // "janvier"
// fr.locale('en');
// fr.localeData().months(moment([2012, 0])) // "January"