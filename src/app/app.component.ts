import { Component, OnInit } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { Feed } from './model/feed';
import { DemoService } from './feed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  xml = `<note><to>User</to><from>Library</from><heading>Message</heading><body>Some XML to convert to JSON!</body></note>`;

  private feedUrl = 'https://habr.com/rss/feed/posts/all/9fecd9a1e99e8b1729cc1e4a2f31f5b4/';
  public feeds;

  constructor(private ngxXml2jsonService: NgxXml2jsonService,
              private _demoService: DemoService) {

    const parser = new DOMParser();
    const xml = parser.parseFromString(this.feeds, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    console.log(obj);
  }

  ngOnInit() {
    this.getFeeds();
  }

  getFeeds() {
    this._demoService.getFeeds().subscribe(
      // the first argument is a function which runs on success
      data => { this.feeds = data },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading feeds')
    );
  }
}
