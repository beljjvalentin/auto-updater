<?php

require 'C:/OpenServer/modules/php/PHP_7.2/vendor/autoload.php';

if (php_sapi_name() != 'cli') {
    throw new Exception('This application must be run on the command line.');
}

/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient()
{
    $client = new Google_Client();
    $client->setApplicationName('Google Sheets API PHP Quickstart');
    $client->setScopes(Google_Service_Sheets::SPREADSHEETS);
	
	//$client->setAuthConfig('credentials.json');
    $client->setAuthConfig('C:/OpenServer/domains/auto-updater/credentials.json');
    //var_dump($client);
	$client->setAccessType('offline');
    $client->setPrompt('select_account consent');

    // Load previously authorized token from a file, if it exists.
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    $tokenPath = 'token.json';
    if (file_exists($tokenPath)) {
        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);
    }

    // If there is no previous token or it's expired.
    if ($client->isAccessTokenExpired()) {
        // Refresh the token if possible, else fetch a new one.
        if ($client->getRefreshToken()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        } else {
            // Request authorization from the user.
            $authUrl = $client->createAuthUrl();
            printf("Open the following link in your browser:\n%s\n", $authUrl);
            print 'Enter verification code: ';
            $authCode = trim(fgets(STDIN));

            // Exchange authorization code for an access token.
            $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
            $client->setAccessToken($accessToken);

            // Check to see if there was an error.
            if (array_key_exists('error', $accessToken)) {
                throw new Exception(join(', ', $accessToken));
            }
        }
        // Save the token to a file.
        if (!file_exists(dirname($tokenPath))) {
            mkdir(dirname($tokenPath), 0700, true);
        }
        file_put_contents($tokenPath, json_encode($client->getAccessToken()));
    }
    return $client;
}

/*public function updateValues($spreadsheetId, $range, $valueInputOption,
      $_values)
    {
        $service = $this->service;
        // [START sheets_update_values]
        $values = [
            [
                // Cell values ...
            ],
            // Additional rows ...
        ];
        // [START_EXCLUDE silent]
        $values = $_values;
        // [END_EXCLUDE]
        $body = new Google_Service_Sheets_ValueRange([
            'values' => $values
        ]);
        $params = [
            'valueInputOption' => $valueInputOption
        ];
        $result = $service->spreadsheets_values->update($spreadsheetId, $range,
        $body, $params);
        printf("%d cells updated.", $result->getUpdatedCells());
        // [END sheets_update_values]
        return $result;
    }*/

// Get the API client and construct the service object.
$client = getClient();
$service = new Google_Service_Sheets($client);

// Prints the names and majors of students in a sample spreadsheet:
// https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
//$spreadsheetId = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
$spreadsheetId = '1dzDH1IgqUTNHjrOyMsKAk3cGeu5pmx0balLtVtESPoU';
$range = 'Today Traffic!A1:F';
$response = $service->spreadsheets_values->get($spreadsheetId, $range);
$values = $response->getValues();

if (empty($values)) {
    print "No data found.\n";
} else {
    print "Name, Major:\n";
    foreach ($values as $row) {
        // Print columns A and E, which correspond to indices 0 and 4.
        printf("%s, %s\n", $row[0], $row[4]);
    }
}

//  Initiate curl
$ch = curl_init();
$date = date('Y-m-d');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Category.name&fields[]=Offer.name&fields[]=Affiliate.company&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&filters[Stat.date][conditional]=EQUAL_TO&filters[Stat.date][values]=".$date."&filters[Category.id][conditional]=EQUAL_TO&filters[Category.id][values]=1&sort[Stat.conversions]=desc");
$result=curl_exec($ch);
curl_close($ch);

// Will dump a beauty json :3
$dataArray = (array) json_decode($result, true);
$writeArray = [];

array_push($writeArray, ['Traffic for Today', $date, '', '']);
array_push($writeArray, ['offer', 'affiliate', 'clicks', 'leads', 'sales']);

