<?php

function generateLink($url, $label, $class) {
   $link = '<a href="' . $url . '" class="' . $class . '">';
   //<a href="url" class=".class">这是一个链接；
   $link .= $label;
   $link .= '</a>';
   return $link;
}


function outputPostRow($number)  {
    include("travel-data.inc.php");

    echo '<div class="row">';
    echo '<div class="col-md-4">';
    echo generateLink('post.php?id=' . $postId1, '<img src="images/' . $thumb1 . '" alt="' . $title1 . '" class="img-responsive"/>', "");
    echo '</div>';
    echo '<div class="col-md-8">';
    echo '<h2>' . $title1 . '</h2>';
    echo generateLink('user.php?id=' . $userId1, $userName1, "");
    echo '<span class="pull-right">' . $date1 . '</span>';
    echo '<p class="ratings">' . constructRating($reviewsRating1) . ' ' . $reviewsNum1 .' Reviews ' . '</p>';
    echo '</div>';
    echo '<p class="excerpt"> ' . $excerpt1 . ' </p>';
    echo '<p>' . generateLink('post.php?id=' . $postId1, 'Read more', 'btn btn-primary btn-sm') . '</p>';
    echo '</div><hr>';

    echo '<div class="row">';
    echo '<div class="col-md-4">';
    echo generateLink('post.php?id=' . $postId2, '<img src="images/' . $thumb2 . '" alt="' . $title2 . '" class="img-responsive"/>', "");
    echo '</div>';
    echo '<div class="col-md-8">';
    echo '<h2>' . $title2 . '</h2>';
    echo generateLink('user.php?id=' . $userId2, $userName2, "");
    echo '<span class="pull-right">' . $date2 . '</span>';
    echo '<p class="ratings">' . constructRating($reviewsRating2) . ' ' . $reviewsNum2 .' Reviews ' . '</p>';
    echo '</div>';
    echo '<p class="excerpt"> ' . $excerpt2 . ' </p>';
    echo '<p>' . generateLink('post.php?id=' . $postId2, 'Read more', 'btn btn-primary btn-sm') . '</p>';
    echo '</div><hr>';

    echo '<div class="row">';
    echo '<div class="col-md-4">';
    echo generateLink('post.php?id=' . $postId3, '<img src="images/' . $thumb3 . '" alt="' . $title3 . '" class="img-responsive"/>', "");
    echo '</div>';
    echo '<div class="col-md-8">';
    echo '<h2>' . $title3 . '</h2>';
    echo generateLink('user.php?id=' . $userId3, $userName3, "");
    echo '<span class="pull-right">' . $date3 . '</span>';
    echo '<p class="ratings">' . constructRating($reviewsRating3) . ' ' . $reviewsNum3 .' Reviews ' . '</p>';
    echo '</div>';
    echo '<p class="excerpt"> ' . $excerpt3 . ' </p>';
    echo '<p>' . generateLink('post.php?id=' . $postId3, 'Read more', 'btn btn-primary btn-sm') . '</p>';
    echo '</div><hr>';
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