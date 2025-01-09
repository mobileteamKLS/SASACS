var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var errmsg = "";
$(function () {
  localStorage.removeItem('fromMenus')
  setTimeout(function () {
      window.location.href = 'loginScreen2.html'
  }, 1200000);

  // $("#tblAirWayBillInfo").hide();
  // $("#tblAirWayBillInfo1").hide();
});
    function logOut() {
    modal.style.display = "block";
  }
  
  function exitModal() {
    modal.style.display = "none";
  }
  function back() {
    localStorage.setItem('fromMenus','2')
    // modal.style.display = "block";
    window.location.href = "IMP_Dashboard.html";
  }
  function searchAWBNumber() {
    AirlinePrefix = $("#txtFlightPrefix").val();
    AwbNumber = $("#txtFlightNo").val();
    if ($("#txtFlightPrefix").val() == '' || $("#txtFlightNo").val() == '' || AirlinePrefix.length != 3 || AwbNumber.length != 8 ) {
        // $("#txtFlightPrefix").css("border", "solid thin red");
        // $("#txtFlightNo").css("border", "solid thin #ccc");
        $("#tblAirWayBillInfo").hide();
        $("#tblAirWayBillInfo1").hide();
        errmsg = "No MAWB Number</br>";
        errmsgcont = "Please enter a valid MAWB number</br>";
        $.alert(errmsg,errmsgcont);
        return;
    } 
  //   else if ($("#ddlHAWBNo").val() == -1 ) {
  //     // $("#txtFlightPrefix").css("border", "solid thin red");
  //     // $("#txtFlightNo").css("border", "solid thin #ccc");
  //     $("#tblAirWayBillInfo").hide();
  //     $("#tblAirWayBillInfo1").hide();
  //     errmsg = "Alert</br>";
  //     errmsgcont = "Please select HAWB number</br>";
  //     $.alert(errmsg,errmsgcont);
  //     return;
  // }
  else {
        AirlinePrefix = $("#txtFlightPrefix").val();
        AwbNumber = $("#txtFlightNo").val();
        HawbNumber = $("#ddlHAWBNo").val();
        if( HawbNumber =="-1"){
          HawbNumber="";
        }
        // $('body').mLoading({
        //     text: "Please Wait..",
        // });
        ImportTrackandTrace('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
    }
}

function getHawblist(){
  AirlinePrefix = $("#txtFlightPrefix").val();
  AwbNumber = $("#txtFlightNo").val();
  HawbNumber = '';
  ImportHawbList('2', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);

}
function MovetoNext(current, nextFieldID) {
  if (current.value.length >= current.maxLength) {
      document.getElementById(nextFieldID).focus();
  }
}

ImportHawbList = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Imp_TrackandTrace",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
         
          if (obj.length > 0) {
            var HawbNo ='<option value="-1">Select</option>';
       
            for (var i = 0; i < obj.length; i++) {
                $("#ddlHAWBNo").show();
                // $("#lblVTno").show();
                HawbNo += '<option>' + obj[i].HAWBNumber + '</option>';
            }
            $("#ddlHAWBNo").html(HawbNo);

              $("body").mLoading('hide');
              // $.alert('Details saved successfully');
          } else {
              $("body").mLoading('hide');
              $("#tblAirWayBillInfo").hide();
              $("#tblAirWayBillInfo1").hide();
             
          }

      },
      error: function (xhr, textStatus, errorThrown) {
          $("body").mLoading('hide');
          alert('Server not responding...');
      }
  });
}

ImportTrackandTrace = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Imp_TrackandTrace",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
          if (obj.length > 0) {
              $("#tblAirWayBillInfo").fadeIn('slow');
              $("#tblAirWayBillInfo1").show();
              FillControl(response);
             // fillDriverImage(response);
              $("body").mLoading('hide');
              // $.alert('Details saved successfully');
          } else {
              $("body").mLoading('hide');
              $("#tblAirWayBillInfo").hide();
              $("#tblAirWayBillInfo1").hide();
              errmsg = "Wrong MAWB number</br>";
              errmsgcont = "Please enter a valid MAWB number</br>";
              $.alert(errmsg,errmsgcont);
              return;
          }

      },
      error: function (xhr, textStatus, errorThrown) {
          $("body").mLoading('hide');
          alert('Server not responding...');
      }
  });
}

function FillControl(response) {
  var obj = JSON.parse(response.d);
  console.log("FillControl obj",obj)
if(obj[0].FlightARRDate == null)
  $("#spnFlArr").text("Pending");
else
  $("#spnFlArr").text(obj[0].FlightARRDate);

  if(obj[0].RCFDate == null)
  $("#spnRCF").text("Pending");
else
$("#spnRCF").text(obj[0].RCFDate);

  if(obj[0].DI == null)
  $("#spnDI").text("Pending");
else
$("#spnDI").text(obj[0].DIDATE);

if(obj[0].ADVICEOFARRIVALDATE == null)
$("#spnArr").text("Pending");
else
$("#spnArr").text(obj[0].ADVICEOFARRIVALDATE);

if(obj[0].TSPDATE == null)
$("#spnDO").text("Pending");
else
$("#spnDO").text(obj[0].TSPDATE);

if(obj[0].BOESDATE == null)
$("#spnBoE").text("Pending");
else
$("#spnBoE").text(obj[0].BOESDATE);

if(obj[0].VTDATE == null)
$("#spnVT").text("Pending");
else
$("#spnVT").text(obj[0].VTDATE);

if(obj[0].GATEINDATE == null)
$("#spnGateIn").text("Pending");
else
$("#spnGateIn").text(obj[0].GATEINDATE);

if(obj[0].DOCINDATE == null)
$("#spnDockIn").text("Pending");
else
$("#spnDockIn").text(obj[0].DOCINDATE);

if(obj[0].DOCOUTDATE == null)
$("#spnDockOut").text("Pending");
else
$("#spnDockOut").text(obj[0].DOCOUTDATE);

if(obj[0].GATEOUTDATE == null)
$("#spnGateOut").text("Pending");
else
$("#spnGateOut").text(obj[0].GATEOUTDATE);


  $("#spnGD").text("Pending");
 
}
function clearInputs(){
  $("#txtFlightPrefix").val(''); 
  $("#txtFlightNo").val('');
  var HawbNo ='<option value="-1">Select</option>';
  $("#ddlHAWBNo").html(HawbNo);
  $("#tblAirWayBillInfo").hide();
  $("#tblAirWayBillInfo1").hide();
  $("#txtFlightPrefix").focus(); 

}