$total = 0;
foreach($dataArray["response"]["data"]["data"] as $key => $value){
	
	if($dataArray["response"]["data"]["data"][$key]["Stat"]["conversions"] !=0 ){
		$total++;
		$offerName = $dataArray["response"]["data"]["data"][$key]["Offer"]["name"];
		$affiliateCompany = $dataArray["response"]["data"]["data"][$key]["Affiliate"]["company"];
		$statClicks = $dataArray["response"]["data"]["data"][$key]["Stat"]["clicks"];
		$statLeads = (int)((int)$dataArray["response"]["data"]["data"][$key]["Stat"]["conversions"] - (int)($dataArray["response"]["data"]["data"][$key]["Stat"]["revenue"] / 10));
		$statSales = (int)($dataArray["response"]["data"]["data"][$key]["Stat"]["revenue"] / 10);
		$categoryName = $dataArray["response"]["data"]["data"][$key]["Category"]["name"];
		array_push($writeArray, [$offerName, $affiliateCompany, $statClicks, $statLeads, $statSales, $categoryName]);
	}
}
array_push($writeArray, ['','','','','']);
array_push($writeArray, ['','','','TOTAL leads','=SUM(D2:D'.(string)((int)$total+2).')']);

// Clear values to Schedule js
// TODO: Assign values to desired properties of `requestBody`:
$requestBody = new Google_Service_Sheets_ClearValuesRequest();

$response = $service->spreadsheets_values->clear($spreadsheetId, $range, $requestBody);

// TODO: Change code below to process the `response` object:
//echo '<pre>', var_export($response, true), '</pre>', "\n";

// Write values to Schedule js
$values = $writeArray;
/*$values = [
    [
        'Traffic for Today', $date, '', ''
    ],
	[
        'd', 'e', '', ''
    ],
    // Additional rows ...
];*/
$body = new Google_Service_Sheets_ValueRange([
    'values' => $values
]);
$params = [
    'valueInputOption' => 'USER_ENTERED'
];
$result = $service->spreadsheets_values->update($spreadsheetId, $range,
$body, $params);
printf("%d cells updated.\n", $result->getUpdatedCells());

// -------------------------------------------------------

// -------------------------------------------------------

$spreadsheetId = '1dzDH1IgqUTNHjrOyMsKAk3cGeu5pmx0balLtVtESPoU';
$range = 'Month Traffic!A1:H';

$ch = curl_init();
$first_date = date('Y-m-01');
$last_date = date('Y-m-t');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, "https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Offer.name&fields[]=Affiliate.company&fields[]=Stat.payout&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&filters[Category.id][conditional]=EQUAL_TO&filters[Category.id][values]=1&filters[Stat.payout][conditional]=NOT_EQUAL_TO&filters[Stat.payout][values]=0&sort[Offer.name]=asc&sort[Stat.conversions]=desc&limit=5000&data_start=".$first_date."&data_end=".$last_date);
$result=curl_exec($ch);
curl_close($ch);

// Will dump a beauty json :3
$dataArray = (array) json_decode($result, true);
$writeArray = [];

$total = 0;
foreach($dataArray["response"]["data"]["data"] as $key => $value){
	if($dataArray["response"]["data"]["data"][$key]["Stat"]["conversions"] !=0 ){
		$total++;
		$offerName = $dataArray["response"]["data"]["data"][$key]["Offer"]["name"];
		$offerGeo = "GEO";
		if (strpos($offerName, " NL")) {					
			$offerGeo = "NL";
		} else if(strpos($offerName, " BE")) {					
			$offerGeo = "BE";
		} else if(strpos($offerName, " AU")) {				
			$offerGeo = "AU";
		} else if(strpos($offerName, " CA")) {				
			$offerGeo = "CA";
		} else if(strpos($offerName, " UK")) {				
			$offerGeo = "UK";
		} else if(strpos($offerName, " US")) {				
			$offerGeo = "US";
		} else if(strpos($offerName, " SE")) {				
			$offerGeo = "SE";
		} else if(strpos($offerName, " FR")) {				
			$offerGeo = "FR";
		} else if(strpos($offerName, " NZ")) {				
			$offerGeo = "NZ";
		}
				
		$affiliateCompany = $dataArray["response"]["data"]["data"][$key]["Affiliate"]["company"];
		$statPayout = $dataArray["response"]["data"]["data"][$key]["Stat"]["payout"];
		$statClicks = (int) $dataArray["response"]["data"]["data"][$key]["Stat"]["clicks"];
		$statLeads = (int)((int)$dataArray["response"]["data"]["data"][$key]["Stat"]["conversions"] - (int)($dataArray["response"]["data"]["data"][$key]["Stat"]["revenue"] / 10));
		$statSales = (int)($dataArray["response"]["data"]["data"][$key]["Stat"]["revenue"] / 10);
		$categoryName = $dataArray["response"]["data"]["data"][$key]["Category"]["name"];
		$statRatio = $statLeads / $statClicks;
		array_push($writeArray, [$offerGeo, $offerName, $affiliateCompany, $statPayout, $statClicks, $statLeads, $statSales, $statRatio]);
	}
}

