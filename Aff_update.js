	// Main function chain update 
    /*function updateSignInStatus(isSignedIn) {
      if (isSignedIn) {
	
		 // 3 places
		
		for(var a = 0; a<=0; a++){
			Aff_clearAll(items[a][1], m);
			setTimeout(HasoffersCall(items[a][0], items[a][1], m, items[a][2], a), 1000);
		}
      }
    }*/

	var counter = 0;
	
	var items = [ // [0] - Aff name [1] - spreadsheet_id [2] - publisher's field
			['Abacus', 			'1L7HwI89RbVH2C5aWMeYbXf_5dy6iksGYO36fEWBpAac', 3], 
			['Across', 			'1IOHqa9BVUS6VGx5rdQ560UkZnJZg124J7WQ4lvzVGwM', 3],
			['Across', 			'1IOHqa9BVUS6VGx5rdQ560UkZnJZg124J7WQ4lvzVGwM', 3],
			['AdCombo', 		'1KpEnwptBRRPUC22w8Cbs3BM_9e0aNXT_stn0VnIL46Y', 3],
			['Addiliate',       '1enRbOJrfn4LeJgjRn1dWNDKLAOVs2BdB6_eHBJ8CPt8', 2],
			['Adgo', 			'1mgXhAEeLfOxz4ltTNQ49LJRaBUVGgeV2Ro-ExQBEWeI', 3],
			['Adperform',		'1gATVuCLKc3J73yGiZPFPNaSLDf_AzZgVZbNEOdaTQBU', 1],
			['Adsalsa',			'11dQSrvREdfnWG_9P6zoiE2HhXSChGqrqwv9w0Ex6494', 3],
			['Adwall', 	    	'1CDXf5xsiquXnoQE3EBcMbHEVMkCS6lMa3HkQAswGuac', 3],
			['Adminds', 		'1Q1-dsw2GspOEU3E5rWTmpZReUB8SLfQw4ENq1TROjT0', 1],
			['Adtrackste',      '1l__g1c_2rpMpsZxPR8_3RW8Maav0MjFKf9mmkP5S0ts', 3],
			['Adventura', 		'10rJ9azj7HCl9JsgrX0BRmy6GhHWPHJwK2PGoEEDyoj8', 2],
			['adviceaffiliation','1g-lynYKS3yF5zFREdDSJaNmmawQCqi3P9yuH3XIkYLU', 3],
			['AdviceGlobal',	'1rj6wDeL-WcKIkeZSiNzRhAvbIPzogz3ZuQIBYE3LIig', 3],
			['advice+youpromo',	'1GaAU8nLCXNnxjeQ-GqyhVS_krbwmE49NeuUxygl0-Ik', 3],
			['Advidi', 			'1aTAg692Lgy4orvQNGiIDhQ5KjxQiE8LEPOwGw-r7liA', 3],
			['Affmedia', 		'1Km60Uyk8e9QRINTrrh4kJczXmIK7m2A-AApxqKk8IhQ', 4],
			['Aragon', 			'1a-1Mq0q8Ija0ARQoGfc6LjdC-ofG2jAaqn5KnrtGRi0', 3],
			['Adwall', 			'1CDXf5xsiquXnoQE3EBcMbHEVMkCS6lMa3HkQAswGuac', 3],
			['Affilihub', 		'1EojuaAYU9nBhZGDrte87vhuAw95sjlOCQPifC_Z2boE', 3],
			['bigdata',			'1xYa9VJEXUl0qtnWiCxd39nwDIlTS-cZ5Um88tcarS88', 3], 
			['Bluemedia', 		'163UWhUQAFBJ1n_gQBuxJNwvcwblFJ2Nux1AO52_Cr-0', 2],
			['Blue+Market+Agency+CPL',  '1rBlHpKMpAaEmk0cNhVm7_mmIxMUife3r31PZGA9X_eM', 2],
			['CenturyMedia360',	'1a1vV9q-HjktZzmbgdXXJXFyySxlispgvwNBehA4q2Ms', 3],
			['Clench', 			'1PrYpYYOTzbAk8RXmjxvMafXz6sMO14m5lL97iJjllYI', 3],
			['Clickdealer', 	'1hPgKH9znVVDebnRyebMpyEGVRVZcGpukrhAaw5MpSOM',	2],
			['clicklabsgroup',	'1DZ0gDz0kJNPlw-Se-IrMq4pKKDTSvLHHadnAKCY3IiA', 2],
			['CLICSYNC', 		'1zFRXe0_0v77wx1u6wWK_889cf-FMoMjhcjxxre37zNk', 3],
			['CPAMatica', 		'1jH4TrlBoxGO9P9AcObdu8aQYaAxxL2t96swcgfnrQnk', 2],
			['DGmax', 			'1GpE_Q5K2sqPhyTZVVUQ-Sqybfzdsn7OzO0vwUCO4SYY', 2],
			['drmail',			'1c5i8_LZST-K0Bcbf8ffWA2S8_aVVB90jIV1F9uLi91c', 3],
			['Diablo', 			'1h3ml5PleOWH3ZJSXhou-CYlaBPfEAXSuhRrJJmny3xY', 2],
			['eGentic',			'1bPynNbw_En9RmHVh56ohjrYv4re6G88wVj-TJxtk8iQ', 3],
			['Elixis',			'1O3F3Q6IedNIRJDwGo34qxaqGk2JRcmaDuN8pJkrFzWw', 3],
			['EMMG', 			'13RFtf-EiwlZci_iZXJkEdh5y-QUcmrhyrliMtqeMqHg', 3],
			['evania',			'1q5Pf14DFD8o5vld0tnvj1-X7CxZjIrYfANSHWJbd0XA', 3],
			['Evo+Leads', 		'1v8T7OPF1DSLGcFackFSiveYVsgSZWQgHjrZj81tM-KI', 3],
			['fgmedia', 		'1YyYl3gmMekPTpn-wElqGn01CQsIhHQOJ0aDyaR7Uo5Q', 3],
			['Fruzzel', 		'1ztLdeJbwfxnPEnkHYXukNuoGVayvhr3bsrjSMUYbnrg', 1],
			['Gotzha', 			'1YC7HupxbOSraLBIWzGkFIzWMgWsE0Ur37AhihosCRCg', 3],
			['iMailo', 			'1PYlv2Zf2XGAwXzupFpZusze9-lDLl99Rz5iA1okfdVI', 3],
			['iMonetizei', 		'1DPQQRRl9S458J5GRkIJCFT0ezgCY7UgFHCQWUCM9M4w', 3],
			['Maverick', 		'1i5ktanXtXNCYi38BR739ne2i2I3k2Oa8q52YZkRjBfI', 2],
			['Monetise',		'1_Nx_SSWQhyDtFjeQmxtjj935-vC7YMxYbADo9Jk21bI', 3], 
			['marketingpunch', 	'1wFxzFDW1hdOcP458KHQs0UTTfaDa6U0zzfDtnDJpSFU', 3],
			['Inboxed',			'1R2WNtCk-5J1Bod7mQ8PiqA7QhErxGNYANJUcc5n4e3Q', 3],
			['Jacopo',			'1Eg-r5PWPEZXQOS0xrkMD2yZxX43H2VzatZanjUulk-k', 3],
			['Javandi', 		'1k5NFkQTamlXTDuS-23VmtWszwlpB3G38LJ9IPtJD5Co', 3],
			['Kimia',			'1xMrRROFVb2SHQ-SwOb9aJMUKVzEmpk_flclo5D4oP44', 3],
			['LeadLeaders',		'1XvyFuoaDjn1CgiRtEUZ1_QbKGGJr4tNpV9hiJ-_SWSg', 2],
			['Leadiance',		'1KZNGN5qF2Hcqj4fVLnkmPs31iUNj3-d79Z3N-Ynbna8', 3],
			['Lead+Mining',		'1rFQh78r4QbmCcgiTce8HgCiPdB70MU2A-ieEEQuOzlI', 2],
			['Lolaleads',       '1t3nE4ubj2rDR2dzjKkasqlUyUCFtqUEQEYffJBRiUSY', 3], 
			['Marcam', 			'156LlopTMy9fkA7yfwemiLGDRc_S3iGQvNmxn0lB57z4', 2],
			['Natexo', 			'1-SXtH2BUH1bUx25IzY-yyBlGob49gxja-dzvqUnlZ2M', 2],
			['Online+Activity', '1-ZW6u43pzOI4gBNgejwSBLOhZWVZGTbGSlMOruNJx-A', 3],
			['PCH',				'1hRH5ePVnjkLyBeiMcrJegcVJiRs1C0wfkItXgXc37nw', 1],
			['popular',			'1QHsnbY0dhKejWh00culuFHEVdUCB_1A5N56O_Iuf1cw', 3],
			['PropellerAds',	'1IcHZVAGm8SGiB_ds42bRZVl2agZQKqgpAzUsjFJJb7M', 2],
			['Reflexcash',      '14GccE_bUI0aQu0nRetEMPlDSE4rdpEkxLMx_3r5p3pY', 3],
			['Response+concept','1CE9YXtTFSQlQWmFJltjxJpGkz2TDVQfBu4eEgeDmR5s', 3],
			['rsafinance', 		'1bonFLeDfnH30FEEcvD0j9tInS_cVr71k_ShdULcZF9Y', 3],
			['SAM media', 		'1gaRWGt9ClBeulvHHtPltUcVbrnFhT88b-A2GoYgCm9o', 1],
			['Smart+ADV', 		'14Nqnw0UAj3dBJSp1dtkcxC1l1XereggafQdwnGJIERQ', 1],
			['Smart+Global+Media',	'1lJUNfnydtECKtCw8BLU4f3Aj_a27p5vb8BouIjk6W2I', 1],
			['Sonar', 			'18AIZFVbkSrLTLUcGlSV1E4rpc9kyIS-wdH9fPsCklVg', 2],
			['Sling Ads', 		'1KTgyUCI33DHqMxJv3PtnCChyzTFDYQA1E88VmoPhOcw', 2],
			['Spicyoffers', 	'17RtCgZckj5FgGKpBqACVkxk8JIpyiiQOTjA7dpA13fs', 1],
			['TAZ', 			'1SBUR2b7K8ID0pp3ew5C7g95X3V6NeEr2z7D46Fz2gys', 3],
			['transparent',		'1tCCWwpOYRnsmarUQc4eweTlzZ6vQF54ulBNsAjDg8aE', 2],
			['theaffiliate',	'1ecUeIO33HnEpviLAP5SdGrahkg21v_Pbirdp8lNLaYg', 2],
			['TheValueFactory',	'1m_6S_AUlaMBqiNShk03ReJrygnAA49Sc0gX6Kjr35hg', 3],
			['Tycho', 			'1ANM-IPSc07biPw8MNQY9_ru5LVhxtNTq6rGCEWEcusM', 1],
			['Vertigo+Media', 	'1iBupR9jjHdzHpiTsqb_4bcIelkUrsYGJLZpWfvJ4MzA', 1],
			['webbdone',        '16ObLApj5vC_w9Xzbjkg5lbMDk7rOYDhZVQijA48A3cM', 3],
			['WOW', 			'1Uj4JLMcDeYqBwB67jiENjgXLlBPHHNKxDl7w1jgOxVc', 3],
			['Wikimailers', 	'1A-7iRgkj_4pICekU4Ov6KI7rcMCUB6HXLOULunmQlAU', 3],
			['Yep+Ads', 		'1c3rY01PwUD_fCARKz-xEzmUdsxKz0fMB4wU3S4DqX5Y', 2],
			['ZinQ', 			'10Ae6ix5W_qrK0qnDrzuLKcQ6XTAr6Fqqefnq869ZfKE', 3] 
		];
	
	var Aff_writer = createArray(150, 6);
	function createArray(length) {
		var arr = new Array(length || 0),
        i = length;

		if (arguments.length > 1) {
			var args = Array.prototype.slice.call(arguments, 1);
			while(i--) arr[length-1 - i] = createArray.apply(this, args);
		}
		return arr;
	}
	
	function Aff_clearAll(spreadsheetId, month) {
      var params = {
        // The ID of the spreadsheet to update.
        spreadsheetId: spreadsheetId,  // TODO: Update placeholder value.

        // The A1 notation of the values to clear.
        range: monthName(month)+'!A1:E300',  // TODO: Update placeholder value.
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
	
	function addAllSheets(m){
		for(var a = 0; a<= items.length; a++){
			try{
				makeSheetCall(items[a][1], m);
			} catch (err) {
				console.log('Exists');
			}
		}
	}
	
	function makeSheetCall(spreadsheetId, month) {
      var params = {
        spreadsheetId: spreadsheetId,  // TODO: Update placeholder value.
      };

      var batchUpdateSpreadsheetRequestBody = {
        // A list of updates to apply to the spreadsheet.
        // Requests will be applied in the order they are specified.
        // If any request is not valid, no requests will be applied.
        "requests": [
			{
			  "addSheet": {
				"properties": {
				  "title": monthName(month),
				  "gridProperties": {
					"rowCount": 100,
					"columnCount": 20
				  }/*,
				  "tabColor": {
					"red": 1.0,
					"green": 1.0,
					"blue": 1.0
				  }*/ // No tab color
				}
			  }
			}
		 ]

        // TODO: Add desired properties to the request body.
      };

		var request = gapi.client.sheets.spreadsheets.batchUpdate(params, batchUpdateSpreadsheetRequestBody);
		request.then(function(response) {
			// TODO: Change code below to process the `response` object:
			console.log(response.result);
		}, function(reason) {
			console.error('error: ' + reason.result.error.message);
		});
    }
	
	function Aff_makeApiCallWriteAll(spreadsheetId, month) {
	  var params = {
        // The ID of the spreadsheet to update.
		spreadsheetId: spreadsheetId,

        // The A1 notation of the values to update.
        range: monthName(month)+'!A1:E300',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
      };

      var valueRangeBody = {
		"range": monthName(month)+'!A1:E300',  //Set this to cell want to add 'x' to.
		"majorDimension": "ROWS",
		"values": [
			[monthName(month)+' stats',,,],
			['offer','cost','clicks','leads','']
		],          

		
		// TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      };

	  for(var i=0; i<150; i++) // affiliate stats
		  valueRangeBody.values.push(Aff_writer[i]);
	  
	  
      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        
		console.log(response.result);
		counter = counter + 1;
		if(counter<items.length){ // till max affiliate index
			for(var t=0; t<150; t++)
				Aff_writer[t] = [,,,];
			console.log((items[counter+1])+" Write!");
			HasoffersCall(items[counter+1][0], items[counter+1][1], month, items[counter+1][2])
		} else {}
			
	  }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }

function HasoffersCall(AffiliateName, spreadsheetId, month, sub_id, order){ 
	// Data HTTP request
	Aff_clearAll(spreadsheetId, month);
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			try {
			var data = JSON.parse(this.responseText);
			console.log(data); 
			i=0; 
			if(AffiliateName == "Clench"){
				/*while(i<data.response.data.data.length){
					Aff_writer[i][0] = data.response.data.data[i].Offer.name;
					Aff_writer[i][2] = data.response.data.data[i].Stat.clicks;
					Aff_writer[i][1] = Aff_writer[i][2] * 0.25;
					i++;
				}*/
			} else
				while(i<data.response.data.data.length){
					if(data.response.data.data[i].Stat.conversions > 0){
						Aff_writer[i][0] = data.response.data.data[i].Offer.name;
						Aff_writer[i][1] = data.response.data.data[i].Stat.payout;
						Aff_writer[i][2] = data.response.data.data[i].Stat.clicks;
						Aff_writer[i][3] = (data.response.data.data[i].Stat.conversions - (data.response.data.data[i].Stat.revenue / 10));
						if(Aff_writer[i][1] == '') Aff_writer[i][1] = '(blank)';
						console.log("I"+i+":"+Aff_writer[i]);
					}
				i++;
			}
			Aff_writer[i] = [,"=SUM(B3:B"+(i+2)+")","=SUM(C3:C"+(i+2)+")","=SUM(D3:D"+(i+2)+")"];
			i++;
			Aff_makeApiCallWriteAll(spreadsheetId, month);
			} catch(e) {
				alert(e); // error in the above string
			}
		}
	};
	console.log("https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Offer.name&fields[]=Affiliate.company&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&groups[]=Offer.name&filters[Affiliate.company][conditional]=LIKE&filters[Affiliate.company][values]="+AffiliateName+"%&filters[Stat.conversions][conditional]=NOT_EQUAL_TO&filters[Stat.conversions][values]=0&sort[Offer.name]=asc&sort[Stat.conversions]=desc&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days+"&limit=1000");
	if(month != 13)
		xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Offer.name&fields[]=Affiliate.company&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&groups[]=Offer.name&filters[Affiliate.company][conditional]=LIKE&filters[Affiliate.company][values]="+AffiliateName+"%&filters[Stat.conversions][conditional]=NOT_EQUAL_TO&filters[Stat.conversions][values]=0&sort[Offer.name]=asc&sort[Stat.conversions]=desc&data_start="+year+"-"+month+"-01&data_end="+year+"-"+month+"-"+days+"&limit=1000", true);
	else 
		xhttp.open("GET", "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Offer.name&fields[]=Affiliate.company&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&groups[]=Offer.name&filters[Affiliate.company][conditional]=LIKE&filters[Affiliate.company][values]="+AffiliateName+"%&filters[Stat.conversions][conditional]=NOT_EQUAL_TO&filters[Stat.conversions][values]=0&sort[Offer.name]=asc&sort[Stat.conversions]=desc&data_start="+year+"-01-01&data_end="+year+"-"+month+"-"+days+"&limit=1000", true);
		
		console.log("Opening: " + AffiliateName + " Data " + month);
	// 31 or 30 days
	xhttp.send(); 
}

function monthName(num){
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Total"];
	return months[num-1];	
} 
