<?php 

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$file_handle = fopen('config.php', 'wa+'); 
if (false === $file_handle) {
    throw new RuntimeException('Unable to open log file for writing');
}
$data_to_write = "
<?php

return array(
	'year'=> '".$_POST["year"]."',
	'month'=> '".$_POST["month"]."',
	'spreadsheet_id'=> '".$_POST["spreadsheet_id"]."'
);
 
";

fwrite($file_handle, $data_to_write);
fclose($file_handle);

header("Location: https://beljjvalentin.github.io/auto-updater/next_month_form.html"); 

?> 