function sortByOrder($a, $b) {
    if ($a[0] == $b[0]) {
        return 0;
    }
    return ($a[0] < $b[0]) ? -1 : 1;
}
usort($writeArray, 'sortByOrder');
foreach($writeArray as $key => $value){
	array_shift($writeArray[$key]);
}

array_unshift($writeArray, ['traffic expenses', 'affiliate', 'cost', 'clicks', 'leads', 'sales', 'CR']);
array_push($writeArray, ['','','','', '', '']);
array_push($writeArray, ['','','','', 'TOTAL traffic expenses', '=SUM(C2:C'.(string)((int)$total+2).')']);
array_push($writeArray, ['','','','', 'TOTAL leads', '=SUM(E2:E'.(string)((int)$total+2).')']);

$requestBody = new Google_Service_Sheets_ClearValuesRequest();
$response = $service->spreadsheets_values->clear($spreadsheetId, $range, $requestBody);

// Write values to Schedule js
$values = $writeArray;
$body = new Google_Service_Sheets_ValueRange([
    'values' => $values
]);
$params = [
    'valueInputOption' => 'USER_ENTERED'
];
$result = $service->spreadsheets_values->update($spreadsheetId, $range,
$body, $params);
printf("%d cells updated.\n", $result->getUpdatedCells());

// -------------------------------------------------------

// -------------------------------------------------------

$QAoffers = ["LoveMatch", "35PlusDate", "SuccesfulDating", "40PlusLove", "PerfectMatch", "LuckyDating", "HelloDate"];
$pushQAoffers = ["LoveMatch", "LuckyDating", "PerfectMatch", "40pluslove"];


foreach($QAoffers as $key => $value){
	QApnl($key, $values, $service);
}
/*foreach($pushQAoffers as $key => $value){
	pushQApnl($key, $values);
}*/



