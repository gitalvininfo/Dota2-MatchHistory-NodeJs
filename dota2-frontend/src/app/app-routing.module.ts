import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { MatchHistoryComponent } from './match-history/match-history.component';

const routes: Routes = [
  {
    path: '',
    component: MatchHistoryComponent
  },
  {
    path: 'matchDetails',
    children: [
      {
        path: ':matchId',
        component: MatchDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
