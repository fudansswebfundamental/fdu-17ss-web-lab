<?php error_reporting(0); ?>
<?php
$name=$_GET["name"];
$text = file_get_contents("upload/lrc/".$name.".lrc");
echo $text;

?>