<?php 
/*
$username= "vdenscfzdhznxf";
$password ="cc6bad208940188079d2533af5e46e724ba9ad0b06502f314c8b26a538a80a68";
$databasename="dbpdnfp0icj490";
$hostname= "ec2-52-202-22-140.compute-1.amazonaws.com";
$port="5432";

$connection = pg_connect("host=$hostname port=$port dbname=$databasename user=$username password=$password") 
or die("could not connect");

if($connection->connect_error){
        die("Connection failed: ".$connection->connect_error);
}
//table names
//Pet- petID
//Users- userID
//petUserRel- petID, userID
*/
function petDBInsert($petid){
    $username= "vdenscfzdhznxf";
    $password ="cc6bad208940188079d2533af5e46e724ba9ad0b06502f314c8b26a538a80a68";
    $databasename="dbpdnfp0icj490";
    $hostname= "ec2-52-202-22-140.compute-1.amazonaws.com";
    $port="5432";

    $connect= pg_connect("host=$hostname port=$port dbname=$databasename user=$username password=$password") 
    or die("could not connect");

      $sqlquery= "INSERT INTO public.'Pet'('petID') VALUES ($petid)";
      if(pg_query($connect, $sqlquery)){
        echo "new record created successfully";
     }
      else{
        echo "Errror".pg_result_error($connect);
      }

    pg_close($connect);
}


function userDBInsert($userid){
    $username= "vdenscfzdhznxf";
    $password ="cc6bad208940188079d2533af5e46e724ba9ad0b06502f314c8b26a538a80a68";
    $databasename="dbpdnfp0icj490";
    $hostname= "ec2-52-202-22-140.compute-1.amazonaws.com";
    $port="5432";

    $connection = pg_connect("host=$hostname port=$port dbname=$databasename user=$username password=$password") 
    or die("could not connect");



    $sqlquery= "INSERT INTO public.'Users'('userID') VALUES ($userid)";
    if(pg_query($connection, $sqlquery)){
        echo "new record created successfully";
    }
    else{
        echo "Errror".pg_result_error($connection);
    }

pg_close($connection);
}


function petUserRelInsert($userid, $petid){
    $username= "vdenscfzdhznxf";
    $password ="cc6bad208940188079d2533af5e46e724ba9ad0b06502f314c8b26a538a80a68";
    $databasename="dbpdnfp0icj490";
    $hostname= "ec2-52-202-22-140.compute-1.amazonaws.com";
    $port="5432";

    $connection = pg_connect("host=$hostname port=$port dbname=$databasename user=$username password=$password") 
    or die("could not connect");

    $sqlquery= "INSERT INTO public.'petUserRel'('userID', 'petID') VALUES ($userid, $petid)";
    if(pg_query($connection, $sqlquery)){
        echo "new record created successfully";
    }
    else{
        echo "Errror".pg_result_error($connection);
    }

     pg_close($connection);
}

function getRowsInSavedPets(){
    $username= "vdenscfzdhznxf";
    $password ="cc6bad208940188079d2533af5e46e724ba9ad0b06502f314c8b26a538a80a68";
    $databasename="dbpdnfp0icj490";
    $hostname= "ec2-52-202-22-140.compute-1.amazonaws.com";
    $port="5432";

    $connection = pg_connect("host=$hostname port=$port dbname=$databasename user=$username password=$password") 
    or die("could not connect");

    //$query= "SELECT petID FROM public.'petUserRel' WHERE userID= $userid ";
    //query to only get pets for that specific user!
    $query= "SELECT * FROM public.'Pet'";
    $result=pg_query($connection,$query)
            or die("Query error: " .pg_last_error());
           
     $numrows = pg_num_rows($result);//how many cards we need to autogenerate!

     return $numrows;
 
}

function petDBQuery(){//once i get the userID working.. pass in $userid
    $username= "vdenscfzdhznxf";
    $password ="cc6bad208940188079d2533af5e46e724ba9ad0b06502f314c8b26a538a80a68";
    $databasename="dbpdnfp0icj490";
    $hostname= "ec2-52-202-22-140.compute-1.amazonaws.com";
    $port="5432";

    $connection = pg_connect("host=$hostname port=$port dbname=$databasename user=$username password=$password") 
    or die("could not connect");

    //$query= "SELECT petID FROM public.'petUserRel' WHERE userID= $userid ";
    //query to only get pets for that specific user!
    $query= "SELECT * FROM public.'Pet'";
    $result=pg_query($connection,$query)
            or die("Query error: " .pg_last_error());
           
     $numrows = pg_num_rows($result);//how many cards we need to autogenerate!
     $numfields= pg_num_fields($result);// this is 1!

     while($row = pg_fetch_row($result))
     {
             $i=0;
     
             while($i < $numfields)
             {
                     $current_value=$row[$i]; 
                     //the current value is the PETID!
                     //this value is what should be linked. 
                     //Also i should have an API call to get me the picture.. ASkK TAYLOR IF I CAN STEAK
                     //HER CODE FOR IT 
                    echo "".$current_value;
                     $i=$i+1;
     
             }
             pg_free_result($result);
     
     };
    
     pg_close($connection);
}
//$query= "SELECT * FROM spy.agent;";

/*
$query= "SELECT $select FROM $from WHERE $where;";


$result= pg_query($connection, $query)
        or die("Query error: " .pg_last_error());

        $numrows = pg_num_rows($result);
        echo"number of rows: ".$numrows;
        
        $numfields= pg_num_fields($result);
        echo"number of fields: ".$numfields;
        
        while($i < $numfields)
        {
                $fieldName= pg_field_name($result, $i); 
                echo"".$fieldName;
                echo "<br>";
                $i = $i+1;
        };
        
while($row = pg_fetch_row($result))
{
        $i=0;

      echo "Row info : ";
        while($i < $numfields)
        {
                $current_value=$row[$i]; 
               echo "".$current_value;
                echo "<br>";
                $i=$i+1;

        }
        pg_free_result($result);

    };
    */
?>