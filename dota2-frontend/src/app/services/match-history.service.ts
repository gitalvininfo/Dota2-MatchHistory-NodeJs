import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MatchHistoryService {

  API_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getMatchHistory(steamId: string): Promise<any> {
    return this.http.get(`${this.API_URL}/matchHistory?steamId=${steamId}`).toPromise();
  }

  getMatchDetails(matchId: string): Promise<any> {
    return this.http.get(`${this.API_URL}/matchDetails?matchId=${matchId}`).toPromise();
  }

  getHeroes(): Promise<any> {
    return this.http.get(`${this.API_URL}/heroes`).toPromise();
  }
}
