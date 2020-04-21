
var writer2 = createArray(80, 6); // today stats

var todayDate = new Date();
var dd = String(todayDate.getDate()).padStart(2, '0');
var dy = String(todayDate.getDate() - 1).padStart(2, '0');
var mm = String(todayDate.getMonth() + 1).padStart(2, '0');
var yyyy = todayDate.getFullYear();
todayDate = yyyy + '-' + mm + '-' + dd;
yesterdayDate = yyyy + '-' + mm + '-' + dy;

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

function test_DailyPnl(){
	//DTpnl_clearAll();
	var x = document.getElementById("myDate").value;
	//DailyPnl(x);
	DailyPnl(todayDate);
	DailyPnl(yesterdayDate);
}

function DailyPnl(requestDate){ 
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
		makeSheetCall(requestDate);
		//document.getElementById("txtHint").innerHTML = //document.getElementById("txtHint").innerHTML + str+'</div></div>';
	}
  };
  //console.log("https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Category.name&fields[]=Offer.name&fields[]=Affiliate.company&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&filters[Stat.date][conditional]=EQUAL_TO&filters[Stat.date][values]="+requestDate+"&sort[Stat.conversions]=desc");
  xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Category.name&fields[]=Offer.name&fields[]=Affiliate.company&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&filters[Stat.date][conditional]=EQUAL_TO&filters[Stat.date][values]="+requestDate+"&sort[Stat.conversions]=desc", true);
  setTimeout(xhttp.send(), 100);
}

function makeSheetCall(title) {
      var params = {
        spreadsheetId: '1ZgpJEUJ78u10Y4XFjdJx0UHvmkE-5VZ4jHcbYtFet7s', 
      };
      var batchUpdateSpreadsheetRequestBody = {
        "requests": [
			{
			  "addSheet": {
				"properties": {
				  "title": title,
				  "gridProperties": {
					"rowCount": 100,
					"columnCount": 20
				  }
				}
			  }
			}
		 ]
      };
	var request = gapi.client.sheets.spreadsheets.batchUpdate(params, batchUpdateSpreadsheetRequestBody);
	request.then(function(response) {
			// TODO: Change code below to process the `response` object:
			console.log(response.result);
			makeApiCallWriteDaily(title);
		}, function(reason) {
			//console.error('error: ' + reason.result.error.message);
			makeApiCallWriteDaily(title);
		});
}

function makeSheetDelete() {
      var params = {
        spreadsheetId: '1ZgpJEUJ78u10Y4XFjdJx0UHvmkE-5VZ4jHcbYtFet7s', 
      };
      var batchUpdateSpreadsheetRequestBody = {
        "requests": [
			{
			  "deleteSheet": {
				  "sheetId": '140412082'
				}
			  
			}
		 ]
      };
	var request = gapi.client.sheets.spreadsheets.batchUpdate(params, batchUpdateSpreadsheetRequestBody);
	request.then(function(response) {
			// TODO: Change code below to process the `response` object:
			console.log(response.result);
		}, function(reason) {
			console.error('error: ' + reason.result.error.message);
		});
}
	
function makeApiCallWriteDaily(sheet) {
	  var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: '1ZgpJEUJ78u10Y4XFjdJx0UHvmkE-5VZ4jHcbYtFet7s',

        // The A1 notation of the values to update.
        range: sheet+'!A1:F500',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": sheet+"!A1:F500",  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			['Traffic for ', sheet],
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