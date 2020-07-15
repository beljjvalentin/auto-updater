
	var writer = createArray(250, 6); // Schedule
	var writer1 = new Array(250); // geos
	var writer2 = createArray(80, 6); // today stats
	var writer3 = createArray(150, 12);
	var writer4 = createArray(150, 12);
	var writer5 = createArray(150, 12);
	var QAoffers = ["LoveMatch","2020Dating", "35PlusDate", "SuccesfulDating", "40PlusLove", "PerfectMatch",
					"Allyoucanlove", "LuckyDating", "HelloDate", "YourLoveMatch",
					"Medium Amanda", "Medium+Amanda+UK", "Medium+Amanda+FR", "Medium+Amanda+US",
					"Medium Theresa", "Medium Christina"];
	var pushQAoffers = ["Medium Christina NL", "Medium Amanda AU", "Medium Amanda BE", "Medium Amanda SE", "Medium Amanda US"];
	var FToffers = ["Amanda+AU", "Theresa+AU", "Christina+AU",
					"Amanda+BE", "Theresa+BE", "Christina+BE", 
					"Amanda+NL", "Theresa+NL", "Christina+NL", 
					"Amanda+UK", "Theresa+UK", "Christina+UK", 
					"Amanda+US", "Theresa+US", "Christina+US", 
					"Amanda+CA", "Amanda+DE", "Amanda+FR", "Amanda+NZ", "Christina+NZ", "Amanda+SE", "Amanda+IT", "Anja"];
	var DToffers = ["35plusdate+AU","2020Dating+AU", "40pluslove+AU", "allyoucanlove+AU", "hellodate+AU" ,"lovematch+AU", "luckydating+AU", "perfectmatch+AU", "succesfuldating+AU",
					"35plusdate+BE","2020Dating+BE", "40pluslove+BE", "allyoucanlove+BE", "hellodate+BE" , "lovematch+BE", "luckydating+BE", "perfectmatch+BE", "succesfuldating+BE",
					"35plusdate+NL","2020Dating+NL", "40pluslove+NL", "allyoucanlove+NL", "hellodate+NL", "lovematch+NL", "luckydating+NL", "perfectmatch+NL", "succesfuldating+NL",
					"35plusdate+NZ","2020Dating+NZ", "40pluslove+NZ", "allyoucanlove+NZ", "hellodate+NZ", "lovematch+NZ", "luckydating+NZ", "perfectmatch+NZ", "succesfuldating+NZ",
					"35pluslove+SE", "lovematch+SE",
					"35plusdate+UK","2020Dating+UK", "40pluslove+UK", "allyoucanlove+UK", "hellodate+UK", "lovematch+UK", "luckydating+UK", "perfectmatch+UK", "succesfuldating+UK",
					"yourlovematch+US"];
	
	var todayDate = new Date();
	var dd = String(todayDate.getDate()).padStart(2, '0');
	var mm = String(todayDate.getMonth() + 1).padStart(2, '0');
	var yyyy = todayDate.getFullYear();
	todayDate = yyyy + '-' + mm + '-' + dd;
	
	var sum = 0, i, j, m, l, k, o, p, date_count = 0; 
    function createArray(length) {
		var arr = new Array(length || 0),
        i = length;

		if (arguments.length > 1) {
			var args = Array.prototype.slice.call(arguments, 1);
			while(i--) arr[length-1 - i] = createArray.apply(this, args);
		}
    return arr;
	}
	
	function sortFunction(a, b) {
		if (a[5] === b[5]) {
			return 0;
		}
		else {
			return (a[5] < b[5]) ? -1 : 1;
		}
	}
	
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	function clearAll() {
      var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: Schedule_url,  // TODO: Update placeholder value.

        // The A1 notation of the values to clear.
        range: 'aPNL!A2:F500',  // TODO: Update placeholder value.
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
	
	function clearAllToday() {
      var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: Schedule_url,  // TODO: Update placeholder value.

        // The A1 notation of the values to clear.
        range: 'Today Traffic!A1:F500',  // TODO: Update placeholder value.
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
		
function makeApiCallWriteAll() {
	  
	  var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: Schedule_url,

        // The A1 notation of the values to update.
        range: 'aPNL!A2:F500',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": "aPNL!A2:F500",  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
		],          
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };

	  for(var i=0; i<writer.length; i++)
		  valueRangeBody.values.push(writer[i]);
	  
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }
	
