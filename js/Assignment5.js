function MenuChoice()
{
     if (document.getElementById("menu").value == "Customer List")
     {
        document.getElementById("list1").style.visibility = "visible";
        document.getElementById("history2").style.visibility = "hidden";
        document.getElementById("orders3").style.visibility = "hidden";
     }
     else if (document.getElementById("menu").value == "Customer Order History")
     {
        document.getElementById("list1").style.visibility = "hidden";
        document.getElementById("history2").style.visibility = "visible";
        document.getElementById("orders3").style.visibility = "hidden";
     }
     else if (document.getElementById("menu").value == "Orders For Customer")
     {
        document.getElementById("list1").style.visibility = "hidden";
        document.getElementById("history2").style.visibility = "hidden";
        document.getElementById("orders3").style.visibility = "visible";
     }
     else
     {
      document.getElementById("list1").style.visibility = "hidden";
      document.getElementById("history2").style.visibility = "hidden";
      document.getElementById("orders3").style.visibility = "hidden";
     }
}

/////////////////////////
//Customer ID Info

function IDList(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/GetAllCustomers";
      
      objRequest.onreadystatechange = function(){
            if(objRequest.readyState == 4 && objRequest.status == 200){
                  var output = JSON.parse(objRequest.responseText);
                  GenerateList(output);
            }
      }
      objRequest.open("GET", url, true);
      objRequest.send();
}

function GenerateList(result){
      var count = 0;
      var displaytext = "<table><tr><th>Customer ID</th><th>Customer Name</th><th>Customer City</th></tr>";
      
      for(count = 0; count < result.GetAllCustomersResult.length; count++){
            displaytext += "<tr><td>" + result.GetAllCustomersResult[count].CustomerID + "</td><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>"+ result.GetAllCustomersResult[count].City+"</td></tr>";  
      }
      displaytext += "</table>";
      document.getElementById("CustomerList").innerHTML = displaytext;
}



/////////////////////////////////////////////
//History Section

function ShowHistory(){
      var objRequest = new XMLHttpRequest();
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
      url += document.getElementById("history").value;
      
      objRequest.onreadystatechange = function(){
            if(objRequest.readyState == 4 && objRequest.status == 200){
                  var output = JSON.parse(objRequest.responseText);
                  GenerateHistory(output);
            }
      }
      
      objRequest.open("GET", url, true);
      objRequest.send();
      }

function GenerateHistory(result){
      var count = 0;
      var displaytext = "<table><tr><th>Product Name</th><th>Quantity Ordered</th></tr>";
      
      for(count = 0; count < result.length; count++){
            displaytext += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";  
      }
      displaytext += "</table>";
      document.getElementById("custhistory").innerHTML = displaytext;
}

///////////////////////////////////
//Order section

function ShowOrders()
{
      var objRequest = new XMLHttpRequest();
      
      var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
      url += document.getElementById("order").value;
      
      
      objRequest.onreadystatechange = function(){
            if(objRequest.readyState == 4 && objRequest.status == 200){
                  var output = JSON.parse(objRequest.responseText);
                  GenerateOrders(output);
            }
      }
      
      
      objRequest.open("GET", url, true);
      objRequest.send();     
}

function GenerateOrders(result)
{ 
      var count = 0;
      var displaytext = "<table><tr><th>Order Date</th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Shipe Post Code</th><th>Shipped Date</th></tr>";
      
      for(count = 0; count < result.GetOrdersForCustomerResult.length; count++){
            displaytext += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>"
            + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>"
            + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName
            + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>"
            + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
            
      }
      displaytext += "</table>";
      document.getElementById("custorders").innerHTML = displaytext;
}