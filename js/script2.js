var emptyRow = "<tr><td colspan='6' class='text-center'> No Records Available</td></tr>";
    $(document).ready(function () {
      loadDataFromLocal();
      $('#tblData').on('click', '.btn-edit', function () {
        debugger;
        const name = $(this).parent().parent().find(".txtName").html();
        const phone = $(this).parent().parent().find(".txtNum").html();
        const item = $(this).parent().parent().find(".txtItem1").html();
        const cost = $(this).parent().parent().find(".AmtCost").html();
        const qty = $(this).parent().parent().find(".additionalInput").html();
        const cost1 = $(this).parent().parent().find(".additionalInput1").html();
        const id = $(this).parent().parent().find(".txtName").attr("data-id");
        $("#txtName").val(name);
        $("#txtNum").val(phone);
        $("#txtItem1").val(item);
        $("#txtCost").val(cost);
        $("#additionalInput").val(qty);
        $("#additionalInput1").val(cost1);
        $("#txtId").val(id);
        $("#btnSave").text("Update");
      });

      $('#tblData').on('click', '.btn-delete', function () {
        debugger;
        const id = $(this).parent().parent().find(".txtName").attr("data-id");
        deleteDataFromLocal(id);
      });

      $("#btnSave").click(function () {
        debugger;
        if ($("#txtId").val() == '') {
          addDataToLocal();
        } else {
          updateDataFromLocal();
        }
      });



      $("#btnClear").click(function () {
        debugger;
        clearForm();
      });
    });

    function clearForm() {
      debugger;
      $("#txtName").val("");
      $("#txtNum").val("");
      $("#txtItem1").val("");
      $("#txtCost").val("");
      $("#additionalInput").val("");
      $("#additionalInput1").val("");
      $("#btnSave").text("Add");
    }

    function addEmptyRow() {
      debugger;
      if ($("#tblData tbody").children().children().length == 0) {
        $("#tblData tbody").append(emptyRow);
      }
    }

    function loadDataFromLocal() {
      debugger;
      let CustomerData = localStorage.getItem('CustomerData');
      if (CustomerData) {
        $("#tblData tbody").html("");
        let localArray = JSON.parse(CustomerData);
        let index = 1;
        let searchQuery = $("#searchInput").val().toLowerCase();
        localArray.forEach(element => {
          let dynamicTR = "<tr>";
          dynamicTR = dynamicTR + "<td> " + index + "</td>";
          dynamicTR = dynamicTR + "<td class='txtName'  data-id=" + element.id + ">" + element.name + "</td>";
          dynamicTR = dynamicTR + "<td class='txtNum'>" + element.phone + "</td>";
          dynamicTR = dynamicTR + "<td class='txtItem'>" + (parseFloat(element.item) + parseFloat(element.qty || 0))  + "</td>";
          dynamicTR = dynamicTR + "<td class='AmtCost'>" + (parseFloat(element.cost) + parseFloat(element.cost1 || 0)) + "</td>";
          dynamicTR += "<td class='Result'>" + ((parseFloat(element.item) + parseFloat(element.qty || 0)) * (parseFloat(element.cost) + parseFloat(element.cost1 || 0))) + "</td>";
          dynamicTR = dynamicTR + "    <td class='tdAction text-center'>";
          dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-success btn-edit'> Edit</button><br>";
          dynamicTR = dynamicTR + "        <button class='btn btn-sm mt-2 btn-danger btn-delete'> Delete</button>";
          dynamicTR = dynamicTR + "    </td>";
          dynamicTR = dynamicTR + "    <td class='tdBill align-center '>";
          dynamicTR = dynamicTR + "        <button id='generateBillBtn'> Generate</button>";
          dynamicTR = dynamicTR + "        <div id='billContainer' ></div>";
          dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-primary mt-2 btn-whatsapp'> WhatsApp</button>";
          dynamicTR = dynamicTR + "    </td>";
          // dynamicTR += "<td><button class='btn btn-sm btn-primary btn-whatsapp'> WhatsApp</button></td>";
          dynamicTR = dynamicTR + " </tr>";
          if (element.name.toLowerCase().includes(searchQuery) || element.phone.includes(searchQuery)) {
          $("#tblData tbody").append(dynamicTR);
          index++;
          }
        });
      }
      addEmptyRow();
    }

    // function addDataToLocal() {
    //   debugger;
    //   let CustomerData = localStorage.getItem('CustomerData');
    //   if (CustomerData) {
    //     let localArray = JSON.parse(CustomerData);
    //     const obj = {
    //       id: localArray.length + 1,
    //       name: $("#txtName").val(),
    //       phone: $("#txtNum").val(),
    //       item: $("#txtItem1").val(),
    //       cost: $("#txtCost").val(),
    //       qty: $("#additionalInput").val(),
    //       cost1: $("#additionalInput1").val()
    //     };
    //     localArray.push(obj);
    //     localStorage.setItem('CustomerData', JSON.stringify(localArray));
    //     loadDataFromLocal();
    //   } else {
    //     const arryObj = [];
    //     const obj = {
    //       id: 1,
    //       name: $("#txtName").val(),
    //       phone: $("#txtNum").val(),
    //       item: $("#txtItem1").val(),
    //       cost: $("#txtCost").val(),
    //       qty: $("#additionalInput").val(),
    //       cost1: $("#additionalInput1").val()
    //     };
    //     arryObj.push(obj);
    //     localStorage.setItem('CustomerData', JSON.stringify(arryObj));
    //     loadDataFromLocal();
    //   }
    //   clearForm();
    // }


    function addDataToLocal() {
      // Retrieve values from input fields
      const name = $("#txtName").val().trim();
      const phone = $("#txtNum").val().trim();
      const item = $("#txtItem1").val().trim();
      const cost = $("#txtCost").val().trim();
    
      // Check if required fields are filled
      if (name === '' || phone === '' || item === '' || cost === '') {
        alert('Please fill in all required fields (Name, Phone, Item, Cost) before adding to the table.');
        return;
      }
    
      // Proceed to add data if all required fields are filled
      let CustomerData = localStorage.getItem('CustomerData');
      if (CustomerData) {
        let localArray = JSON.parse(CustomerData);
        const obj = {
          id: localArray.length + 1,
          name: name,
          phone: phone,
          item: item,
          cost: cost,
          qty: $("#additionalInput").val(),
          cost1: $("#additionalInput1").val()
        };
        localArray.push(obj);
        localStorage.setItem('CustomerData', JSON.stringify(localArray));
        loadDataFromLocal();
      } else {
        const arryObj = [];
        const obj = {
          id: 1,
          name: name,
          phone: phone,
          item: item,
          cost: cost,
          qty: $("#additionalInput").val(),
          cost1: $("#additionalInput1").val()
        };
        arryObj.push(obj);
        localStorage.setItem('CustomerData', JSON.stringify(arryObj));
        loadDataFromLocal();
      }
      clearForm();
    }
    

    function updateDataFromLocal() {
      debugger;
      let CustomerData = localStorage.getItem('CustomerData');
      let localArray = JSON.parse(CustomerData);
      const oldRecord = localArray.find(m => m.id == $("#txtId").val());
      oldRecord.name = $("#txtName").val();
      oldRecord.phone = $("#txtNum").val();
      oldRecord.item = $("#txtItem1").val();
      oldRecord.cost = $("#txtCost").val();
      oldRecord.qty = $("#additionalInput").val();
      oldRecord.cost1 = $("#additionalInput1").val();
      localStorage.setItem('CustomerData', JSON.stringify(localArray));
      loadDataFromLocal();
      clearForm();
    }

    function deleteDataFromLocal(id) {
      debugger;
      let CustomerData = localStorage.getItem('CustomerData');
      let localArray = JSON.parse(CustomerData);
      let i = 0;
      while (i < localArray.length) {
        if (localArray[i].id === Number(id)) {
          localArray.splice(i, 1);
        } else {
          ++i;
        }
      }
      localStorage.setItem('CustomerData', JSON.stringify(localArray));
      loadDataFromLocal();
    }


    function generateBillPdf(rowData) {

      const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString();

      let billHTML = "<h2>Invoice</h2>";
      billHTML += `<p>Date and Time: ${formattedDateTime}</p>`;
      
      billHTML += "<table class='w-100 table table-striped-columns'>";
      billHTML += "<tr><th>Name</th><th>Quantity</th><th>Cost</th><th>Total</th></tr>";
  
      billHTML += "<tr>";
      billHTML += "<td>" + rowData.name + "</td>";
      billHTML += "<td>" + rowData.item + "</td>";
      billHTML += "<td>" + rowData.cost + "</td>";
      billHTML += "<td>" + (rowData.item * rowData.cost) + "</td>";  // Corrected variable name to 'phone'
      billHTML += "</tr>";
  
      billHTML += "</table>";
  
      // Generate PDF using html2pdf
      const element = document.getElementById('billContainer');
      element.innerHTML = billHTML;  // Set the HTML content to the generated bill
      html2pdf(element);
  }
  
  
  
  
  // Bind the function to the button click event
  $(document).ready(function() {
      $('#tblData').on('click', '#generateBillBtn', function () {
          const rowIndex = $(this).closest('tr').index();
          let CustomerData = localStorage.getItem('CustomerData');
          if (CustomerData) {
              let localArray = JSON.parse(CustomerData);
              if (rowIndex >= 0 && rowIndex < localArray.length) {
                  generateBillPdf(localArray[rowIndex]);
              } else {
                  alert('Invalid row index.');
              }
          } else {
              alert('No data available to generate a bill.');
          }
      });
  });
  
  


  $('#tblData').on('click', '.btn-whatsapp', function () {
    const phone = $(this).closest('tr').find(".txtNum").html();
    sendWhatsAppMessage(phone);
});





