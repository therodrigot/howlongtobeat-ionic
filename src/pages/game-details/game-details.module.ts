import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameDetailsPage } from './game-details';

@NgModule({
  declarations: [
    GameDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GameDetailsPage),
  ],
})
export class GameDetailsPageModule {}
