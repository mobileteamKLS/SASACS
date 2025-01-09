var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var MAWBNo = localStorage.getItem('mawbNo');
var AirlinePrefix = localStorage.getItem('Prefix');
var AwbNumber = localStorage.getItem('AWBNumber');
var IGMNo = localStorage.getItem('igmNo');
var IGMYear = localStorage.getItem('igmYear');
var HawbNumber = localStorage.getItem('hawbNo');
var isHouse = localStorage.getItem('isHouse');
var MawbID = localStorage.getItem('MawbRowId');
var HawbID = localStorage.getItem('HawbRowId');
localStorage.setItem('FinalVTList',  "");

var documentStorePath;
var pdfFileName;
var pdfFileSize;
var ft;
var ExamPiecesVal;
var CTOName;

var fileParm;
var fileUploadParm;
  var base64textString;
  var documentuploadobj = { };
  var CompanyIncoDocUploadModel;
  var docsStatus;
  var StatusOfdocs;
  var nfileLocation;
  var ActualFileData;
  var rejectedOperationType;
  var VehTokenNos;
  var TspStatus;
  var boestatus;
  var oocstatus;
  var asistatus;
  var VTStatus;
  var BOEID;
  var OOCID;
  $(function () {
// debugger
  
//       if(fromMenus == '1'){
//         $('#imp_tab').removeClass('active')
//         $('#exp_tab').addClass('active')
//       }
getCHAListForAssigningAgent();
getDODataForAssigningAgent();


$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
  localStorage.setItem('activeTab', $(e.target).attr('href'));
});
var activeTab = localStorage.getItem('activeTab');
if(activeTab){
  $('#myTab a[href="' + activeTab + '"]').tab('show');
}
    
$("#txtBOEDate").datepicker({
  showOn: 'button',
  buttonImageOnly: true,
  buttonImage: 'img/Calendar_28x32.png',
  dateFormat: "dd M yy"
 });

 $("#spnOoCDate").datepicker({
  showOn: 'button',
  buttonImageOnly: true,
  buttonImage: 'img/Calendar_28x32.png',
  dateFormat: "dd M yy"
 });

 if( HawbNumber == "" || HawbNumber == null){
  $("#lblHouseMaster").hide();
  $("#lblHouse").hide();
   $("#txtHawbNo").hide();
   $("#lblHawb").hide();
   $("#dateAwb").text("MAWB Date");
   $("#accordionMawb").show();
 }else{
  $("#lblHouseMaster").show();
  $("#lblHouse").show();
 $("#dateAwb").text("HAWB Date");
 $("#accordionHawb").show();
 }

 $("#DODt").datepicker({
  showOn: 'button',
  buttonImageOnly: true,
  buttonImage: 'img/Calendar_28x32.png'
});



});




function back() {
    window.location.href = "IMP_ShipmentDetailsFromMenu.html";
  }

  function cancel(){
    window.location.href = "IMP_ShipmentDetailsFromMenu.html";
  }
  // $('#log-out').on('click', function(e){
  //   e.preventDefault();
  //   $('#myModal').modal('show').find('.modal-content').load($(this).attr('href'));
  // });
  // modal.style.display = "block";

  function logOut() {
    modal.style.display = "block";
  }
function exitModal() {
  modal.style.display = "none";
}

function selectCTO() {
  window.location.href = "IMP_SelectCTO.html";
}



$('#removeFile').click(function () {
   $("#fileList").val("");
   $("#viewFile").text("");
}); 

$('#removeFileOoC').click(function () {
  $("#fileListOoC").val("");
  $("#viewFileOoC").val("");
}); 


