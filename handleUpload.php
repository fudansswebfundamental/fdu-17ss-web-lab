<?php
/**
 * Created by PhpStorm.
 * User: huangjiani
 * Date: 2018/6/11
 * Time: 07:27
 */

if ($_FILES["file_upload"]["error"] > 0)
{
    echo "Error: " . $_FILES["file_upload"]["error"] . "<br />";
}
else
{
    echo "Upload: " . $_FILES["file_upload"]["name"] . "<br />";
    echo "Type: " . $_FILES["file_upload"]["type"] . "<br />";
    echo "Size: " . ($_FILES["file_upload"]["size"] / 1024) . " Kb<br />";
    echo "Stored in: " . $_FILES["file_upload"]["tmp_name"];
}

$fileName = $_FILES["file_upload"]["name"];
$fileName = "./" . substr($fileName, 0, strlen($fileName) - 3) . "lrc";
$fileToMove = $_FILES['file_upload']['tmp_name'];
$destination = "./" . $_FILES["file_upload"]["name"];
if(file_exists($destination)){
    echo $fileToMove;
}
 elseif (move_uploaded_file($fileToMove, $destination)) {
    echo "The file was uploaded and moved successfully!";
    echo "Stored in:".$destination;
} else {
    echo "there was a problem moving the file";
}
$lyricData = $_POST['edit_lyric'];
file_put_contents($fileName, $lyricData);