import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/xml' })
};

@Injectable()
export class DemoService {

  constructor(private http: HttpClient) { }

  // Uses http.get() to load data from a single API endpoint
  getFeeds() {
    return this.http.get('https://habr.com/rss/feed/posts/all/9fecd9a1e99e8b1729cc1e4a2f31f5b4/');
  }
}
