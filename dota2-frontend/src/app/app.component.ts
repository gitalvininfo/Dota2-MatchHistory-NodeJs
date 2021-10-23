import { Component } from '@angular/core';
import { MatchHistoryService } from './services/match-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dota2-frontend';
  matchHistory: any[] = [];
  heroes: any[] = [];

  constructor(private matchHistoryService: MatchHistoryService) {

  }

  ngOnInit(): void {
    this.loadMatchHistory();
  }

  loadMatchHistory() {
    this.matchHistoryService.getHeroes().then(res => {
      this.heroes = res.data.result.heroes;

      this.matchHistoryService.getMatchHistory().then(res => {
        this.matchHistory = res.data.result.matches

        this.matchHistory.map((match) => {

          match.players.map(a => {
            a.hero_img = this.findByHeroId(a.hero_id).replace('npc_dota_hero_', '')
          })
        })
      })
    })
  }

  findByHeroId(heroId: number) {
    let heroName = this.heroes.find(hero => hero.id == heroId).name
    return heroName;
  }
}
