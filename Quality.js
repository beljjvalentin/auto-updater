
	var ALLoffers = [66, 68, 62, 64, 60, 297, 42, 44, 38, 40, 58, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 295,
							4, 36, 122, 76, 124, 126, 229, 199, 98, 100, 193, 191, 189, 237, 233, 241, 245, 239, 247, 249, 279, 281, 283, 259, 257, 261, 255, 285, 253];
	var Quality_writer = createArray(150, 6);
	function createArray(length) {
		var arr = new Array(length || 0),
        i = length;
		if (arguments.length > 1) {
			var args = Array.prototype.slice.call(arguments, 1);
			while(i--) arr[length-1 - i] = createArray.apply(this, args);
		}
		return arr;
	}
	
	function Quality_clearAll(offer) {
      var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: Quality_url,  // TODO: Update placeholder value.

        // The A1 notation of the values to clear.
        range: offerTab(offer)+'!A1:Z300',  // TODO: Update placeholder value.
      };

      var clearValuesRequestBody = {
        // TODO: Add desired properties to the request body.
      };

      var request = gapi.client.sheets.spreadsheets.values.clear(params, clearValuesRequestBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
		
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
		
      });
    }
	
	function Quality_makeApiCallWriteAll(offer) {
	  var params = {
        // The ID of the spreadsheet to update.
		spreadsheetId: Quality_url,

        // The A1 notation of the values to update.
        range: offerTab(offer)+'!A1:Z300',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": offerTab(offer)+'!A1:Z300',  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			[offerTab(offer)+' stats',,,],
			['affiliate','sub_affiliate','leads','sales','CR']
		],          	
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };

	  for(var t=0; t<150; t++)
		  valueRangeBody.values.push(Quality_writer[t]);
	  
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
		console.log(offer);
		if(ALLoffers.indexOf(offer)<33){ // 30 max offer index
			for(var t=0; t<150; t++)
				Quality_writer[t] = [,,,];
			console.log((ALLoffers[ALLoffers.indexOf(offer)+1])+" Write!");
			Quality_clearAll(ALLoffers[ALLoffers.indexOf(offer)+1]);
			Quality_HasoffersCall(ALLoffers[ALLoffers.indexOf(offer)+1]);
		} else console.log("All finished.");
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }	

function Quality_HasoffersCall(offer){ 
	// Data HTTP request
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			total = data.response.data.data.length;
			str = "<br><table border=1><tr><td>" + data.response.data.data[0].Stat.offer_id + "</td></tr>"+
				"<tr><td>offer</td><td>affiliate</td><td>leads</td><td>sales</td><td>CR</td></tr>";
			i=0; c=0;
			while(i<data.response.data.data.length){
				if(data.response.data.data[i].Stat.conversions!=0){
					Quality_writer[i-c][0] = data.response.data.data[i].Affiliate.company;	
					Quality_writer[i-c][2] = (data.response.data.data[i].Stat.conversions - (data.response.data.data[i].Stat.revenue / 10));
					Quality_writer[i-c][3] = data.response.data.data[i].Stat.revenue / 10;
					if(Quality_writer[i-c][2]==0)
						Quality_writer[i-c][4] = 0;
					else Quality_writer[i-c][4] = Quality_writer[i-c][3]/Quality_writer[i-c][2];
					console.log("I"+(i-c)+":"+Quality_writer[i-c]);
				} else {
					c++ ;
				}
				i++;
			} 
			Quality_writer[i-c] = [,,"=SUM(C3:C"+(i-c+2)+")","=SUM(D3:D"+(i-c+2)+")"];
			i+=2;
			Lolaleads(offer);
		}
	};
	xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.rpa&fields[]=Affiliate.company&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&groups[]=Affiliate.company&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]="+offerName(offer)+"&sort[Stat.rpa]=desc&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
	xhttp.send(); 
}

