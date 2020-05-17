import { Component } from '@angular/core';
import { NewsApiService } from './news-api.service';
import * as $ from "jquery";
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
  mPandemic:any;
  PandemicCountry = new Array<string>(0);
  PandemicCases = new Array<string>(0);
  PandemicDeaths = new Array<string>(0);
  PandemicRecovered = new Array<string>(0);
  PandemicFinalData: pandemic[] = [];
  displayedColumns: string[] = ['country', 'cases', 'deaths', 'recovered'];
  dataSource:any;

  constructor(private newsapi:NewsApiService){

    console.log('app component constructor called');         
  }

  ngOnInit() {

    function stripHtml(html:string)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return (tmp.textContent || tmp.innerText || "");
}

 
        //load articles
      this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
    //load news sources
    this.newsapi.initSources().subscribe(data=> this.mSources = data['sources']);

    //load pandemic news
        //load news sources
        let self = this;
    
        
        this.newsapi.initPandemic().subscribe((
          data:any)=>{
            this.mPandemic = ((data.parse.text["*"]));
            setTimeout(function(){
              console.log("yes");
          $('.wikitable tbody tr').each(function() {
            if($(this).find('td:eq(1)').html() != undefined){
              self.PandemicCountry.push((stripHtml($(this).find('th:eq(1)').html()).split('[',1)).toString());
              self.PandemicCases.push($(this).find('td:eq(0)').html());
              self.PandemicDeaths.push($(this).find('td:eq(1)').html());
              self.PandemicRecovered.push($(this).find('td:eq(2)').html());
              self.PandemicFinalData.push({country:(stripHtml($(this).find('th:eq(1)').html()).split('[',1)).toString(),cases:$(this).find('td:eq(0)').html(),
              deaths:$(this).find('td:eq(1)').html(),recovered:$(this).find('td:eq(2)').html()});
              }
         });
         console.log(self.PandemicCountry);
         console.log(self.PandemicCases);
         console.log(self.PandemicDeaths);
         console.log(self.PandemicRecovered);
         console.log(self.PandemicFinalData);
         self.dataSource = self.PandemicFinalData
        },0);
          }
          );
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

export interface pandemic{
  country:string;
  cases:string;
  deaths:string;
  recovered:string;

}