function makeApiCallWriteDatingDays() { 
	  var params = {
        // The ID of the spreadsheet to update.  
		spreadsheetId: Schedule_url, // TODO: Update placeholder value. Auto schedule

        // The A1 notation of the values to update.
        range: 'DTdays!A3:CU60',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": "DTdays!A3:CU60",  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			writer5[0],	writer5[1],	writer5[2],	writer5[3],	writer5[4],	writer5[5],	writer5[6],	writer5[7],	writer5[8],	writer5[9],	writer5[10], writer5[11], writer5[12], writer5[13],	writer5[14],writer5[15],
			writer5[16], writer5[17],	writer5[18],	writer5[19],	writer5[20],	writer5[21],	writer5[22],	writer5[23],	writer5[24],	writer5[25],	writer5[26],	writer5[27],	writer5[28],	writer5[29],	writer5[30],
			writer5[31], writer5[32]
		],          

		
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };
		
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
}
	
	
function makeApiCallWriteAmandaDays() { 
	  var params = {
        // The ID of the spreadsheet to update.  
		spreadsheetId: Schedule_url, // TODO: Update placeholder value. Auto schedule

        // The A1 notation of the values to update.
        range: 'FTdays!A3:AY60',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": "FTdays!A3:AY60",  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			writer3[0],	writer3[1],	writer3[2],	writer3[3],	writer3[4],	writer3[5],	writer3[6],	writer3[7],	writer3[8],	writer3[9],	writer3[10], writer3[11], writer3[12], writer3[13],	writer3[14],writer3[15],
			writer3[16], writer3[17],	writer3[18],	writer3[19],	writer3[20],	writer3[21],	writer3[22],	writer3[23],	writer3[24],	writer3[25],	writer3[26],	writer3[27],	writer3[28],	writer3[29],	writer3[30],
			writer3[31], writer3[32]
		],          

		
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };
		
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
}
	  
function makeApiCallWriteQApnl() {
	  var params = {
        // The ID of the spreadsheet to update.
        //spreadsheetId: '163boTk9hgkFVUZnqpNpyNV9Hep-LAJy4ehG-WUkt9qY',  // TODO: Update placeholder value. Auto schedule
		spreadsheetId: Schedule_url,

        // The A1 notation of the values to update.
        range: 'QApnl!A2:AU60',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": "QApnl!A2:AU60",  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			//[ 'date', 'Medium Amanda AUS', 'Medium Amanda BEnl', 'Medium Amanda NL'],
		],          

		
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };
      for(var i=0; i<writer4.length; i++){
		  valueRangeBody.values.push(writer4[i]);
	  }
	  writer4 = createArray(150, 12);
	
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);

      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
}
		
function makeApiCallWriteToday() {
	  var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: Schedule_url,

        // The A1 notation of the values to update.
        range: 'Today Traffic!A1:F500',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": "Today Traffic!A1:F500",  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			['Traffic for Today', todayDate],
			["offer", "affiliate", "clicks", "leads", "sales"]
		],          
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };
	  
	  for(var i=0; i<writer2.length; i++){
		  valueRangeBody.values.push(writer2[i]);
	  }
	  
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }

function Plus35Func(activate) {

  if (activate.length == 0) { 
    //document.getElementById("txtHint").innerHTML = "";
    return;
  }
  Plus35AUS();
}
  