function offerTab(num){
	//console.log("Done " + num + "!");
	switch (num){
		case 66: return 'LM NL'; break;
		case 6: return 'LM NL'; break;
		case 68: return 'LM BE'; break;
		case 10: return 'LM NL'; break;
		case 62: return 'LM UK'; break;
		case 14: return 'LM NL'; break;
		case 64: return 'LM AUS'; break;
		case 60: return 'LM NZL'; break;
		case 297: return 'LM SE'; break;
		
		case 42: return '35 NL'; break;
		case 44: return '35 BE'; break;
		case 38: return '35 UK'; break;
		case 40: return '35 AUS'; break;
		case 58: return '35 NZL'; break;
		
		case 102: return 'SD NL'; break;
		case 104: return 'SD BE'; break;
		case 106: return 'SD UK'; break;
		case 108: return 'SD AUS'; break;
		case 110: return 'SD NZL'; break;
		
		case 112: return '40 NL'; break;
		case 114: return '40 BE'; break;
		case 116: return '40 UK'; break;
		case 118: return '40 AUS'; break;
		case 120: return '40 NZL'; break;
		
		case 4: return 'Amanda NL'; break;
		case 36: return 'Amanda BE'; break;
		case 122: return 'Amanda UK'; break;
		case 76: return 'Amanda AUS'; break;
		case 126: return 'Amanda US'; break;
		case 124: return 'Amanda FR'; break;
		case 199: return 'Amanda SE'; break;
		
		case 98: return 'Theresa NL'; break;
		case 100: return 'Theresa BE'; break;
		case 189: return 'Theresa US'; break;
		case 191: return 'Theresa AU'; break;
		case 193: return 'Theresa UK'; break;
		
		case 233: return 'Christina BE'; break;
		
	}
} 

function offerName(num){
	//console.log("Done " + num + "!");
	switch (num){
		case 66: return '%LoveMatch+NL%'; break;
		case 6: return '%LoveMatch+NL%'; break;
		case 68: return '%LoveMatch+BE%'; break;
		case 10: return '%LoveMatch+NL%'; break;
		case 62: return '%LoveMatch+UK%'; break;
		case 14: return '%LoveMatch+NL%'; break;
		case 64: return '%LoveMatch+AUS%'; break;
		case 60: return '%LoveMatch+NZL%'; break;
		case 297: return '%LoveMatch+SE%'; break;
		
		case 42: return '%PlusDate+NL%'; break;
		case 44: return '%PlusDate+BE%'; break;
		case 38: return '%PlusDate+UK%'; break;
		case 40: return '%PlusDate+AUS%'; break;
		case 58: return '%PlusDate+NZL%'; break;
		
		case 102: return '%SuccesfulDating+NL%'; break;
		case 104: return '%SuccesfulDating+BE%'; break;
		case 106: return '%SuccesfulDating+UK%'; break;
		case 108: return '%SuccesfulDating+AUS%'; break;
		case 110: return '%SuccesfulDating+NZL%'; break;
		
		case 112: return '%pluslove+NL%'; break;
		case 114: return '%pluslove+BE%'; break;
		case 116: return '%pluslove+UK%'; break;
		case 118: return '%pluslove+AUS%'; break;
		case 120: return '%pluslove+NZL%'; break;
		
		case 4: return '%Amanda+NL%'; break;
		case 36: return '%Amanda+BE%'; break;
		case 122: return '%Amanda+UK%'; break;
		case 76: return '%Amanda+AUS%'; break;
		case 126: return '%Amanda+US%'; break;
		case 124: return '%Amanda+FR%'; break;
		case 199: return '%Amanda+SE%'; break;
		
		case 98: return '%Theresa+NL%'; break;
		case 100: return '%Theresa+BE%'; break;
		case 189: return '%Theresa+US%'; break;
		case 191: return '%Theresa+AU%'; break;
		case 193: return '%Theresa+UK%'; break;
		
		case 233: return '%Christina+BE%'; break;
		
	}
} 

