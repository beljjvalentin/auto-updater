var i=0,j=0,k=0,a=0;
	var xhttp, str, sum=0;
	var ALLaffiliates = [];
	var ALLoffers = [66, 68, 62, 64, 60, 297, 42, 44, 38, 40, 58, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 295,
							314,316,318,324,326,   327,331,330,329,328,  349, 348, 351, 347, 350,
							4, 36, 122, 76, 124, 126, 229, 199, 98, 100, 193, 191, 189, 237, 233, 241, 245, 239, 247, 249, 279, 281, 283, 259, 257, 261, 255, 285, 253];
	
	var Basic_writer = [];
	var Payout_writer = createArray(850, 68); // When adjusting also change row 60
	function Payout_clearAll() {
      var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: '1rFhqvqdbBF2muM8ZnyASQdkzILYfgbvxPZrkuEE0HFU',  // TODO: Update placeholder value.

        // The A1 notation of the values to clear.
        range: 'affPayouts!A4:BQ600',  // TODO: Update placeholder value.
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
	
	function Payout_makeApiCallWriteAll() {
	  var params = {
        // The ID of the spreadsheet to update.
		spreadsheetId: '1rFhqvqdbBF2muM8ZnyASQdkzILYfgbvxPZrkuEE0HFU',

        // The A1 notation of the values to update.
        range: 'affPayouts!A4:BQ600',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": 'affPayouts!A4:BQ600',  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			//['Writing payouts from hasoffers','','','','','']
		],          

		
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };

	  valueRangeBody.values.push(Basic_writer);
	  for(var i=0; i<550; i++)
		  valueRangeBody.values.push(Payout_writer[i]);
	  Payout_writer = createArray(850, 68); // To bypass overflow error
	  
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }
	
	function basicPayout(){
		// Basic payouts HTTP request
		xhttp2 = new XMLHttpRequest();
		xhttp2.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				var index2 = [];
				for (var key in data.response.data) {
					index2.push(key);
				}
				Basic_writer[0] = "affiliate_id";
				Basic_writer[1] = "default payout";
				for (var i=0; i<index2.length; i++){
					for(var j=0; j<ALLoffers.length; j++)
						if(data.response.data[""+index2[i]+""].Goal.offer_id == ALLoffers[j])
							Basic_writer[j+2] = data.response.data[""+index2[i]+""].Goal.default_payout;
				}
			}
		};
		xhttp2.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Goal&Method=findAll&fields[]=id&fields[]=offer_id&fields[]=default_payout&filters[name][LIKE]=lead", true);
		xhttp2.send(); 
	}	
	
	function Payout_HasoffersCall(){ 
		// Affilites HTTP request
		xhttp1 = new XMLHttpRequest();
		xhttp1.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				var index1 = [];
				for (var key in data.response.data) {
					index1.push(key);
				}
				for (var i=0; i<index1.length; i++){
					Payout_writer[i][0] = data.response.data[""+index1[i]+""].Affiliate.id;
					Payout_writer[i][1] = data.response.data[""+index1[i]+""].Affiliate.company;
					ALLaffiliates.push(Payout_writer[i][0]);
				}
				
				// Data HTTP request
				basicPayout();
				OfferPayouts(0, 2);
			}
		};
		xhttp1.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Affiliate&Method=findAll&fields[]=company&fields[]=id&sort[Affiliate.company]=asc", true);
		xhttp1.send(); 
	}	

	function OfferPayouts(offerId, position){
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				var length = Object.keys(data.response.data).length;
				
				i=0; 
				var index = [];
				for (var x in data.response.data) {
					index.push(x);
					var place = ALLaffiliates.indexOf(data.response.data[""+index[i]+""].OfferPayout.affiliate_id);
					if(place != -1){
						Payout_writer[place][position] = data.response.data[""+index[i]+""].OfferPayout.payout;
					}
					i++;
				}
				i++;
				if(position<ALLoffers.length+1)
					setTimeout(OfferPayouts(offerId+1, position+1), 1000);
				else Payout_dataSorting();
				
			}
		};
		xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Offer&Method=getPayouts&id="+ALLoffers[offerId], true);
		xhttp.send(); 
	}

	function Payout_dataSorting(){	
		// Data filter
		for(var i=0; i<Payout_writer.length; i++){
			for(var j=2; j<ALLoffers.length; j++){
				if(Payout_writer[i][j] != null) break;
				if(j == ALLoffers.length-1){
					Payout_writer.splice(i, 1);
					i--;
					break;
				}
			}	
		}
		// Bubble sort
		for(var i=0; i < Payout_writer.length-1; i++)
			for(var j = Payout_writer.length-1; j > i; j--)
				if(Payout_writer[j-1][1].toLowerCase() > Payout_writer[j][1].toLowerCase()){
					var tmp = Payout_writer[j-1];
					Payout_writer[j-1] = Payout_writer[j];
					Payout_writer[j] = tmp;
				}
		Payout_clearAll();
		Payout_makeApiCallWriteAll();
	}