import { Component, OnInit } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { Feed } from './model/feed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // xml = `<note><to>User</to><from>Library</from><heading>Message</heading><body>Some XML to convert to JSON!</body></note>`;

  private feedUrl = 'https://habr.com/rss/feed/posts/all/9fecd9a1e99e8b1729cc1e4a2f31f5b4/';
  feeds: any;

  constructor(private ngxXml2jsonService: NgxXml2jsonService,
    private http: Http) {

    const parser = new DOMParser();
    const xml = parser.parseFromString(this.getFeedContent(this.feedUrl), 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    console.log(obj);
  }
  getFeedContent(url) {

  return this.http.get(url, response => {
    // Continuously update stream with data
    let body = '';
    response.on('data', d => body += d);
    response.on('end', () => body);
  });

  // const x = fetch('https://habr.com/rss/feed/posts/all/9fecd9a1e99e8b1729cc1e4a2f31f5b4/')
  // .then(data => console.log(data));


  // getFeedContent(url: string): Observable<Feed> {
  //   return this.http.get(this.feedUrl)
  //     .pipe(
  //     tap(console.log)
  //       map(this.extractFeeds)
  //     );
  // }


}
  // private extractFeeds(res: Response): Feed {
  //   const feed = res.json();

  //   return feed || {};
  // }
}