function Lolaleads(offer){ 
	// Lolaleads request
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		var c=0;
		var sum1 = 0;
		var sum2 = 0;
		i = i - c;
		j = i;
		console.log(data);
		while(j<data.response.data.data.length+i){
			if(data.response.data.data[j-i].Stat.conversions!=0){
				//Quality_writer[j][0] = data.response.data.data[j-i].Stat.offer_id;
				Quality_writer[j][0] = data.response.data.data[j-i].Affiliate.company;
				Quality_writer[j][1] = data.response.data.data[j-i].Stat.affiliate_info3;
				//Quality_writer[j][3] = parseInt(data.response.data.data[j-i].Stat.clicks);
				Quality_writer[j][2] = (data.response.data.data[j-i].Stat.conversions - (data.response.data.data[j-i].Stat.revenue / 10));
				Quality_writer[j][3] = (data.response.data.data[j-i].Stat.revenue / 10);
				if(Quality_writer[j][2]==0)
						Quality_writer[j][4] = 0;
					else Quality_writer[j][4] = Quality_writer[j][3]/Quality_writer[j][2];
				
				sum1 = sum1 + Quality_writer[j][2];
				sum2 = sum2 + Quality_writer[j][3];
				console.log("J"+j+":"+Quality_writer[j]);
			} 
			j++;
		}
		if(sum1 != 0 || sum2 != 0){
			Quality_writer[j] = ["","",sum1,sum2];
			j+=2;
		}
		OA(offer)
	}
  };
  xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.rpa&fields[]=Affiliate.company&fields[]=Stat.affiliate_info3&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&groups[]=Stat.affiliate_info3&filters[Stat.conversions][conditional]=NOT_EQUAL_TO&filters[Stat.conversions][values]=0&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]="+offerName(offer)+"&filters[Affiliate.company][conditional]=LIKE&filters[Affiliate.company][values]=%Lolaleads%&sort[Stat.rpa]=desc&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]="+year+"-"+month+"-01&filters[Stat.date][values][]="+year+"-"+month+"-"+days+"&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
  xhttp.send(); 
}

function OA(offer){ 
  // OA request
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		var c=0;
		var sum1 = 0;
		var sum2 = 0;
		k = j;
		while(k<data.response.data.data.length+j){
			if(data.response.data.data[k-j].Stat.conversions!=0){
				Quality_writer[k][0] = data.response.data.data[k-j].Affiliate.company;
				Quality_writer[k][1] = data.response.data.data[k-j].Stat.affiliate_info3;
				Quality_writer[k][2] = (data.response.data.data[k-j].Stat.conversions - (data.response.data.data[k-j].Stat.revenue / 10));
				Quality_writer[k][3] = (data.response.data.data[k-j].Stat.revenue / 10);
				if(Quality_writer[k][2]==0)
						Quality_writer[k][4] = 0;
					else Quality_writer[k][4] = Quality_writer[k][3]/Quality_writer[k][2];
				sum1 = sum1 + Quality_writer[k][2];
				sum2 = sum2 + Quality_writer[k][3];
				console.log("K"+k+":"+Quality_writer[k]);
			} else {break;}
			k++;
		}
		if(sum1 != 0 || sum2 != 0){
			Quality_writer[k] = ["","",sum1,sum2];
			k+=2;
		}
		WOW(offer);
	}
  };
  xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.rpa&fields[]=Affiliate.company&fields[]=Stat.affiliate_info3&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&groups[]=Stat.affiliate_info3&filters[Stat.conversions][conditional]=NOT_EQUAL_TO&filters[Stat.conversions][values]=0&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]="+offerName(offer)+"&filters[Affiliate.company][conditional]=LIKE&filters[Affiliate.company][values]=%Online+Activity%&sort[Stat.rpa]=desc&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]="+year+"-"+month+"-01&filters[Stat.date][values][]="+year+"-"+month+"-"+days+"&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
  xhttp.send(); 
}

function WOW(offer){ 
  // WOW request
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		var sum1 = 0;
		var sum2 = 0;
		l = k;
		while(l<data.response.data.data.length+k){
			if(data.response.data.data[l-k].Stat.conversions!=0){
				Quality_writer[l][0] = data.response.data.data[l-k].Affiliate.company;
				Quality_writer[l][1] = data.response.data.data[l-k].Stat.affiliate_info3;
				Quality_writer[l][2] = (data.response.data.data[l-k].Stat.conversions - (data.response.data.data[l-k].Stat.revenue / 10));
				Quality_writer[l][3] = (data.response.data.data[l-k].Stat.revenue / 10);
				if(Quality_writer[l][2]==0)
						Quality_writer[l][4] = 0;
					else Quality_writer[l][4] = Quality_writer[l][3]/Quality_writer[l][2];
				sum1 = sum1 + Quality_writer[l][2];
				sum2 = sum2 + Quality_writer[l][3];
				console.log("L"+l+":"+Quality_writer[l]);
			}
			l++;
		}
		if(sum1 != 0 || sum2 != 0){
			Quality_writer[l] = ["","",sum1,sum2];
			l+=2;
		}
		Adtrackster(offer);
	}
  };
  xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.rpa&fields[]=Affiliate.company&fields[]=Stat.affiliate_info3&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&groups[]=Stat.affiliate_info3&filters[Stat.conversions][conditional]=NOT_EQUAL_TO&filters[Stat.conversions][values]=0&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]="+offerName(offer)+"&filters[Affiliate.company][conditional]=LIKE&filters[Affiliate.company][values]=%WOW%&sort[Stat.rpa]=desc&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]="+year+"-"+month+"-01&filters[Stat.date][values][]="+year+"-"+month+"-"+days+"&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
  xhttp.send(); 
}

