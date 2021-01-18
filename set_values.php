<?php 

$file_handle = fopen('/httpdocs/upload/ckUpload/values.js', 'w'); 
$data_to_write = '// Global date variables
var year = '.$_GET['year'].';
var month = '.$_GET['month'].';
// File urls
var Schedule_url = "'.$_GET['schedule'].'";
var Quality_url = "'.$_GET['quality'].'";';

fwrite($file_handle, $data_to_write);
fclose($file_handle);
header("Location: https://beljjvalentin.github.io/auto-updater/auto_update.html"); 

?> 