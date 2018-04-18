import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HltbProvider } from '../../providers/hltb/hltb';

@IonicPage()
@Component({
  selector: 'page-game-details',
  templateUrl: 'game-details.html',
})
export class GameDetailsPage {

  public game: any;
  public moreInfo:string;
  public openedInfo:boolean=false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public hltb: HltbProvider
  ) {
      this.game = navParams.data.game;
      // console.log(this.game);
  }

  openInfo(){
    this.openedInfo = true;
  }
  closeInfo(){
    this.openedInfo = false;
  }

  ionViewDidLoad() {
    this.hltb.loadMore(this.game.id).subscribe(()=>{
      this.moreInfo = this.hltb.moreInfo;
    });
  }

}
