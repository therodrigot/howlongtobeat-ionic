import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, Loading } from 'ionic-angular';
import { HltbProvider } from '../../providers/hltb/hltb';
import { GameDetailsPage } from '../game-details/game-details';

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {

  searchMessage: any;
  private errorMsg: string;
  private hasResult:boolean;
  private loadingComponent:Loading;
  private gameList:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public hltbProvider: HltbProvider,
  ) {
    this.loadingComponent = this.navParams.get("loading")
  }

  openDetails(game: Object) {
    // console.log(game);
    // console.log(game.name,game.maintime);
    this.navCtrl.push(GameDetailsPage, { game: game });
  }

  ionViewDidLoad() {
    this.searchMessage = this.hltbProvider.parsedData["head"];
    this.gameList = this.hltbProvider.parsedData["items"];
    this.errorMsg = this.hltbProvider.errorMsg;
    this.hasResult = this.gameList.length>0;
    console.log("ionViewDidLoad", this.gameList)
  }

}