function Plus35AUS(){ 
 // 35Plus AUS request
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		i=0, j=0;
		while(j<data.response.data.data.length){
			try{
				writer[i][0] = data.response.data.data[j].Offer.name;
				if (writer[i][0].includes(" NL")) {					
					writer1[i] = "NL";
				} else if(writer[i][0].includes(" BE")) {					
					writer1[i] = "BE";
				} else if(writer[i][0].includes(" AU")) {				
					writer1[i] = "AU";
				} else if(writer[i][0].includes(" CA")) {				
					writer1[i] = "CA";
				} else if(writer[i][0].includes(" UK")) {				
					writer1[i] = "UK";
				} else if(writer[i][0].includes(" US")) {				
					writer1[i] = "US";
				} else if(writer[i][0].includes(" SE")) {				
					writer1[i] = "SE";
				} else if(writer[i][0].includes(" FR")) {				
					writer1[i] = "FR";
				} else if(writer[i][0].includes(" NZ")) {				
					writer1[i] = "NZ";
				} else {				
					writer1[i] = "GEO";
				}
				writer[i][1] = data.response.data.data[j].Affiliate.company;
				writer[i][2] = data.response.data.data[j].Stat.payout;
				writer[i][3] = (data.response.data.data[j].Stat.conversions - (data.response.data.data[j].Stat.revenue / 10));
				writer[i][4] = (data.response.data.data[j].Stat.revenue / 10);
				writer[i][5] = writer[i][4]/writer[i][3];
				//console.log("I"+i+":"+writer[i]);
			} catch (e){
			
			}
			i++; j++;
			//if(j<data.response.data.data.length && data.response.data.data[j].Offer.name != data.response.data.data[(j-1)].Offer.name) i++;
		}
		for(var l = 0; l < writer1.length; l++)
			for(var m = 1; m < writer1.length; m++)
				if(writer1[m] < writer1[m-1]){
					var tmp = writer1[m-1];
					writer1[m-1] = writer1[m];
					writer1[m] = tmp;
					
					var tmp2 = writer[m-1];
					writer[m-1] = writer[m];
					writer[m] = tmp2;
					//console.log(tmp2);
				}
		
		i++; j++;
		
		writer[i] = [,,,'TOTAL traffic expenses','=SUM(C20:C450)'];
		
		showHint4(1);
		//Plus35BEnl();
	}
  };
  console.log("https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Offer.name&fields[]=Affiliate.company&fields[]=Stat.payout&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&filters[Stat.payout][conditional]=NOT_EQUAL_TO&filters[Stat.payout][values]=0&sort[Offer.name]=asc&sort[Stat.conversions]=desc&limit=5000&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days);
  xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Offer.name&fields[]=Affiliate.company&fields[]=Stat.payout&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&filters[Stat.payout][conditional]=NOT_EQUAL_TO&filters[Stat.payout][values]=0&sort[Offer.name]=asc&sort[Stat.conversions]=desc&limit=5000&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
  xhttp.send(); 
}