function Adtrackster(offer){ 
  // Adtrackster request
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		var sum1 = 0;
		var sum2 = 0;
		m = l;
		while(m<data.response.data.data.length+l){
			if(data.response.data.data[m-l].Stat.conversions!=0){
				Quality_writer[m][0] = data.response.data.data[m-l].Affiliate.company;
				Quality_writer[m][1] = data.response.data.data[m-l].Stat.affiliate_info3;
				Quality_writer[m][2] = (data.response.data.data[m-l].Stat.conversions - (data.response.data.data[m-l].Stat.revenue / 10));
				Quality_writer[m][3] = (data.response.data.data[m-l].Stat.revenue / 10);
				if(Quality_writer[m][2]==0)
						Quality_writer[m][4] = 0;
					else Quality_writer[m][4] = Quality_writer[m][3]/Quality_writer[m][2];
				sum1 = sum1 + Quality_writer[m][2];
				sum2 = sum2 + Quality_writer[m][3];
				console.log("M"+m+":"+Quality_writer[m]);
			} 
			m++;
		}
		if(sum1 != 0 || sum2 != 0){
			Quality_writer[m] = ["","",sum1,sum2];
			m+=2;
		}
		Gotzha(offer);
	}
  };
  xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.rpa&fields[]=Affiliate.company&fields[]=Stat.affiliate_info3&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&groups[]=Stat.affiliate_info3&filters[Stat.conversions][conditional]=NOT_EQUAL_TO&filters[Stat.conversions][values]=0&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]="+offerName(offer)+"&filters[Affiliate.company][conditional]=LIKE&filters[Affiliate.company][values]=%dtrackster%&sort[Stat.rpa]=desc&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]="+year+"-"+month+"-01&filters[Stat.date][values][]="+year+"-"+month+"-"+days+"&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
  xhttp.send(); 
}

function Gotzha(offer){ 
  // Gotzha request
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		var sum1 = 0;
		var sum2 = 0;
		n = m;
		while(n<data.response.data.data.length+m){
			if(data.response.data.data[n-m].Stat.conversions!=0){
				Quality_writer[n][0] = data.response.data.data[n-m].Affiliate.company;
				Quality_writer[n][1] = data.response.data.data[n-m].Stat.affiliate_info3;
				Quality_writer[n][2] = (data.response.data.data[n-m].Stat.conversions - (data.response.data.data[n-m].Stat.revenue / 10));
				Quality_writer[n][3] = (data.response.data.data[n-m].Stat.revenue / 10);
				if(Quality_writer[n][2]==0)
						Quality_writer[n][4] = 0;
					else Quality_writer[n][4] = Quality_writer[n][3]/Quality_writer[n][2];
				
				sum1 = sum1 + Quality_writer[n][2];
				sum2 = sum2 + Quality_writer[n][3];
				console.log("N"+n+":"+Quality_writer[n]);
			} 
			n++;
		}
		if(sum1 != 0 || sum2 != 0){
			Quality_writer[n] = ["","",sum1,sum2];
			n+=2;
		}
		Quality_makeApiCallWriteAll(offer);
	}
  };
  xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Offer.name&fields[]=Stat.rpa&fields[]=Affiliate.company&fields[]=Stat.affiliate_info3&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&groups[]=Stat.affiliate_info3&filters[Stat.conversions][conditional]=NOT_EQUAL_TO&filters[Stat.conversions][values]=0&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]="+offerName(offer)+"&filters[Affiliate.company][conditional]=LIKE&filters[Affiliate.company][values]=%Gotzha%&sort[Stat.rpa]=desc&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]="+year+"-"+month+"-01&filters[Stat.date][values][]="+year+"-"+month+"-"+days+"&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
  xhttp.send(); 
}