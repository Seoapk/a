    let userIdCounter = parseInt(localStorage.getItem('userIdCounter')) || 1;
    let selectedUserId = null;
    let selectedTransactionIndex = null;
   
    function openPopup() {
      document.querySelector(".overlay").style.display = "block";
      document.getElementById("newClient").style.display = "block";
          }
    function openPopupAdd() {
      document.querySelector(".overlay").style.display = "block";
      document.getElementById("items").style.display = "block";
    }
    function openPopupEdit() {
      document.querySelector(".overlay").style.display = "block";
      document.getElementById("editItems").style.display = "block";
    }

    function closePopup() {
      document.querySelector(".overlay").style.display = "none";
      document.getElementById("newClient").style.display = "none";
      document.getElementById("items").style.display = "none";
      document.getElementById("editItems").style.display = "none";
    }
    
    function showHome() {
      closePopup();
      document.getElementById("infoClient").style.display = "none";
      document.getElementById("ClientsBook").style.display = "block";
    }
    
    function openinfoClient() {
      document.querySelector(".infoClientBox").style.display = "block";
      document.querySelector(".clientbookbox").style.display = "none";
    }

    //1-SEARCH BY: ID, name, or amount
    function filterTable() {
    const input = document.querySelector('.searchinput'); // Get the input element for filtering
    const filter = input.value.toUpperCase(); // Convert input to uppercase for case-insensitive matching
    const table = document.getElementById('userDataTable');
    const rows = table.getElementsByTagName('tr');
    // Loop through all table rows and hide those that do not match the filter
    for (let i = 2; i < rows.length ; i++) { // Start from index 1 to skip the header row and end before the footer row
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let shouldDisplay = false;
        // Check if any cell in the row matches the filter
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            const textValue = cell.textContent || cell.innerText; // Get the text content of the cell

            // If the text content contains the filter, set shouldDisplay to true and break the loop
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                shouldDisplay = true;
                break;
            }
        }

        // Toggle row display based on shouldDisplay value
        row.style.display = shouldDisplay ? '' : 'none';
    }
}

//3 -SORT Event listener for input change to trigger filtering
document.querySelector('.searchinput').addEventListener('input', filterTable);

var sortOrder = 'asc'; // Initialize sort order

