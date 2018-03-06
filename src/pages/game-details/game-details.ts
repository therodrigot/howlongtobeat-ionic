import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GameDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-details',
  templateUrl: 'game-details.html',
})
export class GameDetailsPage {

  public game: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.game = navParams.data.game;
      console.log(this.game);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameDetailsPage');
  }

}
