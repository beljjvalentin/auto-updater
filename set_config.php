<?php 

$file_handle = fopen('/var/webmin/config.php', 'w'); 
$data_to_write = "
<?php 
	
return array(
	'year'=> '".$_POST["year"]."',
	'month'=> '".$_POST["month"]."',
	'spreadsheet_id'=> '".$_POST["spreadsheet_id"]."',
);

?> 
";

fwrite($file_handle, $data_to_write);
fclose($file_handle);
header("Location: https://beljjvalentin.github.io/auto-updater/next_month_form.html"); 

?> 