function sortTable(columnIndex) {
    var table, tbody, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("userDataTable");
    tbody = table.getElementsByTagName("tbody")[0];
    switching = true;

    while (switching) {
        switching = false;
        rows = tbody.rows;

        for (i = 0; i < rows.length - 1; i++) {
            shouldSwitch = false;

            // Check if the current column index is for the "Amount" or "ID" columns
            if (columnIndex === 0 || columnIndex === 2) {
                x = parseFloat(rows[i].getElementsByTagName("td")[columnIndex].innerText);
                y = parseFloat(rows[i + 1].getElementsByTagName("td")[columnIndex].innerText);
            } else {
            // For other columns, use regular string comparison
                x = rows[i].getElementsByTagName("td")[columnIndex].innerText.toLowerCase();
                y = rows[i + 1].getElementsByTagName("td")[columnIndex].innerText.toLowerCase();
            }

            if (sortOrder === 'asc') {
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (x < y) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

    // Toggle sort order
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
}
    function saveData() {
      const name = document.getElementById('nameInput').value;
      const phone = document.getElementById('phoneInput').value;
      const userData = { id: userIdCounter++, name, phone, transactions: [] };
      if (name.trim() !== "") {
      let savedData = JSON.parse(localStorage.getItem('userData')) || [];
      savedData.push(userData);
      localStorage.setItem('userData', JSON.stringify(savedData));
      localStorage.setItem('userIdCounter', userIdCounter);
      document.getElementById('nameInput').value = '';
      document.getElementById('phoneInput').value = '';
      updateUserDataTable();
      closePopup();
      
      
      }else {
      alert("Please enter a name.");
      }
    }




//========================


function updateUserDataTable() {
    let savedData = JSON.parse(localStorage.getItem('userData')) || [];
    const userDataBody = document.getElementById('userDataBody');
    userDataBody.innerHTML = '';
    
    let totalAllTransactions = 0; // Initialize total transactions amount for all users

    savedData.forEach(user => {
        // Calculate total transaction amount for the user
        let totalAmount = user.transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
        user.amount = totalAmount.toFixed(2)+' $'; // Update user's total amount
        
        // Update total transactions amount for the user
        let totalTransactions = user.transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
        user.TOTtransactions = totalTransactions.toFixed(2)+' $'; // Store total transactions amount in user data

        totalAllTransactions += parseFloat(user.TOTtransactions); // Add user's total transactions amount to totalAllTransactions

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td class="truncate">${user.name}</td>
            <td class="truncate" style="text-align:right;">${user.amount}</td>
        `;
        row.addEventListener('dblclick', () => {
            selectedUserId = user.id;
            openinfoClient();
            displayUserInfo(user);
        });
        userDataBody.appendChild(row);
    });

    // Update total transactions amount for display
    document.getElementById('ClientTot').textContent = totalAllTransactions.toFixed(2)+' $'; // Display total transactions amount for all users
}


//=================================


function displayUserInfo(user) {
    const userInfo = document.getElementById('userInfo');
    userInfo.innerHTML = `
        <h2>Client Id: ${user.id}</h2>
        <input type="text" id="editName" value="${user.name}">
        <input type="text" id="editPhone" value="${user.phone}">
    `;
    
    const itemsBody = document.getElementById('itemsBody');
    itemsBody.innerHTML = '';
    
    // Calculate total transactions amount for the user
    let totalTransactions = user.transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

    user.TOTtransactions = totalTransactions.toFixed(2)+' $'; // Store total transactions amount in user data

    user.transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="truncate" style="background-color: white;">(${transaction.date}) : ${transaction.note}</td>
            <td class="truncate" style="background-color: white;text-align:right;">${transaction.amount} $</td>
        `;
        row.addEventListener('dblclick', () => {
            editTransaction(index, transaction);
            openPopupEdit();
        });
        itemsBody.appendChild(row);
    });

    // Update total transactions amount for display
    document.getElementById('transtot').textContent = user.TOTtransactions; // Display total transactions amount
	
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      document.getElementById('transactionDate').value = formattedDate; 

}

//*************************************

    function editTransaction(index, transaction) {
      // Populate the transaction data in the input fields for editing
      document.getElementById('editTransactionDate').value = transaction.date;
      document.getElementById('editTransactionAmount').value = transaction.amount;
      document.getElementById('editTransactionNote').value = transaction.note;

      // Store the index of the transaction being edited
   
      selectedTransactionIndex = index;
      // Show the edit transaction box
      document.getElementById('editItems').style.display = 'block';                                                                           
    }

    function saveUserInfo() {
      const editName = document.getElementById('editName').value;
      const editPhone = document.getElementById('editPhone').value;
      let savedData = JSON.parse(localStorage.getItem('userData')) || [];
      const userIndex = savedData.findIndex(user => user.id === selectedUserId);
            if (editName.trim() !== "") {
      savedData[userIndex].name = editName;
      savedData[userIndex].phone = editPhone;
      localStorage.setItem('userData', JSON.stringify(savedData));
      updateUserDataTable();
      alert('Info Client update Done');
     } else { alert('Please input a name. ');} 
    }

    function addTransaction() {
      const transactionDate = document.getElementById('transactionDate').value;
      const transactionAmount = document.getElementById('transactionAmount').value;
      const transactionNote = document.getElementById('transactionNote').value;
      let savedData = JSON.parse(localStorage.getItem('userData')) || [];
      const userIndex = savedData.findIndex(user => user.id === selectedUserId);
      if (transactionAmount.trim() !== "") {
      if (userIndex !== -1) {
        savedData[userIndex].transactions.push({ date: transactionDate, amount: transactionAmount, note: transactionNote });
        localStorage.setItem('userData', JSON.stringify(savedData));
        updateUserDataTable();
        displayUserInfo(savedData[userIndex]);
        resetTransactionInputs(); 
        closePopup();
        
      }
      }else {
      alert("Please enter an amount.");
      }        
      }
    

     function resetTransactionInputs() {
      document.getElementById('transactionAmount').value = '';
      document.getElementById('transactionNote').value = '';
      }
      
    function saveEditedTransaction() {
      const editedTransactionDate = document.getElementById('editTransactionDate').value;
      const editedTransactionAmount = document.getElementById('editTransactionAmount').value;
      const editedTransactionNote = document.getElementById('editTransactionNote').value;

      let savedData = JSON.parse(localStorage.getItem('userData')) || [];
      const userIndex = savedData.findIndex(user => user.id === selectedUserId);
      if (editedTransactionAmount.trim() !== "") {
      if (userIndex !== -1 && selectedTransactionIndex !== null) {
        savedData[userIndex].transactions[selectedTransactionIndex] = {
          date: editedTransactionDate,
          amount: editedTransactionAmount,
          note: editedTransactionNote
        };

        localStorage.setItem('userData', JSON.stringify(savedData));

        updateUserDataTable();
        displayUserInfo(savedData[userIndex]);
        closePopup();
        
      }
      }else {
      alert("Please enter an amount.");
      }
    }
                                                                                                    
    function deleteUser() {
        var result = confirm("Do you want to delete?");
        if (result) {
        // code for Yes option here
        let savedData = JSON.parse(localStorage.getItem('userData')) || [];
        const userIndex = savedData.findIndex(user => user.id === selectedUserId);
        if (userIndex !== -1) {
        savedData.splice(userIndex, 1);
        localStorage.setItem('userData', JSON.stringify(savedData));
        updateUserDataTable();
        // Clear user information panel                                                          
        document.getElementById('userInfo').innerHTML = '';
        showHome();
        
        
        }
       }
     }
	 
	 function clearLocalStorage() {
    if (confirm("Are you sure you want to delete all data from Local Storage? This action cannot be undone.")) {
        localStorage.clear();
        alert("Local Storage has been cleared successfully.");
    }
	window.location.reload(); // Refresh the window
}
function exportData(filename) {
     const customFilename = prompt("Enter the filename for the exported JSON file:") || 'localStorageData.json';
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = customFilename;
    a.click();
    URL.revokeObjectURL(url);
}
function importData(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);
        for (let key in data) {
            localStorage.setItem(key, data[key]);
        }
        alert('Data imported successfully.');
    };
    reader.readAsText(file);
	window.location.reload(); // Refresh the window
}

        updateUserDataTable();
