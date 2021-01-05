	var FTlola_writer = createArray(35, 4);
	var FTpnl_writer = createArray(23, 4);
	
	function createArray(length) {
		var arr = new Array(length || 0),
        i = length;

		if (arguments.length > 1) {
			var args = Array.prototype.slice.call(arguments, 1);
			while(i--) arr[length-1 - i] = createArray.apply(this, args);
		}
		return arr;
	}
	
	function FTpnl_clearAll() {
      var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: '1BW9gVdlKYB_2QbFFOyDm3YT6xtyO0r2eGhkmFgqbsxY',  // TODO: Update placeholder value.

        // The A1 notation of the values to clear.
        range: monthName(month)+'!A38:D57',  // TODO: Update placeholder value.
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
	
	function FTpnl_makeApiCallWriteAll() {
	  var params = {
        // The ID of the spreadsheet to update.
		spreadsheetId: '1BW9gVdlKYB_2QbFFOyDm3YT6xtyO0r2eGhkmFgqbsxY',

        // The A1 notation of the values to update.
        range: monthName(month)+'!A38:D60',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": monthName(month)+'!A38:D60',  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			//['Writing values from hasoffers','','','','','']
		],          

		
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };

	  for(var i=0; i<FTpnl_writer.length; i++)
		  valueRangeBody.values.push(FTpnl_writer[i]);
	  
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }
	
	function FTpnl_loadDoc() {
		var xhttp = new XMLHttpRequest();
		xhttp.onerror = function(error) {
			//location.reload();
		};
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				try{
					var text = this.responseText;
					//console.log(text);
					var myObj = JSON.parse(text);
					var i=0;
					for(i=0; i<myObj.arrStatsData.length; i++){
						FTpnl_writer[i][0] = myObj.arrStatsData[i].Label;
						FTpnl_writer[i][1] = myObj.arrStatsData[i].Data[0].Data.org_tot;
						FTpnl_writer[i][3] = myObj.arrStatsData[i].Data[0].Data.cst;
						if (FTpnl_writer[i][0].includes('BE') || FTpnl_writer[i][0].includes('NL') || FTpnl_writer[i][0].includes('UK') || FTpnl_writer[i][0].includes('FR'))
							FTpnl_writer[i][2] = '=B'+(i+38)+'/1.21';
						else FTpnl_writer[i][2] = '=B'+(i+38);
						//console.log(writer[i][0].includes('BE') || writer[i][0].includes('NL') || writer[i][0].includes('UK') || writer[i][0].includes('FR'));
					}
					FTpnl_writer[i][1] = "=SUM(B38:B"+(i+37)+")";
					FTpnl_writer[i][2] = "=SUM(C38:C"+(i+37)+")";
					FTpnl_writer[i][3] = "=SUM(D38:D"+(i+37)+")";
				}catch(e){
				   console.log("Error",e);
				}
				setTimeout(FTpnl_makeApiCallWriteAll(), 1000);
			}
		};
		
		xhttp.open("GET", "https://new.topaz.md/upload/ckUpload/get_stats.php?start_date="+year+"-"+month+"-01&end_date="+year+"-"+month+"-"+days, true);
		xhttp.send();		
		
	}
	
	function FTlola_clearAll() {
      var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: '1BW9gVdlKYB_2QbFFOyDm3YT6xtyO0r2eGhkmFgqbsxY',  // TODO: Update placeholder value.

        // The A1 notation of the values to clear.
        range: monthName(month)+'!A3:D35',  // TODO: Update placeholder value.
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
	
	function FTlola_makeApiCallWriteAll() {
	  var params = {
        // The ID of the spreadsheet to update.
		spreadsheetId: '1BW9gVdlKYB_2QbFFOyDm3YT6xtyO0r2eGhkmFgqbsxY',

        // The A1 notation of the values to update.
        range: monthName(month)+'!A3:D35',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": monthName(month)+'!A3:D35',  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			//['Writing payouts from hasoffers','','','','','']
		],          

		
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };

	  for(var i=0; i<FTlola_writer.length; i++)
		  valueRangeBody.values.push(FTlola_writer[i]);
	  
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }
	
	function FTlola_loadDoc() {
		var xhttp = new XMLHttpRequest();
		xhttp.onerror = function(error) {
			//location.reload();
		};
		
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				try{
					// console.log(this.responseText);
					var myObj = JSON.parse(this.responseText);
					var i=0;
					for(i=0; i<myObj.data.length; i++){
						FTlola_writer[i][0] = myObj.data[i].offer_name;
						FTlola_writer[i][1] = myObj.data[i].price;
						FTlola_writer[i][2] = myObj.data[i].conversions;
						FTlola_writer[i][3] = myObj.data[i].revenue;
					}
					FTlola_writer[i][1] = "=SUM(B3:B"+(i+2)+")";
					FTlola_writer[i][2] = "=SUM(C3:C"+(i+2)+")";
					FTlola_writer[i][3] = "=SUM(D3:D"+(i+2)+")";
				}catch(e){
				   console.log("Error",e);
				}	
				setTimeout(FTlola_makeApiCallWriteAll(), 1000);
			}
		};
		xhttp.open("GET", "https://new.topaz.md/upload/ckUpload/get_lola_stats.php?year="+year+"&month="+month+"&days="+days, true);
		xhttp.send();
	}
