import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as $ from "jquery";


/*
  Generated class for the HltbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HltbProvider {

  parsedData: any;
  private url: string ="https://howlongtobeat.com/search_main.php?page=1";
  public result:any;

  constructor(public http: HttpClient) {
    console.log('Hello HltbProvider Provider');
  }

  public search(gameName:string='bloodborne'){
    console.log("search");
    var body:FormData = new FormData();
    body.append('queryString',gameName);
    body.append('t','games');
    body.append('sorthead','popular');
    body.append('sortd','Normal Order');
    body.append('plat','');
    body.append('length_type','main');
    body.append('length_min','');
    body.append('length_max','');
    body.append('detail','');
    body.append('plat','');
// 
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin','*')
    headers.append('Access','*/*')
    var options:any = { 
      'headers': headers,
      'responseType': 'text'
    };

    this.url = "/url";
    let s:any = new Subject()
    let r = this.http.post(this.url, body, options)
    r.subscribe(
      (data) => {
        this.result = data;
        this.parsedData = this.parseSearchResult(data);
        console.log("!!", data)
        s.next(this.parsedData);
      },
      (error) => {console.log("error",error)}
    );
    return s;
  }


  private parseSearchResult(data){
    let parsedItems = [];
    let name, img, timeLabel, timeNumber, additionalData, timeData, timePrecision;
    let items = $("<div/>").html(data).find("li");

    for (let i = 0; i < items.length; i++) {
      name = $(items[i]).find(".search_list_details h3 a").text().trim();
      img = $(items[i]).find(".search_list_image img").attr("src").trim();
      timeData=[];

      additionalData = $(items[i]).find(".search_list_tidbit");
      for (let j = 0; j < additionalData.length;j=j+2){
        timeLabel = $(additionalData[j]).text();
        timeNumber = $(additionalData[j + 1]).text();
        timePrecision = $(additionalData[j + 1]).attr("class").toString().split(' ').pop().replace('time_', '');
        timeData.push({ label: timeLabel, time: timeNumber, timePrecision:timePrecision})
      }

      parsedItems.push({name:name,image:img,time:timeData})
    }

    return parsedItems
    // console.log(this.parsedData)
  }
}