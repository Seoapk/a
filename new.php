<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles/new.css">
</head>
<body>
<div  class="myDiv">
<h2 style="text-align:center;color:blue;">New</h2>
<form  method="post" action="action.php?action=new">
<input class="inputs" type="text"   placeholder="Name" value="seyf" name="name">    </input>
<input class="inputs" type="number" placeholder="Amount" value="100"  name="amount">  </input>
<input class="inputs" type="text"   placeholder="Date" value="<?php echo date("d-m-y"); ?>" name="date"></input>
<input class="inputs" type="text"   placeholder="Note or Comment" value="No" name="note"> </input>
<input class="submit" type="submit" value="Add">               </input>
</form>
</div>
</body> 