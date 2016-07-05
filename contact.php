<?php
if(isset($_POST['send']))
{

	                $userName=$_POST['name'];
	                if($userName==''){
	                ?>
	                <script>
	                alert("name can't be empty");
	                </script>
	                <?php
	                return false;
	                
	                }
			$subject = "Message from ".$userName; 
			$contact = $_POST['number'];
                        $college = $_POST['college'];
			$message ="Name:- ".$userName." <br/>Email:- ".$_POST['email']."<br/> Organisation :- ".$college."<br/> Contact Number :- ".$contact ;
			$to='info@univibenetwork.in';
			$headers = "From: " . strip_tags($_POST['email']) . "\r\n";
			$headers .= "Reply-To: ". strip_tags($_POST['email']) . "\r\n";
			//$headers .= "CC: susan@example.com\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
			if(!mail($to, $subject, $message, $headers)){
            ?>
			<script>
			alert("Unable to send query.");
            window.location='index.html';
            </script><?php
			exit();
          }else{
          	 ?><script>
			 alert("Thank you for contacting, we will get back to you soon");
             window.location='index.html';
             </script><?php
			
			exit();
           
         }

}
?>