function QApnl($order, $offer_name, $service) {
	
	$first_date = date('Y-m-01');
	$last_date = date('Y-m-t');
	
	if( $offer_name == "Medium Amanda" ){ // exclude Push offers which are in different columns
		$url ="https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&filters[Goal.name][conditional]=LIKE&filters[Goal.name][values]=lead&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]=".$first_date."&filters[Stat.date][values][]=".$last_date."&filters[Category.name][conditional]=LIKE&filters[Category.name][values]=Medium+Amanda&limit=1000";
	} else if( $offer_name == "Medium+Amanda+UK" || $offer_name == "Medium+Amanda+FR" || $offer_name == "Medium+Amanda+US" ){
		$url ="https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]=".$first_date."&filters[Stat.date][values][]=".$last_date."&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values][]=%".$offer_name."%&limit=1000";
	} else if( $offer_name == "LoveMatch" || $offer_name == "LuckyDating" || $offer_name == "PerfectMatch" || $offer_name == "40PlusLove"){
		$url ="https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&groups[]=Stat.date&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]=".$offer_name."%new%&data_start=".$first_date."&data_end=".$last_date."";
	} else {
		$url ="https://psflc.api.hasoffers.com/Apiv3/json?NetworkToken=NETvgwPirxWahAF3mj5WHJs2HT5tLv&Target=Report&Method=getStats&fields[]=Stat.date&fields[]=Stat.clicks&fields[]=Stat.conversions&fields[]=Stat.revenue&fields[]=Stat.payout&groups[]=Stat.date&filters[Offer.name][conditional]=LIKE&filters[Offer.name][values]=".$offer_name."%&data_start=".$first_date."&data_end=".$last_date."";
	}

	$ch = curl_init();
	
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL, $url);
	$result=curl_exec($ch);
	curl_close($ch);

	// Will dump a beauty json :3
	$dataArray = (array) json_decode($result, true);
	$writeArray = [];
	
	$c = 0;
	$total = 0;
	$date_count = count($dataArray["response"]["data"]["data"]);
	foreach($dataArray["response"]["data"]["data"] as $key => $value){
		$c = 0;
		if($date_count == $key){
			$writeArray[$key][0] = $dataArray["response"]["data"]["data"][$key]["Stat"]["date"];
			$writeArray[$key][1] = "=SUM(C".($key+2).",E".($key+2).",G".($key+2).",I".($key+2).",K".($key+2).",M".($key+2).",O".($key+2).",Q".($key+2).",S".($key+2).",U".($key+2).",W".($key+2).")";
		}
		while(writeArray[$c][0] != $dataArray["response"]["data"]["data"][$key]["Stat"]["date"]){		
			$c = $c + 1;
		} 
		if($dataArray["response"]["data"]["data"][$key]["Stat"]["payout"] !=0 ){
			$total++;
			if( $offer_name == "Medium Amanda" ){ // exclude US, UK, FR which are in different columns
				$writeArray[$c][($order+1)*2+0] = "=".($dataArray["response"]["data"]["data"][$key]["Stat"]["conversions"] - ($dataArray["response"]["data"]["data"][$key]["Stat"]["revenue"] / 10))."-Z".($key+2)."-AB".($key+2)."-AD".($key+2);
				$writeArray[$c][($order+1)*2+1] = "=".$dataArray["response"]["data"]["data"][$key]["Stat"]["payout"]."-AA".($key+2)."-AC".($key+2)."-AE".($key+2);
			} else if( $offer_name == "Medium Christina" ){
				$writeArray[$c][($order+1)*2+0] = "=".($dataArray["response"]["data"]["data"][$key]["Stat"]["conversions"] - ($dataArray["response"]["data"]["data"][$key]["Stat"]["revenue"] / 10))."-AJ".($key+2);
				$writeArray[$c][($order+1)*2+1] = "=".$dataArray["response"]["data"]["data"][$key]["Stat"]["payout"]."-AK".($key+2);
			} else {
				var_dump($writeArray);
				$writeArray[$c][($order+1)*2+0] = ($dataArray["response"]["data"]["data"][$key]["Stat"]["conversions"] - ($dataArray["response"]["data"]["data"][$key]["Stat"]["revenue"] / 10));
				$writeArray[$c][($order+1)*2+1] = $dataArray["response"]["data"]["data"][$key]["Stat"]["payout"];
			}
						
			/*$offerName = $dataArray["response"]["data"]["data"][$key]["Offer"]["name"];
			$affiliateCompany = $dataArray["response"]["data"]["data"][$key]["Affiliate"]["company"];
			$statClicks = $dataArray["response"]["data"]["data"][$key]["Stat"]["clicks"];
			$statLeads = (int)((int)$dataArray["response"]["data"]["data"][$key]["Stat"]["conversions"] - (int)($dataArray["response"]["data"]["data"][$key]["Stat"]["revenue"] / 10));
			$statSales = (int)($dataArray["response"]["data"]["data"][$key]["Stat"]["revenue"] / 10);
			$categoryName = $dataArray["response"]["data"]["data"][$key]["Category"]["name"];*/
			
			//array_push($writeArray, [$offerName, $affiliateCompany, $statClicks, $statLeads, $statSales, $categoryName]);
		}
	}
	if($order == 6)
		writeQApnl($writeArray, $service);
}

function writeQApnl($writeArray, $service){
	var_dump($writeArray);
	$spreadsheetId = '1dzDH1IgqUTNHjrOyMsKAk3cGeu5pmx0balLtVtESPoU';
	$range = 'QApnl!C3:Z';

	$requestBody = new Google_Service_Sheets_ClearValuesRequest();
	$response = $service->spreadsheets_values->clear($spreadsheetId, $range, $requestBody);
	
	print_r("Write QA pnl\n");
	// Write values to Schedule js
	$values = $writeArray;
	$body = new Google_Service_Sheets_ValueRange([
		'values' => $values
	]);
	$params = [
		'valueInputOption' => 'USER_ENTERED'
	];
	$result = $service->spreadsheets_values->update($spreadsheetId, $range,
	$body, $params);
	printf("%d cells updated.\n", $result->getUpdatedCells());
}

?>