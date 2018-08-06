import { Component, OnInit } from '@angular/core';
import { wishService } from '../../services/wish.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wish;
  newWish = {
    text: '',
    author: ''
  };

  constructor(private session: SessionService, private wishService: wishService, private router: Router) { 
  }
  
  ngOnInit() {
    this.session.isLogged().subscribe(() => {
      this.newWish["author"] = this.session.user._id;
      this.wishService.getWishes(this.session.user._id)
        .subscribe(data => {
          this.wish = data;
          this.refreshWishes();
        })
    });
  }

  submitWish(){
  this.wishService.newWish(this.newWish)
  .subscribe(() => this.refreshWishes());
  this.newWish.text = '';
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
