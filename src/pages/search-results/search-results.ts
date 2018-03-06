import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { HltbProvider } from '../../providers/hltb/hltb';
import { GameDetailsPage } from '../game-details/game-details';

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public hltbProvider: HltbProvider) {
  }
  private gameList;

  openDetails(game: Object) {
    this.navCtrl.push(GameDetailsPage, { game: game });
  }

  ionViewDidEnter() {
    this.hltbProvider.search().subscribe(() => {
      this.gameList = this.hltbProvider.parsedData;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultsPage');
  }

}