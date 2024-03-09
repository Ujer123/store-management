var emptyRow = "<tr><td colspan='6' class='text-center'> No Records Available</td></tr>";
    $(document).ready(function () {
      loadDataFromLocal();
      $('#tblData').on('click', '.btn-edit', function () {
        debugger;
        const name = $(this).parent().parent().find(".txtName").html();
        const item = $(this).parent().parent().find(".txtItem").html();
        const cost = $(this).parent().parent().find(".AmtCost").html();
        const id = $(this).parent().parent().find(".txtName").attr("data-id");
        $("#txtName").val(name);
        $("#txtItem").val(item);
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
      $("#txtItem").val("");
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
      let localData = localStorage.getItem('localData');
      if (localData) {
        $("#tblData tbody").html("");
        let localArray = JSON.parse(localData);
        let index = 1;
        localArray.forEach(element => {
          let dynamicTR = "<tr>";
          dynamicTR = dynamicTR + "<td> " + index + "</td>";
          dynamicTR = dynamicTR + "<td class='txtName'  data-id=" + element.id + ">" + element.name + "</td>";
          dynamicTR = dynamicTR + "<td class='txtItem'>" + element.item + "</td>";
          dynamicTR = dynamicTR + "<td class='AmtCost'>" + element.cost + "</td>";
          dynamicTR += "<td class='Result'>" + (element.name * element.cost) + "</td>";
          dynamicTR = dynamicTR + "    <td class='tdAction text-center'>";
          dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-success btn-edit'> Edit</button>";
          dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-danger btn-delete'> Delete</button>";
          dynamicTR = dynamicTR + "    </td>";
          dynamicTR = dynamicTR + " </tr>";
          $("#tblData tbody").append(dynamicTR);
          index++;
        });
      }
      addEmptyRow();
    }

    function addDataToLocal() {
      debugger;
      let localData = localStorage.getItem('localData');
      if (localData) {
        let localArray = JSON.parse(localData);
        const obj = {
          id: localArray.length + 1,
          name: $("#txtName").val(),
          item: $("#txtItem").val(),
          cost: $("#txtCost").val()
        };
        localArray.push(obj);
        localStorage.setItem('localData', JSON.stringify(localArray));
        loadDataFromLocal();
      } else {
        const arryObj = [];
        const obj = {
          id: 1,
          name: $("#txtName").val(),
          item: $("#txtItem").val(),
          cost: $("#txtCost").val()
        };
        arryObj.push(obj);
        localStorage.setItem('localData', JSON.stringify(arryObj));
        loadDataFromLocal();
      }
      clearForm();
    }

    function updateDataFromLocal() {
      debugger;
      let localData = localStorage.getItem('localData');
      let localArray = JSON.parse(localData);
      const oldRecord = localArray.find(m => m.id == $("#txtId").val());
      oldRecord.name = $("#txtName").val();
      oldRecord.item = $("#txtItem").val();
      oldRecord.cost = $("#txtCost").val();
      localStorage.setItem('localData', JSON.stringify(localArray));
      loadDataFromLocal();
      clearForm();
    }

    function deleteDataFromLocal(id) {
      debugger;
      let localData = localStorage.getItem('localData');
      let localArray = JSON.parse(localData);
      let i = 0;
      while (i < localArray.length) {
        if (localArray[i].id === Number(id)) {
          localArray.splice(i, 1);
        } else {
          ++i;
        }
      }
      localStorage.setItem('localData', JSON.stringify(localArray));
      loadDataFromLocal();
    }


$(document).ready(function() {
  // Function to print the table
  function printTable() {
    var tableContent = $('.table')[0].outerHTML;
    var printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print Table</title></head><body>' + tableContent + '</body></html>');
    printWindow.document.close();
    printWindow.print();
  }

  // Bind the function to the button click event
  $('#printButton').on('click', printTable);
});