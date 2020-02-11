var writerFraud = createArray(1000, 7);
var cFr = 0;

function loadXMLDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			var keys = Object.keys(data.response.data.data);
			for(var i=0; i<keys.length; i++){
				var tmpObject = data.response.data.data[keys[i]].Conversion;
				if ((tmpObject.payout == 0 && tmpObject.revenue == 0) || (tmpObject.ip == tmpObject.session_ip)){
					writerFraud[cFr][0] = tmpObject.offer_id;
					writerFraud[cFr][1] = tmpObject.affiliate_id;
					writerFraud[cFr][2] = tmpObject.goal_id;
					writerFraud[cFr][3] = tmpObject.ip;
					writerFraud[cFr][4] = tmpObject.session_ip;
					writerFraud[cFr][5] = tmpObject.payout;
					writerFraud[cFr][6] = tmpObject.revenue;
					console.log(""+tmpObject.offer_id+" "+tmpObject.affiliate_id + ""
						+ tmpObject.goal_id + " " + tmpObject.ip + " " + tmpObject.session_ip + " " + tmpObject.payout + " " + tmpObject.revenue);
					cFr++;
				}
			}
			makeApiCallWriteAll();
		}
	};
	xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Conversion&Method=findAll&fields[]=offer_id&fields[]=affiliate_id&fields[]=goal_id&fields[]=ip&fields[]=session_ip&fields[]=payout&fields[]=revenue&filters[datetime][GREATER_THAN]=2020-02-01+00%3A00%3A00&limit=5000", true);
	xhttp.send(); 
}

function makeApiCallWriteAll() {
	  
	  var params = {
        spreadsheetId: '1rtkPPi9Y_VqNZbohlxPyPg14ChaCADYetgB8by526SY',
        range: 'Auto!A1:G1000',  // TODO: Update placeholder value.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": "Auto!A1:G1000",  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			["Offer_id", "Affiliate_id", "Goal_id", "Conversion_Ip", "Session_ip", "Payout", "Revenue"],
		],          
      };
	  for(var i=0; i<writerFraud.length; i++)
		  valueRangeBody.values.push(writerFraud[i]);
	  
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }
