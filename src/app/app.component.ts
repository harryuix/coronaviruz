import { Component } from '@angular/core';
import { NewsApiService } from './news-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mArticles:Array<any>;
  mSources:Array<any>;
  mEntertainment:Array<any>;
  mSports:Array<any>;
  mFinance:Array<any>;
  mPolitics:Array<any>;
  mTechnology:Array<any>;
  
  constructor(private newsapi:NewsApiService){
    console.log('app component constructor called');         
  }

  ngOnInit() {
        //load articles
      this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
    //load news sources
    this.newsapi.initSources().subscribe(data=> this.mSources = data['sources']);

    // this.newsapi.initEntertainment().subscribe(data => this.mEntertainment = data['articles']);

    // this.newsapi.initSports().subscribe(data=> this.mSports = data['articles']); 

    // this.newsapi.initFinance().subscribe(data=> this.mFinance = data['articles']);  

    // this.newsapi.initTechnology().subscribe(data=> this.mTechnology = data['articles']);  

    // this.newsapi.initPolitics().subscribe(data=> this.mPolitics = data['articles']);   
    }


  searchArticles(source){
    console.log("selected source is: "+source);
    this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
  }
  
}
