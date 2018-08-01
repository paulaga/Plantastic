import { Component, OnInit } from '@angular/core';
import { plantsService } from '../../services/plants.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-one-plant',
  templateUrl: './one-plant.component.html',
  styleUrls: ['./one-plant.component.css']
})
export class OnePlantComponent implements OnInit {
  plant;

  constructor(
    private plantsService : plantsService, 
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(params => {
      this.plantsService.getOnePlant(params.id)
      .subscribe( plant => (this.plant = plant));
    });
}

  ngOnInit() {
  }

}
