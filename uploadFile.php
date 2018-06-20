<?php error_reporting(0);

$name = $_FILES["file_upload"]["name"];
$lrc = $_POST["edit_lyric"];
if (!file_exists("upload")){
    mkdir ("upload",0777,true);
}
if (!file_exists("upload/lrc")){
    mkdir ("upload/lrc",0777,true);
}
if (!file_exists("upload/mp3")){
    mkdir ("upload/mp3",0777,true);
}
$file = fopen( "upload/lrc/".basename($name,"mp3")."lrc","w");
fwrite($file,$lrc);
fclose($file);
if (!file_exists("upload/mp3/" . $_FILES["file_upload"]["name"])) {
    move_uploaded_file($_FILES["file_upload"]["tmp_name"], "upload/mp3/" . $_FILES["file_upload"]["name"]);
}
header('Location: lab11.php');
?>