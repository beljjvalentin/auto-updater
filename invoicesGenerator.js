	var invoiceGen = createArray(200, 4);
	var page = 1, c=0;
	var Divinetion = ["LoveMatch", "35plusdate", "SuccesfulDating", "40pluslove"];
	var Plus5Concepts = ["Amanda", "Theresa", "Christina", "Anja"];
	var GreenLights = [ "LoveMatch", "35plusdate", "SuccesfulDating", "40pluslove", "LuckyDating", 
						"AllYouCanLove", "YourLoveMatch", "HelloDate", "2020Dating", "PerfectMatch"];
	
	for(var j=0; j<invoiceGen.length; j++){
		invoiceGen[j][1] = 0;
		invoiceGen[j][2] = 0;
	}
	
	function invoiceGen_clearAll(month) {
      var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: '1keO-hdrOovAZxMtIB6mWOoGerNppkUdS6ko9TojWaKg',  // TODO: Update placeholder value.

        // The A1 notation of the values to clear.
        range: monthName(month)+'!A1:E301',  // TODO: Update placeholder value.
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
	
	function invoiceGen_makeApiCallWriteAll(month) {
	  var params = {
        // The ID of the spreadsheet to update.
		spreadsheetId: '1keO-hdrOovAZxMtIB6mWOoGerNppkUdS6ko9TojWaKg',

        // The A1 notation of the values to update.
        range: monthName(month)+'!A1:E301',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": monthName(month)+'!A1:E301',  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			//[monthName(month), 'Divinetion', '', ''],
			//['offer', 'cost of leads', 'amount of leads', 'total']
			
		],          

		
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };
		var tmp_sum = 0;
		
		/*for(var t=0; t<invoiceGen.length; t++)
			for(var u=0; u<Divinetion.length; u++)
				if(invoiceGen[t][1] != 0 && invoiceGen[t][2] != 0 && invoiceGen[t][0].includes(Divinetion[u])){
					valueRangeBody.values.push(invoiceGen[t]);
					tmp_sum = tmp_sum + 1;
				}
		valueRangeBody.values.push(['Sum of Cost Divinetion', '=SUM(D3:D'+(tmp_sum+2)+')', '=B'+(tmp_sum+3)+'/0,7', '30 % margin of the revenue']);
		valueRangeBody.values.push(['', '', '', '']);		*/
		valueRangeBody.values.push([monthName(month), '5PlusConcepts', '', '']);
		valueRangeBody.values.push(['offer', 'cost of leads', 'amount of leads', 'total']);
		
		var tmp_sum2 = 0;
		for(var t=0; t<invoiceGen.length; t++)
			for(var u=0; u<Plus5Concepts.length; u++)
				if(invoiceGen[t][1] != "0,000000" && invoiceGen[t][2] != 0 && invoiceGen[t][0].includes(Plus5Concepts[u])){
					valueRangeBody.values.push(invoiceGen[t]);
					tmp_sum2 = tmp_sum2 + 1;
				}
		valueRangeBody.values.push(['Sum of Cost 5PlusConcepts', '=SUM(D'+(tmp_sum+2)+':D'+(tmp_sum+tmp_sum2+3)+')', '=B'+(tmp_sum+tmp_sum2+3)+'/0,8', '20 % margin of the revenue']);
		valueRangeBody.values.push(['', '', '', '']);		
		valueRangeBody.values.push([monthName(month), 'GreenLightConcepts', '', '']);
		valueRangeBody.values.push(['offer', 'cost of leads', 'amount of leads', 'total']);		
		
		var tmp_sum3 = 0;
		for(var t=0; t<invoiceGen.length; t++)
			for(var u=0; u<GreenLights.length; u++)
				if(invoiceGen[t][1] != "0,000000" && invoiceGen[t][2] != 0 && invoiceGen[t][0].includes(GreenLights[u])){
					valueRangeBody.values.push(invoiceGen[t]);
					tmp_sum3 = tmp_sum3 + 1;
				}
		valueRangeBody.values.push(['Sum of Cost GreenLightConcepts', '=SUM(D'+(tmp_sum+tmp_sum2+6)+':D'+(tmp_sum+tmp_sum2+tmp_sum3+6)+')', '=B'+(tmp_sum+tmp_sum2+tmp_sum3+7)+'/0,7', '30 % margin of the revenue']);

		
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }
	
	function check_array(search, payout){
		for(var j=0; j<invoiceGen.length; j++){
			if(invoiceGen[j][0] == search && invoiceGen[j][1] == payout){
				invoiceGen[j][2] = invoiceGen[j][2] + 1;
				//console.log("J"+j+":"+invoiceGen[j]);
				return true;
			} 
		}
		return false;
	}
	
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	function invoiceGen_HasoffersCall(month, page){ 
		// Data HTTP request
		document.getElementById("test9").disabled = true;
		/*for(var j=0; j<invoiceGen.length; j++){
			invoiceGen[j][1] = 0;
			invoiceGen[j][2] = 0;
		}*/
		
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = async function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				var total = data.response.data.data.length;
				var i=0; 
				
				while(i<data.response.data.data.length){
					/*for(var j=0; j<invoiceGen.length; j++){
						if(invoiceGen[j][0] == data.response.data.data[i].Offer.name){
							invoiceGen[j][2] = invoiceGen[j][2] + 1;
							console.log("J"+i+":"+invoiceGen[j]);
							i++;
							break;
						} 
					}*/
					if( check_array(
							data.response.data.data[i].Offer.name, 
							data.response.data.data[i].Stat.payout
							))
					{
						i++;
						continue;
					} else {
						try {
							invoiceGen[c][0] = data.response.data.data[i].Offer.name;					
							invoiceGen[c][1] = data.response.data.data[i].Stat.payout;
							invoiceGen[c][2] = 1;
							c++;
							i++;
						} catch(e) {
						
						}
					}					
				}
				
				for(var j=0; j<invoiceGen.length; j++){
					try{
						invoiceGen[j][1] = invoiceGen[j][1].replace(",", ".");
					} catch(e) {
						
					}
					invoiceGen[j][3] = invoiceGen[j][1] * invoiceGen[j][2];
					if(invoiceGen[j][2] == 0) break;
				}
				for(var j=0; j<invoiceGen.length; j++){
					try{
						invoiceGen[j][1] = invoiceGen[j][1].replace(".", ",");
					} catch(e) {
						
					}
					console.log(invoiceGen[j]);
					if(invoiceGen[j][2] == 0) break;
				}
				
				i+=2;
				if(data.response.data.page < data.response.data.pageCount){
					page = page + 1;
					await sleep(1000);
					invoiceGen_HasoffersCall(month, page);
				} else {
					//invoiceGen_clearAll(month);
					invoiceGen_makeApiCallWriteAll(month);
				}
				//document.getElementById("txtHint").innerHTML = document.getElementById("txtHint").innerHTML + str;
				//SuperPNL_makeApiCallWriteAll(month);
				//invoiceGen_HasoffersCall(3, 2);
			}
		};

		xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getConversions&fields[]=Stat.offer_id&fields[]=Stat.id&fields[]=Stat.datetime&fields[]=Offer.name&fields[]=Stat.payout&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]="+year+"-"+month+"-01&filters[Stat.date][values][]="+year+"-"+month+"-"+days_prev+"&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days_prev+"&limit=5000&page="+page, true);
		console.log("https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getConversions&fields[]=Stat.offer_id&fields[]=Stat.id&fields[]=Stat.datetime&fields[]=Offer.name&fields[]=Stat.payout&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]="+year+"-"+month+"-01&filters[Stat.date][values][]="+year+"-"+month+"-"+days_prev+"&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days_prev+"&limit=5000&page="+page);
		xhttp.send(); 
	}