// Modified sendWhatsAppMessage function to accept a phone number and row data
function sendWhatsAppMessage(phoneNumber, rowData) {
  // Check if a phone number is provided
  if (!phoneNumber) {
      alert('Please enter a customer phone number.');
      return;
  }

  // Create a message using row data
  const message = `Name: ${rowData.name}\nItem: ${rowData.item}\nCost: ${rowData.cost}\nTotal: ${rowData.item * rowData.cost}`;

  // Construct the WhatsApp URL
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  // Create an anchor element
  const link = document.createElement('a');

  // Set the href attribute to the WhatsApp URL
  link.href = whatsappUrl;

  // Set the target attribute to '_blank' to open in a new window or tab
  link.target = '_blank';

  // Simulate a click on the anchor element
  link.click();
}

// Example usage when calling the function
$(document).ready(function () {
  $('#tblData').on('click', '.btn-whatsapp', function () {
      const phone = $(this).closest('tr').find(".txtNum").html();
      const rowIndex = $(this).closest('tr').index();
      let CustomerData = localStorage.getItem('CustomerData');
      if (CustomerData) {
          let localArray = JSON.parse(CustomerData);
          if (rowIndex >= 0 && rowIndex < localArray.length) {
              sendWhatsAppMessage(phone, localArray[rowIndex]);
          } else {
              alert('Invalid row index.');
          }
      } else {
          alert('No data available to send a WhatsApp message.');
      }
  });
});


$(document).ready(function () {
  // Function to toggle the visibility of more hidden inputs when the button is clicked
  $('#showMoreInputs').click(function () {
      $('#moreHiddenInputs, #moreHiddenInputs1').toggle();
  });
});



$(document).ready(function () {
  $("#searchInput").on('input', function () {
      loadDataFromLocal(); // Call the function on input
  });
});