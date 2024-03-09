var emptyRow = "<tr><td colspan='6' class='text-center'> No Records Available</td></tr>";
    $(document).ready(function () {
      loadDataFromLocal();
      $('#tblData').on('click', '.btn-edit', function () {
        debugger;
        const name = $(this).parent().parent().find(".txtName").html();
        const phone = $(this).parent().parent().find(".txtNum").html();
        const item = $(this).parent().parent().find(".txtItem1").html();
        const cost = $(this).parent().parent().find(".AmtCost").html();
        const id = $(this).parent().parent().find(".txtName").attr("data-id");
        $("#txtName").val(name);
        $("#txtNum").val(phone);
        $("#txtItem1").val(item);
        $("#txtCost").val(cost);
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
        localArray.forEach(element => {
          let dynamicTR = "<tr>";
          dynamicTR = dynamicTR + "<td> " + index + "</td>";
          dynamicTR = dynamicTR + "<td class='txtName'  data-id=" + element.id + ">" + element.name + "</td>";
          dynamicTR = dynamicTR + "<td class='txtNum'>" + element.phone + "</td>";
          dynamicTR = dynamicTR + "<td class='txtItem'>" + element.item + "</td>";
          dynamicTR = dynamicTR + "<td class='AmtCost'>" + element.cost + "</td>";
          dynamicTR += "<td class='Result'>" + (element.item * element.cost) + "</td>";
          dynamicTR = dynamicTR + "    <td class='tdAction text-center'>";
          dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-success btn-edit'> Edit</button>";
          dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-danger btn-delete'> Delete</button>";
          dynamicTR = dynamicTR + "    </td>";
          dynamicTR = dynamicTR + "    <td class='tdBill align-center '>";
          dynamicTR = dynamicTR + "        <button id='generateBillBtn'> Generate</button>";
          dynamicTR = dynamicTR + "        <div id='billContainer' ></div>";
          dynamicTR = dynamicTR + "    </td>";
          dynamicTR += "<td><button class='btn btn-sm btn-primary btn-whatsapp'> WhatsApp</button></td>";
          dynamicTR = dynamicTR + " </tr>";
          $("#tblData tbody").append(dynamicTR);
          index++;
        });
      }
      addEmptyRow();
    }

    function addDataToLocal() {
      debugger;
      let CustomerData = localStorage.getItem('CustomerData');
      if (CustomerData) {
        let localArray = JSON.parse(CustomerData);
        const obj = {
          id: localArray.length + 1,
          name: $("#txtName").val(),
          phone: $("#txtNum").val(),
          item: $("#txtItem1").val(),
          cost: $("#txtCost").val()
        };
        localArray.push(obj);
        localStorage.setItem('CustomerData', JSON.stringify(localArray));
        loadDataFromLocal();
      } else {
        const arryObj = [];
        const obj = {
          id: 1,
          name: $("#txtName").val(),
          phone: $("#txtNum").val(),
          item: $("#txtItem1").val(),
          cost: $("#txtCost").val()
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
      billHTML += "<tr><th>Quantity</th><th>Item</th><th>Cost</th><th>Total</th></tr>";
  
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

// Modified sendWhatsAppMessage function to accept a phone number
function sendWhatsAppMessage(phoneNumber) {
    // Check if a phone number is provided
    if (!phoneNumber) {
        alert('Please enter a customer phone number.');
        return;
    }

    // Replace 'Hello%20World' with the message you want to send
    const message = 'Hello%20World';

    // Construct the WhatsApp URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    // Create an anchor element
    const link = document.createElement('a');

    // Set the href attribute to the WhatsApp URL
    link.href = whatsappUrl;

    // Set the target attribute to '_blank' to open in a new window or tab
    link.target = '_blank';

    // Simulate a click on the anchor element
    link.click();
}