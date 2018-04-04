import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { HltbProvider } from '../../providers/hltb/hltb';
import { GameDetailsPage } from '../game-details/game-details';
import { SearchResultsPage } from '../search-results/search-results';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public hltbProvider: HltbProvider,
    public loadingCtrl: LoadingController
  ) {}

  private loadingComponent:Loading;
  private searchInput:string ="";

  openResults(){
    this._presentLoading();
    this.hltbProvider.search(this.searchInput).subscribe(() => {
      let gamesArray:Array<any> = this.hltbProvider.parsedData["items"];

      if (gamesArray.length == 1) { //single result, go straight to game details
        this.navCtrl.push(GameDetailsPage, { game: gamesArray[0] });
      }
      else { //multiple results go to search results
        this.navCtrl.push(SearchResultsPage, { search: this.searchInput, loading:this.loadingComponent });
      }

      this.loadingComponent.dismiss();
    });
  }

  openDetails(game: Object) {
    this.navCtrl.push(GameDetailsPage, { game: game });
  }

  private _presentLoading() {
    this.loadingComponent = this.loadingCtrl.create({
      content: 'Loading...',
      spinner:"crescent",
      // duration: 5000,
      dismissOnPageChange: false
    })
    this.loadingComponent.present();
  }


  ionViewDidEnter(){}

}
