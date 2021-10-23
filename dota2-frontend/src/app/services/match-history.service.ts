import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MatchHistoryService {

  API_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getMatchHistory(): Promise<any> {
    return this.http.get(`${this.API_URL}/matchHistory`).toPromise();
  }

  getHeroes(): Promise<any> {
    return this.http.get(`${this.API_URL}/heroes`).toPromise();
  }
}
