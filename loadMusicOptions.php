<?php
/**
 * Created by PhpStorm.
 * User: huangjiani
 * Date: 2018/6/8
 * Time: 23:16
 */


$handle = opendir("./");
//echo $handle;
while(false!==($file=readdir($handle))){
    list($filesname,$kzm)=explode(".",$file);
    if($kzm=="mp3"){
        echo "<option value=\"$filesname\">$filesname</option>";
//        echo $filesname."ewewqewq";
    }
}