ImportListingPageDetails = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, IGMNo, IGMYear, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Imp_ListingPage_details",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, IGMNo: IGMNo, IGMYear: IGMYear, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
         console.log(response.d);
         console.log(obj);
          if (obj.length > 0) {
            if (obj[0].ERRORMSG == undefined) {
              $("#tblAirWayBillInfo").fadeIn('slow');
              $("#tblAirWayBillInfo1").show();
              console.log(response)

              localStorage.setItem('MawbRowId', obj[0].MAWBROWID);
              localStorage.setItem('HawbRowId', obj[0].HAWBROWID);
              localStorage.setItem('IgmRowId', obj[0].IGMROWID);

              $("#txtIGMNo").text(obj[0].IGMNo); 
              $("#txtIGMYear").text(obj[0].IGMYear); 
              $("#txtHawbNo").text(obj[0].HAWBNumber); 
              $("#txtMawbNo").text(obj[0].MAWBNumber.substring(0, 3) + "-" + obj[0].MAWBNumber.substring(3, obj[0].MAWBNumber.length));  
              $("#txtHawbDate").text(obj[0].HAWBDate.substring(0, 11)); 
             
              // $("#spnHawbNo").text(obj[0].HAWBNumber); 
              $("#spnPcsTotal").text(obj[0].HAWB_Total_Nop); 
              $("#spnPcsRcvd").text(obj[0].HAWB_Rcvd_Nop); 
          
              $("#spnPcsTotalMawb").text(obj[0].HAWB_Total_Nop); 
              $("#spnPcsRcvdMawb").text(obj[0].HAWB_Rcvd_Nop); 
         

              if( HawbNumber == "" || HawbNumber == null){
                $("#spnGrWtTotalMawb").text((obj[0].HAWB_Total_GrossWt).toFixed(2)); 
                $("#spnGrWtRcvdMawb").text((obj[0].HAWB_Rcvd_GrossWt).toFixed(2));
                $("#spnChWtTotalMawb").text((obj[0].HAWB_Total_ChargeWt).toFixed(2));  
              }else{
                $("#spnGrWtTotal").text((obj[0].HAWB_Total_GrossWt).toFixed(2)); 
                $("#spnGrWtRcvd").text((obj[0].HAWB_Rcvd_GrossWt).toFixed(2));
                $("#spnChWtTotal").text((obj[0].HAWB_Total_ChargeWt).toFixed(2));
              }
              boestatus = obj[0].BoEApproved;
              oocstatus = obj[0].OoCApproved;
              asistatus = obj[0].BoEASIStatus;
              VTStatus = obj[0].VTStatus;
             
              if(obj[0].BoEASIStatus == "Pending" && obj[0].BoEApproved == "Approved" && (obj[0].OoCApproved == "Approved")){
                $("#btnSubmitAsi").removeAttr('disabled');
                $("#btnSubmitAsi").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
              }else{
                $("#btnSubmitAsi").attr('disabled', 'disabled');
                $("#btnSubmitAsi").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
              }

              if(obj[0].BoEApproved == "Approved"){
              $("#BoEStatus").text(obj[0].BoEApproved).css( "color", "#03b6ae" );
              $("#BoEStatusDate").text(obj[0].BoEDate.substring(0, 11));
              $("#BoEStatusTime").text(obj[0].BoEApprovedDatetime.substring(11, 16));}
              else if(obj[0].BoEApproved == "Pending"){
              $("#spnBoEMode").text("MANUAL"); 
              $("#BoEStatus").text(obj[0].BoEApproved).css( "color", "#ff9800" );
              $("#BoEStatusDate").text("--");
              }else{
                $("#BoEStatus").text(obj[0].BoEApproved).css( "color", "red" );
                $("#BoEStatusDate").text(obj[0].BoEDate.substring(0, 11));
                $("#BoEStatusTime").text(obj[0].BoEApprovedDatetime.substring(11, 16));
                $("#statusRowBoE").show(); 
                $("#spnStatusBoE").text(obj[0].BoEApproved).css( "color", "red" );
              }
             
              if(obj[0].OoCApproved == "Approved"){
                $("#OoCStatus").text(obj[0].OoCApproved).css( "color", "#03b6ae" );
                $("#OoCStatusDate").text(obj[0].OoCDate.substring(0, 11));
                $("#OoCStatusTime").text(obj[0].OoCApprovedDatetime.substring(11, 16));}
                else if(obj[0].OoCApproved == "Pending"){
                $("#spnOoCMode").text("MANUAL"); 
                $("#OoCStatus").text(obj[0].OoCApproved).css( "color", "#ff9800" );
                $("#OoCStatusDate").text("--");
                }else{
                  $("#OoCStatus").text(obj[0].OoCApproved).css( "color", "red" );
                  $("#OoCStatusDate").text(obj[0].OoCDate.substring(0, 11));
                  $("#OoCStatusTime").text(obj[0].OoCApprovedDatetime.substring(11, 16));
                  $("#statusRowOoC").show(); 
                  $("#spnStatusOoC").text(obj[0].OoCApproved).css( "color", "red" );
                }

                
               

                

              $("#AddChargeStatus").text(obj[0].AdditionalChargesStatus).css( "color", "#ff9800" );
             
              if(obj[0].BoEASIStatus == "Approved"){
                $("#BoEAsiStatus").text(obj[0].BoEASIStatus).css( "color", "#03b6ae" );
                $("#BoEAsiStatusDate").text(obj[0].BoEASIDateTime.substring(0, 11));
                  $("#BoEAsiStatusTime").text(obj[0].BoEASIDateTime.substring(11, 17));
               }
                else{
                $("#BoEAsiStatus").text(obj[0].BoEASIStatus).css( "color", "#ff9800" );
                $("#BoEAsiStatusDate").text("--");
                }

              

              if(obj[0].BoEApproved == "Approved"){
                $("#BoEDot").css('background-color', '#03b6ae');
                $("#BoEDot").css('border', '1px solid #03b6ae');
                $("#OoCDot").css('border', '1px solid orange');
                $('#accordionBoE :input').attr('disabled', 'disabled');
                $("#removeFile").attr('disabled', 'disabled'); 
                $("#btnClearBoE").attr('disabled', 'disabled'); 
                $('#accordionPOE :input').removeAttr('disabled', 'disabled');
                $("#btnPickorderSave").removeAttr('disabled');
                $("#btnPickorderSave").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                $("#btnPickorderClear").removeAttr('disabled');
               
              }else{
                $("#BoEDot").css('background-color', '#f9f9f9');
                $("#BoEDot").css('border', '1px solid orange');
                $('#accordionBoE :input').removeAttr('disabled', 'disabled');
                $("#removeFile").removeAttr('disabled', 'disabled'); 
                $("#btnClearBoE").removeAttr('disabled');

                $('#accordionPOE :input').attr('disabled', 'disabled');
                $("#btnPickorderSave").attr('disabled', 'disabled');
                $("#btnPickorderSave").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
                $("#btnPickorderClear").attr('disabled', 'disabled'); 
                
              }

              if(obj[0].OoCApproved == "Approved"){
                $("#OoCDot").css('background-color', '#03b6ae');
                $("#OoCDot").css('border', '1px solid #03b6ae');
                $("#BoEASIDot").css('border', '1px solid orange');
                $('#accordionOoC :input').attr('disabled', 'disabled');
                $("#removeFileOoC").attr('disabled', 'disabled');
                $("#btnClearOoc").attr('disabled', 'disabled');
              
              }else{
                $("#OoCDot").css('background-color', '#f9f9f9');
                $('#accordionOoC :input').removeAttr('disabled', 'disabled');
                $("#removeFileOoC").removeAttr('disabled', 'disabled');
                $("#btnClearOoc").removeAttr('disabled');
              }

              if(obj[0].BoEASIStatus == "Pending"){
                $("#BoEASIDot").css('background-color', '#f9f9f9');
              }else{
                $("#BoEASIDot").css('background-color', '#03b6ae');
                $("#BoEASIDot").css('border', '1px solid #03b6ae');
                $("#TSPDot").css('border', '1px solid orange');

              }
              if( HawbNumber == ""){
                if(obj[0].ADODONE == 1){
                  if(obj[0].BoEApproved == "Approved"){
                    $('#accordionBoE :input').attr('disabled', 'disabled');
                    $("#removeFile").attr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").attr('disabled', 'disabled');
                    $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else {
                  if(obj[0].BoENumber && obj[0].BoEApproved == "Approved"){
                    $('#accordionBoE :input').attr('disabled', 'disabled');
                    $("#removeFile").attr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").attr('disabled', 'disabled');
                    $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }else{
                    $(".ui-datepicker-trigger").show(); 
                    $('#accordionBoE :input').removeAttr('disabled', 'disabled');
                    $("#removeFile").removeAttr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").removeAttr('disabled');
                    $("#btnSubmitBoE").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                  }
                }
                  if(obj[0].OoCApproved == "Approved"){
                    $('#accordionOoC :input').attr('disabled', 'disabled');
                    $("#removeFileOoC").attr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").attr('disabled', 'disabled');
                    $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else {
                  if(obj[0].OoCNumber && obj[0].OoCApproved == "Approved"){
                    $('#accordionOoC :input').attr('disabled', 'disabled');
                    $("#removeFileOoC").attr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").attr('disabled', 'disabled');
                    $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }else{
                    $(".ui-datepicker-trigger").show(); 
                    $('#accordionOoC :input').removeAttr('disabled', 'disabled');
                    $("#removeFileOoC").removeAttr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").removeAttr('disabled');
                    $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                  }
                }
              }else{
                $('#accordionBoE :input').attr('disabled', 'disabled');
                $("#removeFile").attr('disabled', 'disabled'); 
                $("#btnSubmitBoE").attr('disabled', 'disabled');
                $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                $('#accordionOoC :input').attr('disabled', 'disabled');
                $("#removeFileOoC").attr('disabled', 'disabled'); 
                $("#btnSubmitOoC").attr('disabled', 'disabled');
                $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
              }
              }else{
                if(obj[0].CDODONE == true && obj[0].ADODONE == 1){

                  if(obj[0].BoEApproved == "Approved"){
                    $('#accordionBoE :input').attr('disabled', 'disabled');
                    $("#removeFile").attr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").attr('disabled', 'disabled');
                    $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else {
                  if(obj[0].BoENumber  && obj[0].BoEApproved == "Approved"){
                    $('#accordionBoE :input').attr('disabled', 'disabled');
                    $("#removeFile").attr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").attr('disabled', 'disabled');
                    $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }else{
                    $(".ui-datepicker-trigger").show(); 
                    $('#accordionBoE :input').removeAttr('disabled', 'disabled');
                    $("#removeFile").removeAttr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").removeAttr('disabled');
                    $("#btnSubmitBoE").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                  }
                }
                  if(obj[0].OoCApproved == "Approved"){
                    $('#accordionOoC :input').attr('disabled', 'disabled');
                    $("#removeFileOoC").attr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").attr('disabled', 'disabled');
                    $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else {
                  if(obj[0].OoCNumber && obj[0].OoCApproved == "Approved"){
                    $('#accordionOoC :input').attr('disabled', 'disabled');
                    $("#removeFileOoC").attr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").attr('disabled', 'disabled');
                    $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }else{
                    $(".ui-datepicker-trigger").show(); 
                    $('#accordionOoC :input').removeAttr('disabled', 'disabled');
                    $("#removeFileOoC").removeAttr('disabled', 'disabled'); 
                    $("#btnSubmitOoC").removeAttr('disabled');
                    $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                  }
                }
              }else{
                $('#accordionBoE :input').attr('disabled', 'disabled');
                $("#removeFile").attr('disabled', 'disabled'); 
                $("#btnSubmitBoE").attr('disabled', 'disabled');
                $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                $('#accordionOoC :input').attr('disabled', 'disabled');
                $("#removeFileOoC").attr('disabled', 'disabled'); 
                $("#btnSubmitOoC").attr('disabled', 'disabled');
                $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
              }
              }
              
              // if(obj[0].OoCApproved == "Rejected" || obj[0].BoEApproved == "Rejected"){
              //   $("#btnSubmitOoC").removeAttr('disabled');
              //   $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
              //   $("#btnSubmitBoE").removeAttr('disabled');
              //   $("#btnSubmitBoE").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
              
              // }

              if(obj[0].BoEApproved == "Pending"){
                $('#accordionOoC :input').attr('disabled', 'disabled');
                $("#removeFileOoC").attr('disabled', 'disabled'); 
                $("#btnSubmitOoC").attr('disabled', 'disabled');
                $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
               
              }else if(obj[0].BoEApproved == "Approved" && (obj[0].OoCApproved == "Pending" || obj[0].OoCApproved == "Rejected")){
                $(".ui-datepicker-trigger").show(); 
                $('#accordionOoC :input').removeAttr('disabled', 'disabled');
                $("#removeFileOoC").removeAttr('disabled', 'disabled'); 
                $("#btnSubmitOoC").removeAttr('disabled');
                $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                
              }else{
                $('#accordionOoC :input').attr('disabled', 'disabled');
                $("#removeFileOoC").attr('disabled', 'disabled'); 
                $("#btnSubmitOoC").attr('disabled', 'disabled');
                $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
              }

               if(obj[0].BoEApproved == "Rejected"){
                  document.getElementById("btnSubmitBoE").value = "Re-submit";
               }else if(obj[0].OoCApproved == "Rejected" ){
                   document.getElementById("btnSubmitOoC").value = "Re-submit";
               }

              if(obj[0].TspStatus == "Approved"){
                $("#TSPDot").css('background-color', '#03b6ae');
                $("#TSPDot").css('border', '1px solid #03b6ae');
                $("#VTDot").css('border', '1px solid orange');
                TspStatus = "Approved";
                $("#TSPStatus").text((obj[0].TspStatus)).css( "color", "#03b6ae" );
                $("#TSPStatusDate").text(obj[0].TspDateTime.substring(0, 11));
                  $("#TSPStatusTime").text(obj[0].TspDateTime.substring(11, 17));
               }else{
                  $("#TSPStatus").text(obj[0].TspStatus).css( "color", "#ff9800" );
                  $("#TSPDot").css('background-color', '#f9f9f9');
                $("#TSPStatusDate").text("--");
                }
            if(obj[0].VTStatus == "Approved" || obj[0].VTStatus == "Generated"){
              VehTokenNos = obj[0].VehicleTokenNo;
              localStorage.setItem('VehTokenNos',VehTokenNos);
              //VehTokenNos = "IVT2203100543,IVT2203100543";
              $("#VTDot").css('background-color', '#03b6ae');
              $("#VTDot").css('border', '1px solid #03b6ae');
              $("#VTStatus").text(obj[0].VTStatus).css( "color", "#03b6ae" );
              $("#VTStatusDate").text(obj[0].VTDateTime.substring(0, 11));
              $("#VTStatusTime").text(obj[0].VTDateTime.substring(11, 17));}
              
              else{
                $("#VTDot").css('background-color', '#f9f9f9');
                $("#VTStatus").text(obj[0].VTStatus).css( "color", "#ff9800" );
              $("#VTStatusDate").text("--");
              }
          
            $("#AddChargeStatus").text(obj[0].AdditionalChargesStatus).css( "color", "#ff9800" );

            if(obj[0].PickOrderStatus == "Approved" || obj[0].PickOrderStatus == "Completed"  || obj[0].PickOrderStatus == "Generated"){
              $("#PickorderStatus").text(obj[0].PickOrderStatus).css( "color", "#03b6ae" );
              $("#PickorderStatusDate").text(obj[0].PickOrderDate.substring(0, 11));
              $("#PickorderStatusTime").text(obj[0].PickOrderDate.substring(11, 17));
              $('#accordionPOE :input').attr('disabled', 'disabled');
              $("#btnPickorderSave").attr('disabled', 'disabled');
              $("#btnPickorderSave").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
              $("#btnPickorderClear").attr('disabled', 'disabled'); 
          
            }
            else if(obj[0].BoEApproved == "Pending" || obj[0].BoEApproved == "Rejected"){
              $("#PickorderStatus").text(obj[0].PickOrderStatus).css( "color", "#ff9800" );
              $("#PickorderStatusDate").text("--");
              $('#accordionPOE :input').attr('disabled', 'disabled');
            $("#btnPickorderSave").attr('disabled', 'disabled');
            $("#btnPickorderSave").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
            $("#btnPickorderClear").attr('disabled', 'disabled'); 
          }
          else{
            $("#PickorderStatus").text(obj[0].PickOrderStatus).css( "color", "#ff9800" );
            $("#PickorderStatusDate").text("--");
            $('#accordionPOE :input').removeAttr('disabled', 'disabled');
            $("#btnPickorderSave").removeAttr('disabled');
            $("#btnPickorderSave").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
            $("#btnPickorderClear").removeAttr('disabled');
          }
             // fillDriverImage(response);
              $("body").mLoading('hide');
              // $.alert('Details saved successfully');
            }else{
               
              errmsg = "Alert</br>";
              errmsgcont = obj[0].ERRORMSG;
              $.alert(errmsg,errmsgcont);
              return;

            }
          } else {
              $("body").mLoading('hide');
              $("#tblAirWayBillInfo").hide();
              $("#tblAirWayBillInfo1").hide();
              errmsg = "Wrong MAWB number</br>";
              errmsgcont = "Please enter a valid MAWB number</br>";
   //           $.alert(errmsg,errmsgcont);
              return;
          }

      },
      error: function (xhr, textStatus, errorThrown) {
          $("body").mLoading('hide');
          //alert('Server not responding...');
      }
  });
}








  clearInputsBoE = function(){
    $("#txtBOENo").val(''); 
    $("#txtBOEDate").val(''); 
    $("#txtBOEPcs").val(''); 
    $("#txtBOEGrWt").val(''); 
    $("#txtBOEChWt").val(''); 
    $("#txtBOECAV").val(''); 
    $("#txtBOECode").val(''); 

  }
  getCHAListForAssigningAgent = function(){
    if(isHouse == "true"){
      var house = HawbNumber;
      var houseID = HawbID
    }else{
      var houseID = 0;
      var house = "";}
    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_Get_Update_ClearningAgentDetails",
    data: JSON.stringify({ 
                  "OperationType":1,
                  "AirlinePrefix":AirlinePrefix,
                  "AwbNumber":AwbNumber,
                  "HawbNumber":house, //IF HAWB IS THERE THEN SEND
                  "CreatedByUserId":CreatedByUserId,
                  "OrganizationBranchId":OrganizationBranchId,
                  "OrganizationId":OrganizationId,
                  "HAWBID":houseID,
                  "MAWBID":MawbID,
                  "Operation":"CHAList",
                  "DONO":"",
                  "DODate":"",
                  "CHAOrgBranchID":0
    }
    ),       
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
        if (obj.length > 0) {
            var CHAList;
            CHAList = '<option value="">Select</option>';
            for (var i = 0; i < obj.length; i++) {
              CHAList += '<option value="' + obj[i].OrganizationBranchId + '">' + obj[i].Name + '</option>';
            }
            $("#CHAList").html(CHAList);
     
       
          
        } else {
            $("body").mLoading('hide');
            
            errmsg = "Wrong MAWB number</br>";
            errmsgcont = "Please enter a valid MAWB number</br>";
       //     $.alert(errmsg,errmsgcont);
            return;
        }

    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        //alert('Server not responding...');
    }
  });
  }

      getDODataForAssigningAgent = function(){
        if(isHouse == "true"){
          var house = HawbNumber;
          var houseID = HawbID
        }else{
          var houseID = 0;
          var house = "";}
        console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
        $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ACS_IMP_Get_Update_ClearningAgentDetails",
        data: JSON.stringify({ 
                      "OperationType":1,
                      "AirlinePrefix":AirlinePrefix,
                      "AwbNumber":AwbNumber,
                      "HawbNumber":house, //IF HAWB IS THERE THEN SEND
                      "CreatedByUserId":CreatedByUserId,
                      "OrganizationBranchId":OrganizationBranchId,
                      "OrganizationId":OrganizationId,
                      "HAWBID":houseID,
                      "MAWBID":MawbID,
                      "Operation":"Get",
                      "DONO":"",
                      "DODate":"",
                      "CHAOrgBranchID":0
        }
        ),       
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            console.log(response.d);
            console.log(obj);
            if (obj.length > 0) {
              if (obj[0].ERRORMSG == undefined) {
                $("#DONo").val(obj[0].DONO); 
                $("#DODt").val(obj[0].DODate.substring(0, 11)); 
         
            }else{
               
              errmsg = "Alert</br>";
              errmsgcont = obj[0].ERRORMSG;
              $.alert(errmsg,errmsgcont);
              return;

            }
              
            } else {
                $("body").mLoading('hide');
                
                errmsg = "Wrong MAWB number</br>";
                errmsgcont = "Please enter a valid MAWB number</br>";
           //     $.alert(errmsg,errmsgcont);
                return;
            }
    
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            //alert('Server not responding...');
        }
      });
      }
    
      SubmitClearingAgent= function(){
       
        var doNo =   $("#DONo").val();
        var doDate =   $("#DODt").val();
        var CHAOrgBranchID = $("#CHAList").val();
        if(CHAOrgBranchID ==""){
          errmsg = "Alert</br>";
          errmsgcont = "Please select Assign Clearing Agent</br>";
          $.alert(errmsg,errmsgcont);
          return;
        }
        if(isHouse == "true"){
          var house = HawbNumber;
          var houseID = HawbID
        }else{
          var houseID = 0;
          var house = "";}
        console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
        $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ACS_IMP_Get_Update_ClearningAgentDetails",
        data: JSON.stringify({ 
                      "OperationType":1,
                      "AirlinePrefix":AirlinePrefix,
                      "AwbNumber":AwbNumber,
                      "HawbNumber":house, //IF HAWB IS THERE THEN SEND
                      "CreatedByUserId":CreatedByUserId,
                      "OrganizationBranchId":OrganizationBranchId,
                      "OrganizationId":OrganizationId,
                      "HAWBID":houseID,
                      "MAWBID":MawbID,
                      "Operation":"Update",
                      "DONO":doNo,
                      "DODate":doDate,
                      "CHAOrgBranchID":CHAOrgBranchID
        }
        ),       
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
            console.log(response.d);
            console.log(obj);
            if (obj.length > 0) {
              if (obj[0].Column1 == undefined) {
         
            }else{
               
              errmsg = "Alert</br>";
              errmsgcont = obj[0].Column1;
              $.alert(errmsg,errmsgcont);
              const myTimeout = setTimeout(myFunction, 3000);
              function myFunction() {
                window.location.href = "IMP_ShipmentDetailsFromMenu.html";
              
              }
              return;

            }
              
            } else {
                $("body").mLoading('hide');
                
                errmsg = "Wrong MAWB number</br>";
                errmsgcont = "Please enter a valid MAWB number</br>";
           //     $.alert(errmsg,errmsgcont);
                return;
            }
    
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            //alert('Server not responding...');
        }
      });
      }