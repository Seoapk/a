<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles/edit.css">
</head>
<body>
<div class="myDiv">
<h2 style="text-align:center;color:green;">Edit</h2>
<form  method="post"   action="action.php?action=edit">
<input class="inputs" type="text"   placeholder="Name"   value="<?php echo strstr($_GET['nm'],$_GET['idnm'],true); ?>" name="edtname">  </input>
<input class="inputs" type="number" placeholder="Amount" value="<?php echo strstr($_GET['am'],$_GET['idam'],true); ?>" name="edtamount"></input>
<input class="inputs" type="text"   placeholder="Date"   value="<?php echo strstr($_GET['dt'],$_GET['iddt'],true); ?>" name="edtdate">  </input>
<input class="inputs" type="text"   placeholder="Note"   value="<?php echo strstr($_GET['nt'],$_GET['idnt'],true); ?>" name="edtnote">  </input>
<input class="submit" type="submit"   value="Save">  </input>

<input type="hidden"   value="<?php echo strstr($_GET['nm'],$_GET['idnm'],true); ?>" name="nm">       </input>
<input type="hidden"   value="<?php echo strstr($_GET['am'],$_GET['idam'],true); ?>" name="am">       </input>
<input type="hidden"   value="<?php echo strstr($_GET['dt'],$_GET['iddt'],true); ?>" name="dt">       </input>
<input type="hidden"   value="<?php echo strstr($_GET['nt'],$_GET['idnt'],true); ?>" name="nt">       </input>
<input type="hidden"   value="<?php echo $_GET['idnm']; ?>"                          name="idnm">     </input>
<input type="hidden"   value="<?php echo $_GET['idam']; ?>"                          name="idam">     </input>
<input type="hidden"   value="<?php echo $_GET['iddt']; ?>"                          name="iddt">     </input>
<input type="hidden"   value="<?php echo $_GET['idnt']; ?>"                          name="idnt">     </input>
</form>
</div>
</body> 