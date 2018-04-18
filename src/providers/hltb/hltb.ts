import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as $ from "jquery";
import { Platform } from 'ionic-angular';

@Injectable()
export class HltbProvider {

	private searchUrl: string = "https://howlongtobeat.com/search_main.php?page=1";
	private gameInfoUrl: string ="https://howlongtobeat.com/game.php";
	// private searchUrl: string = "/search";
	// private gameInfoUrl: string = "/game/game.php";
	public parsedData:Object;
	public result: any;
	public errorMsg: string = '';

	constructor(public http: HttpClient,public plt: Platform) {
		// console.log('Hello HltbProvider Provider',this.plt.platforms());
		// if(this.plt.is('core')){
		// 	this.searchUrl = "/search";
		// 	this.gameInfoUrl = "/game/game.php";
		// }
	}

	public search(gameName: string) {
		var body: FormData = new FormData();
		body.append('queryString', gameName);
		body.append('t', 'games');
		body.append('sorthead', 'popular');
		body.append('sortd', 'Normal Order');

		var headers = new HttpHeaders();
		headers.append('Access-Control-Allow-Origin', '*')
		headers.append('Access', '*/*')
		var options: object = {
			'headers': headers,
			'responseType': 'text'
		};

		let s: Subject<any> = new Subject()
		let r = this.http.post(this.searchUrl, body, options)
		r.subscribe(
			(data) => {
				this.errorMsg = '';
				this.parsedData = [];
				this.result = data;

				if (String(data).indexOf("No results for ") >= 0) { //no results
					this.errorMsg = $("<div/>").html(data).find("li").text();
					s.next();
				} else { //has results
					this.parsedData = this.parseSearchResult(data);
					s.next();
				}
			},

			(error) => {/* console.log("error",error) */ }

		);
		return s;
	}

	public moreInfo:string;
	public loadMore(gameId:number){
		let source, descr, moreinfo;
		var options: object = {
			'responseType': 'text',
			'params':{ 'id': gameId }
		};

		let s: Subject<any> = new Subject()
		let r = this.http.get(this.gameInfoUrl,options);
			r.subscribe((data)=>{

				source = $("<div/>").html(data).find("#global_site");
				descr = $(source).find(".profile_header_alt").text().replace($(source).find("#profile_summary_more").text(),'');
				moreinfo = descr;
				moreinfo += $(source).find(".profile_info").parent().html();

				this.moreInfo = moreinfo;
				s.next();
			}
		)
		return s;
	}

	private parseSearchResult(data):Object {
		let parsedItems: Array<any> = [];
		let name, id, img, timeLabel, timeNumber, additionalData, timeData, timePrecision;
		let source = $("<div/>").html(data);
		let items = $(source).find("li");
		let searchHead = $(source).find("h3").first().text();

		for (let i = 0; i < items.length; i++) {
			name = $(items[i]).find(".search_list_details h3 a").text().trim();
			id = $(items[i]).find(".search_list_details h3 a").attr("href").replace("game.php?id=", '');
			img = $(items[i]).find(".search_list_image img").attr("src").trim();
			timeData = [];

			additionalData = $(items[i]).find(".search_list_tidbit,.search_list_tidbit_short,.search_list_tidbit_long");
			for (let j = 0; j < additionalData.length; j = j + 2) {
				timeLabel = $(additionalData[j]).text();
				timeNumber = $(additionalData[j + 1]).text();
				timePrecision = $(additionalData[j + 1]).attr("class").toString().split(' ').pop().replace('time_', '');
				timeData.push({ label: timeLabel, time: timeNumber, timePrecision: timePrecision })
			}

			parsedItems.push({ id: id, name: name, image: img, time: timeData, maintime:(timeData[0] && timeData[0].time) ? timeData[0].time : undefined })
		}

		return {'head':searchHead, 'items':parsedItems};
		// console.log(this.parsedData)
	}

}