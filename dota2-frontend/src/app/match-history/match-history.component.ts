import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchHistoryService } from '../services/match-history.service';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss']
})
export class MatchHistoryComponent implements OnInit {

  matchHistory: any[] = [];
  heroes: any[] = [];
  steamId = null;

  constructor(private matchHistoryService: MatchHistoryService, private router: Router) {

  }

  ngOnInit(): void {
    this.loadMatchHistory('76561199037162545')
  }

  loadMatchHistory(steamId: string) {
    this.matchHistoryService.getHeroes().then(res => {
      this.heroes = res.data.result.heroes;

      this.matchHistoryService.getMatchHistory(steamId).then(res => {
        this.matchHistory = res.data.result.matches

        this.matchHistory.map((match) => {

          match.players.map(a => {
            a.hero_img = this.findByHeroId(a.hero_id).replace('npc_dota_hero_', '')
          })
        })
      })
    })
  }

  submitSteamId() {
    this.loadMatchHistory(this.steamId);

  }

  findByHeroId(heroId: number) {
    let heroName = this.heroes.find(hero => hero.id == heroId).name
    return heroName;
  }

  viewMatch(matchId) {
    this.router.navigate([`/matchDetails/${matchId}`])
  }

}
