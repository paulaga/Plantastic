import { Component, OnInit } from '@angular/core';
import { wishService } from '../../services/wish.service';
import { Router } from '../../../node_modules/@angular/router';
import { SessionService } from '../../services/session';


@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wish;
  newWish = {
    text: '',
    author: this.session.user._id
  };

  constructor(private session: SessionService, private wishService: wishService, private router: Router) { 
    this.wishService.getWishes(this.session.user._id)
      .subscribe(data => {
        this.wish = data;
        this.refreshWishes();
      })
  }

  ngOnInit() {
  }

  submitWish(){
  this.wishService.newWish(this.newWish)
  .subscribe(() => this.refreshWishes());
  }
  
  deleteWish(id){
    this.wishService.removeWish(id)
    .subscribe(() => this.refreshWishes());
  }
  
  refreshWishes(){
  this.wishService.getWishes(this.session.user._id)
  .subscribe(data => (this.wish = data));
  }
}