async function showHint4(activate) {
	var xhttp, str, sum=0;
	if (activate.length == 0) { 
		//document.getElementById("txtHint").innerHTML = "";
		return;
	}
	for(var offer=0; offer<FToffers.length; offer++){
		FTdays(offer, FToffers[offer]);
	}
	await sleep(10000);
	for(var offer=0; offer<DToffers.length; offer++){
		DTdays(offer, DToffers[offer]);
	}
	await sleep(10000);
	for(var offer=0; offer<QAoffers.length; offer++){
		QApnl(offer, QAoffers[offer]);
	}
	await sleep(10000);
	for(var offer=0; offer<pushQAoffers.length; offer++){
		pushQApnl(offer, pushQAoffers[offer]);
	}
}
 
 function FTdays(order, offer_name){
	// FT days offer request
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		try{
		var data = JSON.parse(this.responseText);
			if(date_count<data.response.data.data.length)
				date_count = data.response.data.data.length;
			var c = 0;
			for(var i=0; i<data.response.data.data.length; i++){
				c = 0;
				if(date_count == data.response.data.data.length)
					writer3[i][0] = data.response.data.data[i].Stat.date;
				while(writer3[c][0] != data.response.data.data[i].Stat.date){
					c = c + 1;
				}
				if(data.response.data.data[i].Stat.payout > 0){
					writer3[c][(order+1)*2-1] = (data.response.data.data[i].Stat.conversions - (data.response.data.data[i].Stat.revenue / 10));
					writer3[c][(order+1)*2] = data.response.data.data[i].Stat.payout;
				}
			}	
		}catch(e){
			
		}
		//if(order == FToffers.length-1) showHint6(1);
	  }
	};
	xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&groups[]=Stat.date&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]=%"+offer_name+"%&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
	xhttp.send();
 }

  function DTdays(order, offer_name){
	// FD days offer request
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		try{
		var data = JSON.parse(this.responseText);
			if(date_count<data.response.data.data.length)
				date_count = data.response.data.data.length;
			//console.log(date_count + " " + data.response.data.data.length);
			var c = 0;
			for(var i=0; i<data.response.data.data.length; i++){	
				c = 0;
				if(date_count == data.response.data.data.length){
					writer5[i][0] = data.response.data.data[i].Stat.date;
				}
				while(writer5[c][0] != data.response.data.data[i].Stat.date){
					c = c + 1;
				} 
				if(data.response.data.data[i].Stat.payout > 0){
					writer5[c][(order+1)*2-1] = (data.response.data.data[i].Stat.conversions - (data.response.data.data[i].Stat.revenue / 10));
					writer5[c][(order+1)*2] = data.response.data.data[i].Stat.payout;
					//console.log("c[" + c + "] " + writer5[c][0]+" "+offer_name+" "+writer5[c][(order+1)*2]);
				}
			}	
		}catch(e){
			
		}
		//if(order == DToffers.length-1) showHint6(1);
	  }
	};
	xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&groups[]=Stat.date&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]=%25"+offer_name+"%25&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
	//console.log("https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&groups[]=Stat.date&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]=%25"+offer_name+"%25&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days);
	xhttp.send();
 }
 
 function QApnl(order, offer_name){ 
     //QApnl request
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		try{
			var data = JSON.parse(this.responseText);
			if(date_count<data.response.data.data.length)
				date_count = data.response.data.data.length;
			var c = 0;
			for(var i=0; i<data.response.data.data.length; i++){	
				c = 0;
				if(date_count == data.response.data.data.length){
					writer4[i][0] = data.response.data.data[i].Stat.date;
					writer4[i][1] = "=SUM(D"+(i+2)+",F"+(i+2)+",H"+(i+2)+",J"+(i+2)+",L"+(i+2)+",N"+(i+2)+",P"+(i+2)+",R"+(i+2)+",T"+(i+2)+",V"+(i+2)+")";
					writer4[i][2] = "=SUM(X"+(i+2)+",Z"+(i+2)+",AD"+(i+2)+",AF"+(i+2)+", AH"+(i+2)+",AJ"+(i+2)+",AL"+(i+2)+",AN"+(i+2)+",AP"+(i+2)+")";
				}
				while(writer4[c][0] != data.response.data.data[i].Stat.date){
					c = c + 1;
				} 
				if(data.response.data.data[i].Stat.payout > 0){
					if(!offer_name.includes("Push")){
						if(offer_name == "Medium Amanda"){ // exclude US, UK, FR which are in different columns
							writer4[c][(order+1)*2+1] = "="+(data.response.data.data[i].Stat.conversions - (data.response.data.data[i].Stat.revenue / 10))+"-Z"+(i+2)+"-AB"+(i+2)+"-AD"+(i+2);
							writer4[c][(order+1)*2+2] = "="+data.response.data.data[i].Stat.payout+"-AA"+(i+2)+"-AC"+(i+2)+"-AE"+(i+2);
						} else if( offer_name == "Medium Christina" ){
							writer4[c][(order+1)*2+1] = "="+(data.response.data.data[i].Stat.conversions - (data.response.data.data[i].Stat.revenue / 10))+"-AJ"+(i+2);
							writer4[c][(order+1)*2+2] = "="+data.response.data.data[i].Stat.payout+"-AK"+(i+2);
						} else {
							writer4[c][(order+1)*2+1] = (data.response.data.data[i].Stat.conversions - (data.response.data.data[i].Stat.revenue / 10));
							writer4[c][(order+1)*2+2] = data.response.data.data[i].Stat.payout;
						}
					}
				}
			}	
		}catch(e){
			
		}
	  }
  };
	if( offer_name == "Medium Amanda" ) // exclude Push offers which are in different columns
		xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&filters[Goal.name][conditional]=LIKE&filters[Goal.name][values]=lead&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]="+year+"-"+month+"-01&filters[Stat.date][values][]="+year+"-"+month+"-"+days+"&filters[Category.name][conditional]=LIKE&filters[Category.name][values]=Medium+Amanda&limit=1000", true);
	else if( offer_name == "Medium+Amanda+UK" || offer_name == "Medium+Amanda+FR" || offer_name == "Medium+Amanda+US" ){
		//console.log("https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]="+year+"-"+month+"-01&filters[Stat.date][values][]="+year+"-"+month+"-"+days+"&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values][]=%"+offer_name+"%&limit=1000");
		xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]="+year+"-"+month+"-01&filters[Stat.date][values][]="+year+"-"+month+"-"+days+"&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values][]=%"+offer_name+"%&limit=1000", true);
	}
	else xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&groups[]=Stat.date&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]="+offer_name+"%&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
	setTimeout(xhttp.send(), 100);
}

