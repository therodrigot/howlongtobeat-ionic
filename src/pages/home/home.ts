import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HltbProvider } from '../../providers/hltb/hltb';
import * as $ from "jquery";
import { GameDetailsPage } from '../game-details/game-details';
import { SearchResultsPage } from '../search-results/search-results';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public hltbProvider:HltbProvider
  ) {}

  private gameList;

  openResults(){
    this.navCtrl.push(SearchResultsPage, { search:'bloodborne' });
  }

  openDetails(game:Object){
    this.navCtrl.push(GameDetailsPage, { game: game });
  }

  ionViewDidEnter(){
    // this.hltbProvider.search().subscribe(()=>{
    //   this.gameList = this.hltbProvider.parsedData;
    //   console.log("!",this.gameList)
    // });
  }

}
