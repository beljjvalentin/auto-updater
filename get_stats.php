<?php 
	header("Access-Control-Allow-Origin: *");

	$opts = array('http' =>
	array(
		'method'  => 'GET',
		//"Authorization: Basic ".base64_encode("handshake:a99775a4797808b96bb0ada23632d525d87613c3")."\r\n",
		"Authorization: Basic ".base64_encode("token:b2852bae7be0149fa622724f7218ee3a0c2477cc")."\r\n",
		'content' => $body,
		'timeout' => 1000,
		'http' => array('ignore_errors' => true)
	  )
	);
                        
	$context  = stream_context_create($opts);
	//echo $opts;
	$url = 'http://token:b2852bae7be0149fa622724f7218ee3a0c2477cc@rest-api.pay.nl/v4/Statistics/management/json?startDate='.$_GET["start_date"].'&endDate='.$_GET["end_date"].'&groupBy=real_website_id';
	$result = file_get_contents($url, false, $context);
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