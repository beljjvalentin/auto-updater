<?php 
	header("Access-Control-Allow-Origin: *");

	$url = 'https://lolaleadsmarketing.com/affiliates/api/Reports/CampaignSummary?start_date='.$_GET['year'].'-'.$_GET['month'].'-01&end_date='.$_GET['year'].'-'.$_GET['month'].'-'.$_GET['days'].'&conversion_type=all&start_at_row=1&row_limit=30&api_key=m5nEJi5coPsr9aztUl3Jg&affiliate_id=718';
	$result =  file_get_contents($url);
	echo $result;
	
//----------------------------------------------------------//	
	
	/*echo "Curl request<br>";
	$api_token = "b7c42102aa117cb925d4cb024bf52bb5dd8cfca2";
	# Setup API Url
	$strUrl = "http://handshake:".$api_token."@rest-api.pay.nl/v4/Statistics/management/array_serialize?"; 

	# Add arguments
	$arrArguments = array();
	$arrArguments['startDate'] = '2018-03.-01';
	$arrArguments['endDate'] = '2018-03-31';
	$arrArguments['filterType'] = array();
	$arrArguments['filterOperator'] = array();
	$arrArguments['filterValue'] = array();
	$arrArguments['staffels'] = '';
	$arrArguments['groupBy'] = 'real_website_id';
	$arrArguments['currencyId'] = 1;

	# Prepare complete API URL
	$strUrl = $strUrl . http_build_query($arrArguments);
	$objCurl = curl_init($strUrl);
	curl_setopt($objCurl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($objCurl, CURLOPT_USERAGENT, "Pay.nl Api Example");
	curl_setopt($objCurl, CURLOPT_TIMEOUT, 100);
	$strReturnData = curl_exec($objCurl);
	$arrResult = unserialize($strReturnData);

	$iErrorNumber = curl_errno($objCurl);
	if($iErrorNumber != 0)
	{
	  $strErrorMessage = curl_error($objCurl);
	  echo $strErrorMessage; # handle connection error
	}
	elseif($arrResult === false)
	{
	  echo "Handle data error"; # handle data error
	}
	else
	{
	  echo " Handle successful call<br>"; # handle successful call
	  echo $strReturnData;
	}

	curl_close($objCurl);
		
	# Cleanup API data
	unset($strUrl, $iErrorNumber, $strErrorMessage, $arrArguments);*/

?> 