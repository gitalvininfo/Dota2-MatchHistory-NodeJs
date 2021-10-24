import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchHistoryService } from '../services/match-history.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent implements OnInit {

  matchDetails: any;

  constructor(private matchHistoryService: MatchHistoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMatchDetails();
  }

  loadMatchDetails() {
    const matchId = this.route.snapshot.params.matchId;
    this.matchHistoryService.getMatchDetails(matchId).then(res => {
      this.matchDetails = res.data.result
    })
  }

}
