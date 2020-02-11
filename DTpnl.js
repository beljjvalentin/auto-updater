	var DTpnl_writer = createArray(250, 240); // Schedule
	var pnlDToffers1 = ["AllYouCanLove NL", "AllYouCanLove BE", "AllYouCanLove AU", "AllYouCanLove UK", "AllYouCanLove NZ",
					"LuckyDating NL", "LuckyDating BE", "LuckyDating AUS", "LuckyDating UK", "LuckyDating NZ",
					"YourLoveMatch US"];
	var pnlDToffers2 = ["Allyoucanlove Netherlands", "Allyoucanlove	Belgium", "Allyoucanlove Australia", "Allyoucanlove United Kingdom", "Allyoucanlove New Zealand",
					"Luckydating Netherlands", "Luckydating Belgium", "Luckydating Australia", "Luckydting United Kingdom", "Luckydating New Zealand",
					"Yourlovematch United States"];
					
	var total_revenue1 = 0, total_revenue2 = 0, total_revenue3 = 0, total_revenue = 0;
	var total_cost1 = 0, total_cost2 = 0, total_cost3 = 0;
	var token = "";
	var revenue_data1 = "", revenue_data2 = "", revenue_data3 = "", revenue_data_full = "";

	DTpnl_writer = [
				['offers'    		, ],
				['Revenues'			, ],
				['Cost'   			, ],
				['operator cost'	, ],
				['margin'  			, ],
				['margin %'			, ],
				[''  				, ],
				['sum of margin'  	, ],
				[''  				, ],
				['Leads'  			, ],
				['Value of a Lead'  , ],
				['Sales'  			, ],
				['Value of a Sale'  , ],
				['FTD'  			, ],
				['Value of a FTD'   , ],
				['Lead2Sale'  		, ],
				['FTD Ratio'  		, ]];
	
	function DTpnl_clearAll() {
		var params = {
			// The ID of the spreadsheet to update.
			spreadsheetId: '1P48Glen_N2Vm6YVrC5LmFMkxasLs84Ku9o6AxptHK4o',  // TODO: Update placeholder value.

			// The A1 notation of the values to clear.
			range: 'April19!A1:Z500',  // TODO: Update placeholder value.
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

	function DTpnl_makeApiCallWriteAll() { 
		var params = {
			// The ID of the spreadsheet to update.
			spreadsheetId: '1P48Glen_N2Vm6YVrC5LmFMkxasLs84Ku9o6AxptHK4o',
	
			// The A1 notation of the values to update.
			range: 'April19!A1:Z500',  // TODO: Update placeholder value.
	
			// How the input data should be interpreted.
			valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
		};
		console.log(total_revenue1 + " " + total_revenue2 + " " + total_revenue3);
		var valueRangeBody = {
			"range": "April19!A1:Z500",  //Set this to cell want to add 'x' to.
			"majorDimension": "ROWS",
			"values": [
				['Total '+monthName(month), 'Revenue', 'Cost', 'Profit', 'Margin'],
				['1-10',  total_revenue1, total_cost1, '=C2-B2', '=D2/B2'],
				['11-20', total_revenue2, total_cost2, '=C3-B3', '=D3/B3'],
				['21-'+days, total_revenue3, total_cost3, '=C4-B4', '=D4/B4'],
				['operator messages', ],
				['Total', '=SUM(B2:B5)', '=SUM(C2:C5)', '=C6-B6', '=D6/B6']
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
	
	function DTpnl_makeApiCallWriteAll2() { 
		var params = {
			// The ID of the spreadsheet to update.
			spreadsheetId: '1P48Glen_N2Vm6YVrC5LmFMkxasLs84Ku9o6AxptHK4o',
	
			// The A1 notation of the values to update.
			range: 'Per_label!C30:Z500',  // TODO: Update placeholder value.
	
			// How the input data should be interpreted.
			valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
		};

		var valueRangeBody = {
			"range": "Per_label!C30:Z500",  //Set this to cell want to add 'x' to.
			"majorDimension": "ROWS",
			"values": [
			],           
			// TODO: Add desired properties to the request body. All existing properties
			// will be replaced.
		};
		
		for(var i=0; i<250; i++)
			valueRangeBody.values.push(DTpnl_writer[i]);
	  
		var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
		request.then(function(response) {
			// TODO: Change code below to process the `response` object:
			console.log(response.result);
		}, function(reason) {
			console.error('error: ' + reason.result.error.message);
		});
    }

	function DTpnl_HasoffersCall_full(){ 
		// Hasoffers Data HTTP request 3
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				var i = 0;
				while(i<data.response.data.data.length){
					var index = pnlDToffers1.indexOf(data.response.data.data[i].Offer.name);
					//if(data.response.data.data[i].Stat.conversions!=0)
						if(index > -1){
							DTpnl_writer[0][index+1] = data.response.data.data[i].Offer.name.replace( /[^A-Z ]/g, '' );
							DTpnl_writer[2][index+1] = parseFloat(data.response.data.data[i].Stat.payout);
							DTpnl_writer[9][index+1] = parseFloat(data.response.data.data[i].Stat.conversions);
						}
					i++;
				}
				DTpnl_HasoffersCall_1();
			}
		};
		xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Offer.name&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&limit=1000&page=1&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
		xhttp.send(); 
	}
	
	function DTpnl_HasoffersCall_1(){ 
		// Hasoffers Data HTTP request 1
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				var i = 0;
				while(i<data.response.data.data.length){
					if(data.response.data.data[i].Stat.conversions!=0)
						if(pnlDToffers1.indexOf(data.response.data.data[i].Offer.name) > -1)
							total_cost1 = total_cost1 + parseFloat(data.response.data.data[i].Stat.payout);
					i++;
				}
				DTpnl_HasoffersCall_2();
			}
		};
		xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Offer.name&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&limit=1000&page=1&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-10", true);
		xhttp.send(); 
	}
	
	function DTpnl_HasoffersCall_2(){ 
		// Hasoffers Data HTTP request 2
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				var i = 0;
				while(i<data.response.data.data.length){
					if(data.response.data.data[i].Stat.conversions!=0)
						if(pnlDToffers1.indexOf(data.response.data.data[i].Offer.name) > -1)
							total_cost2 = total_cost2 + parseFloat(data.response.data.data[i].Stat.payout);
					i++;
				}
				DTpnl_HasoffersCall_3();
			}
		};
		xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Offer.name&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&limit=1000&page=1&data_start="+year+"-"+month+"-11&data_end="+year+"-"+month+"-20", true);
		xhttp.send(); 
	}
	
	function DTpnl_HasoffersCall_3(){ 
		// Hasoffers Data HTTP request 3
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				var i = 0;
				while(i<data.response.data.data.length){
					var index = pnlDToffers1.indexOf(data.response.data.data[i].Offer.name);
					if(data.response.data.data[i].Stat.conversions!=0)
						if(index > -1){
							total_cost3 = total_cost3 + parseFloat(data.response.data.data[i].Stat.payout);
						}
					i++;
				}
				DTpnl_get_token();
			}
		};
		xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Offer.name&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&limit=1000&page=1&data_start="+year+"-"+month+"-21&data_end="+year+"-"+month+"-"+days, true);
		xhttp.send(); 
	}
		
	// Example POST method implementation:
	function DTpnl_get_token(){
		postData("https://dating-api.fortel-system.com/api/v1/auth/login", {email: "valentin@fortelmedia.com", password: "RkK7UWttHRyjaddv"})
		  .then(response => {
			  token = response.data.token;
			  
				fetch('https://dating-api.fortel-system.com/api/v1/reports/payers-and-payments?async=0&token='+token+'&from="+year+"-'+month+'-01&to="+year+"-'+month+'-10')
				  .then(function(response) {
					return response.json();
				  })
				  .then(function(myJson) {
					revenue_data1 = JSON.stringify(myJson);
					DTpnl_DatingCall1();
				  });
			  
				fetch('https://dating-api.fortel-system.com/api/v1/reports/payers-and-payments?async=0&token='+token+'&from="+year+"-'+month+'-11&to="+year+"-'+month+'-20')
				  .then(function(response) {
					return response.json();
				  })
				  .then(function(myJson) {
					revenue_data2 = JSON.stringify(myJson);
					DTpnl_DatingCall2();
				  });
				  
				fetch('https://dating-api.fortel-system.com/api/v1/reports/payers-and-payments?async=0&token='+token+'&from="+year+"-'+month+'-21&to="+year+"-'+month+'-'+days)
				  .then(function(response) {
					return response.json();
				  })
				  .then(function(myJson) {
					revenue_data3 = JSON.stringify(myJson);
					DTpnl_DatingCall3();
				  });
				  
				fetch('https://dating-api.fortel-system.com/api/v1/reports/payers-and-payments?async=0&token='+token+'&from="+year+"-'+month+'-01&to="+year+"-'+month+'-'+days)
				  .then(function(response) {
					return response.json();
				  })
				  .then(function(myJson) {
					revenue_data_full = JSON.stringify(myJson);
					DTpnl_DatingCall();
				  });
				setTimeout(DTpnl_makeApiCallWriteAll, 8000);
				setTimeout(DTpnl_makeApiCallWriteAll2, 8000);
			  
			  // "X-Authorization": "Bearer " + token
			  
		  }) // JSON-string from `response.json()` call
		  .catch(error => console.error(error));
	}
		function postData(url = "", data = {}) {
			// Default options are marked with *
			return fetch(url, {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				//mode: "no-cors", // no-cors, cors, *same-origin
				//cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				//credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json",
					"X-Requested-With" : "XMLHttpRequest",
					"Referer": "https://dating-admin.fortel-system.com" 
					
					// "Content-Type": "application/x-www-form-urlencoded",
				},
				//referrer: "no-referrer", // no-referrer, *client
				body: JSON.stringify(data), // body data type must match "Content-Type" header
			})
			.then(response => response.json()); // parses response to JSON
		}
	
	function DTpnl_DatingCall1(){ 
		// Dating system data HTTP request
		var data = JSON.parse(revenue_data1);		
	    for (x in data.data.results) { 
			if(data.data.results[x].payers_total != undefined){
				total_revenue1 = total_revenue1 + parseFloat(data.data.results[x].payments_total_by_total)/100;
				console.log(data.data.results[x].campaign + " " + data.data.results[x].country + " " 
				+ data.data.results[x].payers_total + " " + data.data.results[x].payments_made_by_total + " "
				+ data.data.results[x].payments_total_by_total);
			}	
		}
	}
	
	function DTpnl_DatingCall2(){ 
		// Dating system data HTTP request
		var data = JSON.parse(revenue_data2);		
	    for (x in data.data.results) { 
			if(data.data.results[x].payers_total != undefined)
				total_revenue2 = total_revenue2 + parseFloat(data.data.results[x].payments_total_by_total)/100;
		}
	}
	
	function DTpnl_DatingCall3(){ 
		// Dating system data HTTP request
		var data = JSON.parse(revenue_data3);		
	    for (x in data.data.results) { 
			if(data.data.results[x].payers_total != undefined)
				total_revenue3 = total_revenue3 + parseFloat(data.data.results[x].payments_total_by_total)/100;
		}
	}
	
	function DTpnl_DatingCall(){ 
		// Dating system data HTTP request
		var data = JSON.parse(revenue_data_full);		
	    for (x in data.data.results) { 
			var index = pnlDToffers2.indexOf(data.data.results[x].campaign + " " + data.data.results[x].country);
			if(data.data.results[x].payers_total != undefined && index!=-1){
				DTpnl_writer[1][index+1] = parseFloat(data.data.results[x].payments_total_by_total)/100;
				DTpnl_writer[11][index+1] = parseInt(data.data.results[x].payments_made_by_total);
				DTpnl_writer[13][index+1] = parseInt(data.data.results[x].payers_total);
			}
		}
	}