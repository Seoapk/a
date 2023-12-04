<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles/view.css">
</head>
<body>
<div class="fixedheader">
<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names...">
<br><input class="addbutton" type="button" value="New +" onclick="window.location='new.php';"></input>
</div>
<div class="myDiv"> 


<table id="myTable">

<tr style="background-color:#80CBC4;" >
<th></th>
<th style="color:white;">Total:</th>
<th></th>
<th colspan="2" style="text-align:center;color:white;" id="val"></th>
</tr>

<tr class="header">
<th colspan="2" style="width:25%">Name</th>
<th style="width:25%">Amount</th>
<th style="width:25%">Date</th>
<th style="width:25%">Note</th>
</tr>


<?php
$dtb='data.php';
include($dtb);
?>

</table>
<script>
function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

updateSubTotal(); // Initial call

function updateSubTotal() {
  var table = document.getElementById("myTable");
  let subTotal = Array.from(table.rows).slice(2).reduce((total, row) => {
    return total + parseFloat(row.cells[2].innerHTML);
  }, 0);
  document.getElementById("val").innerHTML = subTotal.toFixed(0)+" $";
}

function onClickRemove(deleteButton) {
  let row = deleteButton.parentElement.parentElement;
  row.parentNode.removeChild(row);
  updateSubTotal(); // Call after delete
}

</script>
</div>
</body>
