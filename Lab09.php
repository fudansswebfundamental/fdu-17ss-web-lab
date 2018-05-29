<?php
include 'travel-data.inc.php';




?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Chapter 12</title>

      <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="css/bootstrap.min.css" />
    
    
    <link rel="stylesheet" href="css/bootstrap-theme.css" />
    <link rel="stylesheet" href="css/captions.css" />

</head>

<body>
    <?php include 'header.inc.php'; ?>
    


    <!-- Page Content -->
    <main class="container">
     
        
        <div class="btn-group countryButtons" role="group" aria-label="...">
              <a role="button" class="btn btn-default" href="list.php">All</a>
           
              <?php   
              /* you will need to fill this place with appropriate PHP */
              /* hint: use array and loop */
              //the next line is an example
              // 善良的助教
              //echo '<a href="list.php?country=Canada" role="button" class="btn btn-default"> Canada</a>';
              sort($countries);//按照要求将序列变成升序
              foreach($countries as $country) {
                  $str = '<a href="list.php?country=' . $country . '" role="button" class="btn btn-default">' . $country . '</a>';
                  echo $str;
              }
              ?>
                     
        </div>

		<ul class="caption-style-2">



            <?php
          /* you will need to fill this place with appropriate PHP */ 
          /* hint: use array and loop */
          //the next lines are one of the elements
          //you need to fill the elements with data provided
            //  $images[22] = array(
            //                              "id"=>22,
            //                               "title" => "View of Cologne",
            // "description" => "View of Cologne from atop the Cologne Cathedral", "
            //country" => "Germany",
            // "city" => "Cologne",
            // "user" => "Joao Fernandes",
            //                            "path" => "6114850721.jpg",
            // "taken" => "August 8, 2017",
            // "tags" => array("cathedral","high","birds-eye"));
            foreach($images as $image) {
                echo '<li>';
                echo '<a href="detail.php?id=';
                echo '$image["id"]';
                echo ' class="img-responsive">';
                $str2 = "images/square/" . $image["path"];
                echo "<img src=$str2" . '  alt="' . $image["title"] . '">';
                echo '<div class="caption"><div class="blur"></div><div class="caption-text">';
                echo '<h1>' . $image["title"] . '</h1></div></div></a></li>';
            }
          ?>

       </ul>       

      
    </main>
    
    <footer>
        <div class="container-fluid">
                    <div class="row final">
                <p>Copyright &copy; 2017 Creative Commons ShareAlike</p>
                <p><a href="#">Home</a> / <a href="#">About</a> / <a href="#">Contact</a> / <a href="#">Browse</a></p>
            </div>            
        </div>
    </footer>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
</body>

</html>