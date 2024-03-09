

$(document).ready(function () {
  // Function to calculate and update total quantity
  function updateTotalQuantity() {
      // Fetch data from local storage
      let localData = localStorage.getItem('localData');
      if (localData) {
          let localArray = JSON.parse(localData);

          // Calculate total quantity
          let totalQuantity = 0;
          localArray.forEach(element => {
              totalQuantity += parseFloat(element.name); // Assuming 'name' holds the quantity
          });

          // Update the placeholder with the total quantity
          $("#totalQuantity").text("Total Quantity: " + totalQuantity);
      }
  }

  // Call the function to update total quantity when the document is ready
  updateTotalQuantity();
});


$(document).ready(function () {
  // Function to calculate and update latest Sr No
  function updateLatestSrNo() {
      // Fetch data from local storage
      let localData = localStorage.getItem('localData');
      if (localData) {
          let localArray = JSON.parse(localData);

          // Find the latest Sr No
          let latestSrNo = 0;
          localArray.forEach(element => {
              latestSrNo = Math.max(latestSrNo, parseInt(element.id));
          });

          // Update the placeholder with the latest Sr No
          $("#latestSrNo").text("No of items: " + latestSrNo);
      }
  }

  // Call the function to update latest Sr No when the document is ready
  updateLatestSrNo();
});


$(document).ready(function () {
    // Function to calculate and update latest Sr No
    function updateTotalAmount() {
        // Fetch data from local storage
        let CustomerData = localStorage.getItem('CustomerData');
        if (CustomerData) {
            let localArray = JSON.parse(CustomerData);
  
            // Find the latest Sr No
            let TotalSell = 0;
            localArray.forEach(element => {
                TotalSell += Math.max(TotalSell, parseInt(element.item * element.cost));
            });
  
            // Update the placeholder with the latest Sr No
            $("#TotalSell").text("Total Sales: " + TotalSell);
        }
    }
  
    // Call the function to update latest Sr No when the document is ready
    updateTotalAmount();
  });