function pushQApnl(order, offer_id){
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		try{
			var data = JSON.parse(this.responseText);
			if(date_count<data.response.data.data.length)
				date_count = data.response.data.data.length;
			var c = 0;
			for(var i=0; i<data.response.data.data.length; i++){	
				for(c = 0; c<31; c++){
					if(writer4[c][0] == data.response.data.data[i].Stat.date)
						break;
				} 
				if(data.response.data.data[i].Stat.conversions > 0 && data.response.data.data[i].Offer.name.includes( offer_id )){
					//console.log(writer4[c][0]);
					//console.log(data.response.data.data[i]);
					if(writer4[c][(QAoffers.length+order+1)*2+1] == undefined) 
						writer4[c][(QAoffers.length+order+1)*2+1] = parseInt(data.response.data.data[i].Stat.conversions);
					else
						writer4[c][(QAoffers.length+order+1)*2+1] = parseInt(writer4[c][(QAoffers.length+order+1)*2+1]) + parseInt(data.response.data.data[i].Stat.conversions);
					if(writer4[c][(QAoffers.length+order+1)*2+2] == undefined) 
						writer4[c][(QAoffers.length+order+1)*2+2] = parseInt(data.response.data.data[i].Stat.payout);
					else 
						writer4[c][(QAoffers.length+order+1)*2+2] = parseInt(writer4[c][(QAoffers.length+order+1)*2+2]) + parseInt(data.response.data.data[i].Stat.payout);
				}
			}	
		}catch(e){
			
		}
		if(order == pushQAoffers.length-1) showHint6(1);
	}
	};
	xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Offer.name&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&filters[Goal.name][conditional]=LIKE&filters[Goal.name][values]=LEAD_SOI&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]="+year+"-"+month+"-01&filters[Stat.date][values][]="+year+"-"+month+"-"+days+"&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values][]=%Push+Flow%&limit=1000", true);
	setTimeout(xhttp.send(), 100);
}
 
function showHint6(activate) {
  var xhttp, str, sum=0;
  if (activate.length == 0) { 
    //document.getElementById("txtHint").innerHTML = "";
    return;
  }
  TodayPnl();
 }

function TodayPnl(){ 
     // Today pnl request
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(this.responseText);
		try{
			for(var i=0; i<data.response.data.data.length; i++){
				if(data.response.data.data[i].Stat.conversions!=0){
					writer2[i][0] = data.response.data.data[i].Offer.name;
					writer2[i][1] = data.response.data.data[i].Affiliate.company;
					writer2[i][2] = data.response.data.data[i].Stat.clicks;
					writer2[i][3] = parseInt(data.response.data.data[i].Stat.conversions - (data.response.data.data[i].Stat.revenue / 10));
					writer2[i][4] = parseInt(data.response.data.data[i].Stat.revenue / 10);
					writer2[i][5] = data.response.data.data[i].Category.name;
				}
			}
			writer2.sort(sortFunction);
		}catch (e){
			
		}
		//document.getElementById("txtHint").innerHTML = //document.getElementById("txtHint").innerHTML + str+'</div></div>';
		makeApiCallWriteAll();
		makeApiCallWriteAmandaDays();
		makeApiCallWriteDatingDays();
		makeApiCallWriteQApnl();
		makeApiCallWriteToday();
		makeApiCallWriteToday();
	}
  };
  //console.log("https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Category.name&fields[]=Offer.name&fields[]=Affiliate.company&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&filters[Stat.date][conditional]=EQUAL_TO&filters[Stat.date][values]="+todayDate+"&sort[Stat.conversions]=desc");
  xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Category.name&fields[]=Offer.name&fields[]=Affiliate.company&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&filters[Stat.date][conditional]=EQUAL_TO&filters[Stat.date][values]="+todayDate+"&sort[Stat.conversions]=desc", true);
  setTimeout(xhttp.send(), 100);
  
}