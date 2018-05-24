<?php

function generateLink($url, $label, $class) {
   $link = '<a href="' . $url . '" class="' . $class . '">';
   $link .= $label;
   $link .= '</a>';
   return $link;
}


function outputPostRow($number)  {
    include("travel-data.inc.php");
    $postId = ${"postID".$number};
    $userId = ${"userId".$number};
    $userName = ${"userName".$number};
    $date = ${"date".$number};
    $thumb = ${"thumb".$number};
    $title = ${"title".$number};
    $excerpt = ${"excerpt".$number};
    $reviewsNum = ${"reviewsNum".$number};
    $reviewsRating = ${"reviewRating".$number};

//    $postId = 1;
//    $userId = 2;
//    $userName = "Leonie Kohler";
//    $date = "2/8/2017";
//    $thumb = "8710320515.jpg";
//    $title = "Ekklisia Agii Isidori Church";
//    $excerpt = "At the end of the hot climb up to the top Lycabettus Hill you are greeted with the oasis that is the Ekklisia Agii Isidori church.";
//    $reviewsNum = 15;
//    $reviewsRating = 3;
//    switch ($number){
//        case 1:
//            $postId = 1;
//            $userId = 2;
//            $userName = "Leonie Kohler";
//            $date = "2/8/2017";
//            $thumb = "8710320515.jpg";
//            $title = "Ekklisia Agii Isidori Church";
//            $excerpt = "At the end of the hot climb up to the top Lycabettus Hill you are greeted with the oasis that is the Ekklisia Agii Isidori church.";
//            $reviewsNum = 15;
//            $reviewsRating = 3;break;
//        case 2:
//            $postId = 3;
//            $userId = 5;
//            $userName = "Frantisek  Wichterlova";
//            $date = "9/9/2017";
//            $thumb = "8710247776.jpg";
//            $title = "Santorini Sunset";
//            $excerpt = "Every evening as the sun sets in Fira, it seems that everyone who is not drinking or eating is rushing with their camera to the most picturesque locations in order to capture that famous Aegean sunset.";
//            $reviewsNum = 38;
//            $reviewsRating = 5;break;
//        case 3:
//            $postId = 9;
//            $userId = 13;
//            $userName = "Edward Francis";
//            $date = "10/19/2017";
//            $thumb = "8710289254.jpg";
//            $title = "Looking towards Fira";
//            $excerpt = "The steamer Mongolia, belonging to the Peninsular and Oriental Company, built of iron, of two thousand eight hundred tons burden, and five hundred horse-power, was due at eleven o'clock a.m. on Wednesday, the 9th of October, at Suez.";
//            $reviewsNum = 3;
//            $reviewsRating = 2;break;
//    }
    $content = '<div class="row"><div class="col-md-4">';
    $content.='<a href="post.php?id="'.$postId.' class=""><img src="images/'.$thumb.'" alt="'.$title.'" class="img-responsive"/></a>';
    $content.='</a></div><div class="col-md-8"><h2>'.$title.'</h2><div class="details">Posted by<a href="user.php?id="'.$userId.' class="">'.$userName.'</a><span class="pull-right">'.$date.'</span>';
    $content.='<p class="ratings">'.constructRating($reviewsRating).$reviewsNum.'Reviews</p></div><p class="excerpt">';
    $content.=$excerpt.'</p><p><a href="post.php?id="'.$postId.' class="btn btn-primary btn-sm">Read more</a></p></div></div><hr/>';
	echo $content;
}

/*
  Function constructs a string containing the <img> tags necessary to display
  star images that reflect a rating out of 5
*/
function constructRating($rating) {
    $imgTags = "";
    
    // first output the gold stars
    for ($i=0; $i < $rating; $i++) {
        $imgTags .= '<img src="images/star-gold.svg" width="16" />';
    }
    
    // then fill remainder with white stars
    for ($i=$rating; $i < 5; $i++) {
        $imgTags .= '<img src="images/star-white.svg" width="16" />';
    }    
    
    return $imgTags;    
}

?>