import { Component, OnInit } from '@angular/core';
import { playListService } from '../../services/play.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  playList;

  constructor(public playListService: playListService) { 
    this.playListService.getPlaylist()
    .subscribe(data => {
      this.playList = data;
      console.log(data)
    })
  }


  ngOnInit() {
  }

}
