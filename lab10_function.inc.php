<?php
function findByContinentAndCountry($country,$continent){
    if($country == "0" && $continent == "0"){
        $sql = "SELECT * FROM ImageDetails";
    }elseif ($country == "0"){
        $sql = findByContinent($continent);
    }elseif ($continent == "0"){
        $sql = findByCountry($country);
    }else{
        $sql = "SELECT * FROM ImageDetails WHERE ContinentCode = '$continent' AND CountryCodeISO = '$country'";
    }
    return $sql;
}

function findByContinent($continent){
    if($continent == "0"){
        $sql = "SELECT * FROM ImageDetails";
    }else{
        $sql = "SELECT * FROM ImageDetails WHERE ContinentCode = '$continent'";

    }
    return $sql;
}
function findByCountry($country){
    if($country == "0"){
        $sql = "SELECT * FROM ImageDetails";
    }else{
        $sql = "SELECT * FROM ImageDetails WHERE CountryCodeISO = '$country'";
    }
    return $sql;
}
?>