	var SuperPNL_writer = createArray(150, 2);
	function createArray(length) {
		var arr = new Array(length || 0),
        i = length;

		if (arguments.length > 1) {
			var args = Array.prototype.slice.call(arguments, 1);
			while(i--) arr[length-1 - i] = createArray.apply(this, args);
		}
		return arr;
	}
	
	function SuperPNL_clearAll(offer) {
      var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: '1oJYjqYGKwlXELrmh7RAWxPZaCSjSwlPwjHGDVhJ-lxw',  // TODO: Update placeholder value.

        // The A1 notation of the values to clear.
        range: monthName(offer)+'!A2:B301',  // TODO: Update placeholder value.
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
	
	function SuperPNL_makeApiCallWriteAll(month) {
	  var params = {
        // The ID of the spreadsheet to update.
		spreadsheetId: '1oJYjqYGKwlXELrmh7RAWxPZaCSjSwlPwjHGDVhJ-lxw',

        // The A1 notation of the values to update.
        range: monthName(month)+'!A2:B301',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": monthName(month)+'!A2:B301',  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			[monthName(month)+' stats',],
			['affiliate','payout']
		],          

		
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };

	  for(var t=0; t<150; t++)
		  valueRangeBody.values.push(SuperPNL_writer[t]);
	  
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }
	
function SuperPNL_HasoffersCall(month){ 
	// Data HTTP request
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			var total = data.response.data.data.length;
			var i=0; 
			while(i<data.response.data.data.length){
				if(data.response.data.data[i].Stat.conversions!=0){
					SuperPNL_writer[i][0] = data.response.data.data[i].Affiliate.company;					
					SuperPNL_writer[i][1] = data.response.data.data[i].Stat.payout;
					//console.log("I"+i+":"+SuperPNL_writer[i]);
				} else {break;}
				i++;
			}
			SuperPNL_writer[i] = [,"=SUM(B3:B"+(i+3)+")"];
			i+=2;
			//document.getElementById("txtHint").innerHTML = document.getElementById("txtHint").innerHTML + str;
			SuperPNL_makeApiCallWriteAll(month);
		}
	};

	xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Affiliate.company&fields[]=Stat.payout&groups[]=Affiliate.company&filters[Stat.payout][conditional]=GREATER_THAN&filters[Stat.payout][values]=0&limit=1000&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days, true);
	xhttp.send(); 
}

function monthName(num){
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Total"];
	return months[num-1];	
} 

