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
var MenuTitle= localStorage.getItem('ImportsMenu');
var DamagedNOP;
var OoCFilePath;
var BoEFilePath;
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

var TspStatus;
var boestatus;
var oocstatus;
var asistatus;
var BOEID;
var OOCID;
  $(function () {
   // setPickOrderDamageNoP();
    CheckTSPConfigurationSetting();

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
console.log(MenuTitle)
$("#MenuHeading").text(MenuTitle);

if(MenuTitle == "ASI Submission"){
    $("#accordionBoEASI").show(); 
    $("#accordionTSP").hide(); 
    $("#accordionAssign").hide(); 
    $("#accordionBOEStatus").hide(); 
}else if(MenuTitle == "Generate DO"){

    document.getElementById("heading2").disabled = true;
    $("#accordionBoEASI").show(); 
    $("#AsiArrow").hide();
    $("#accordionTSP").show(); 
    $("#accordionAssign").hide(); 
    $("#accordionBOEStatus").hide(); 
}
else if(MenuTitle == "Assign Clearing Agent"){

  document.getElementById("heading2").disabled = true;
  $("#accordionBoEASI").show(); 
  $("#AsiArrow").hide();
  document.getElementById("heading6").disabled = true;
  $("#accordionTSP").show(); 
  $("#DOArrow").hide();
  $("#accordionAssign").show(); 
  $("#accordionBOEStatus").hide(); 
}
else if(MenuTitle == "BOE Status"){

  document.getElementById("heading2").disabled = true;
  $("#accordionBoEASI").show(); 
  $("#AsiArrow").hide();
  document.getElementById("heading6").disabled = true;
  $("#accordionTSP").show(); 
  $("#DOArrow").hide();
  document.getElementById("heading5").disabled = true;
  $("#accordionAssign").show(); 
  $("#AssignArrow").hide();
  $("#accordionBOEStatus").show(); 
}else if(MenuTitle == "Generate Vehicle Token"){
    $("#accordionVT").show(); 
}else{
    $("#accordionCharges").show(); 
}

//if( HawbNumber == "" || HawbNumber == null){
  $("#lblHouseMaster").hide();
  $("#lblHouse").hide();
  $("#txtHawbNo").hide();
  $("#lblHawb").hide();
  $("#dateAwb").text("MAWB Date");
  $("#accordionMawb").show();
// }else{
//   $("#lblHouseMaster").show();
//   $("#lblHouse").show();
// $("#dateAwb").text("HAWB Date");
// $("#accordionHawb").show();
// }

FillHouseDetails();

ImportListingPageDetails('1', AirlinePrefix, AwbNumber, HawbNumber, IGMNo, IGMYear, CreatedByUserId, OrganizationBranchId, OrganizationId);

getDocumentStorePath();

const myTimeout = setTimeout(myFunction, 500);

function myFunction() {

  
};


});


function back() {
    window.location.href = "IMP_BoEandOoCDetails.html";
  }

  function backButton() {
    window.location.href = "dashboard-export.html";
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



$(document).ready(function () {
  $('#btnImageGetFromCamera').click(function () {
    alert("in camera click")
      var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          mediaType: Camera.MediaType.ALLMEDIA,
          encodingType: Camera.EncodingType.JPEG,
          saveToPhotoAlbum: true
      };
      navigator.camera.getPicture(onImageSuccess, onImageFail, options);
  });
  function onImageSuccess(imageData) {
    alert(imageData)
      $('#imgCameraImage').show();
      var image = document.getElementById('imgCameraImage');
      image.style.display = 'block';
      image.src = "data:image/jpeg;base64," + imageData;
      imageDataFromCamera = imageData;
  }
  function onImageFail(message) {
      alert('Failed because: ' + message);
  }
});



function handleFileSelect(evt) {
  var files = evt.target.files;
  var file = files[0];
  if (files && file) {
    var reader = new FileReader();

    reader.onload = this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(file);

  }
}

function _handleReaderLoaded(readerEvt) {

  var binaryString = readerEvt.target.result;
  this.base64textString = btoa(binaryString);

  this.documentuploadobj.FileData = this.base64textString.toString(binaryString);

  console.log(this.documentuploadobj.FileData);

 ActualFileData = this.documentuploadobj.FileData;
 
}


function onFileSelected(event) {
  if (event.target.files.length > 0) {
    this.fileList = event.target.files[0].name;
  }
}

function readFile(event) {

  this.fileOC = event.target.files[0];
  console.log("file========", event.target.files[0]);

  this.fileName = this.fileOC.name;
  console.log("file Name========", this.fileName);
  const fsize = this.fileOC.size;
  this.fileSize = Math.round((fsize / 1024));
  console.log("file size ========", this.fileSize);
  // The size of the file.
  if (this.fileSize >= 2048) {
    this.fileList = '';
    $("#fileList").val(''); 
    $("#fileListOoC").val(''); 
    errmsg = "Alert</br>";
    errmsgcont = "Please select a file less than 2MB.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  } else {

  }


}


function onSelectFile(event) {
  this.handleFileSelect(event);

  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url
    var file = event.target.files[0];

    documentuploadobj.FileName = event.target.files[0].name;
    documentuploadobj.FileSize = event.target.files[0].size;

    documentuploadobj.ActualFile = event.target.files[0];

    reader.onload = event => {
    };
  }
  console.log(JSON.stringify(documentuploadobj))
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

FillHouseDetails = function(){
  $("#VTlistData").show();
  $("#VTlistData").empty();

  var boENum=  $("#txtBOENo").val(); 

  console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
  type: 'POST',
  url: ACSServiceURL + "/ACS_IMP_TSPGetDetails_SAS",
  data: JSON.stringify({
      "OperationType":1,
      "AirlinePrefix":AirlinePrefix,
      "AwbNumber":AwbNumber,
      "HawbNumber":"", //IF HAWB IS THERE THEN SEND
      "IGMNo":0,
      "IGMYear":0,
      "BoENumber":0,
      "CreatedByUserId":CreatedByUserId,
      "OrganizationBranchId":OrganizationBranchId,
      "OrganizationId":OrganizationId,
      "CommodityGroup":"",
      "CommodityName":"",
      "MAWBID":0,
      "HAWBID":0
      }
      
    ),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (response, xhr, textStatus) {
    var obj = JSON.parse(response.d);
    console.log(response.d);
    console.log(obj);
    var count = 0;
    var row = "";
     if (obj.length > 0) {
      var MAWBNo = obj[0].MAWBNo;
       if (obj[0].HAWBNo) {
        var row = "";
    
        $.each(obj, function (i, d) {
          row += "<div class='col-12'><h2 style='font-weight: bold;font-size: 15px;margin: 10px -10px;'>HAWB No. "+ d.HAWBNo+ "</h2></div>";
          row += "<table style='width: 100% ;border: lightgrey 1px solid;' id='tblChargeInfo'>";
          row += "<thead>";
          row += "<tr class='table_heading' style='text-align: left;'>";
          row += "<th>NoP</th>";
          row += "<th>Gr. Wt.</th>";
          row += "<th>Rec NOP</th>";
          row += "<th>Rec Gr. Wt</th>";
          row += "</tr>";
          row += "</thead>";
          row += "<tbody>";
          row += "<tr class=''>";
      
            row += "<td>" + d.HAWBNOP  + "</td>";
            row += "<td>" + d.HAWBGrWt.toFixed(2) + " Kg</td>";
            row += "<td>" + d.RCVDNOP + "</td>";
      
            row += "<td>" + d.RCVDGRWt.toFixed(2) + " Kg</td>";
            row += "</tr>";  
            row += "</tbody>";
            row += "</table>";

            
        }); 
       }
     
       $("#houseListData").append(row);
            $("body").mLoading('hide');
     } else {
         $("body").mLoading('hide');
        
         errmsg = "Wrong MAWB number</br>";
         errmsgcont = "Please enter a valid BoE number</br>";
     //    $.alert(errmsg,errmsgcont);
         return;
     }

 },
 error: function (xhr, textStatus, errorThrown) {
     $("body").mLoading('hide');
     alert('Server not responding...');
 }
});

      } 

ImportListingPageDetails = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, IGMNo, IGMYear, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Imp_ListingPage_details",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: "", IGMNo: 0, IGMYear: 0, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
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
              localStorage.setItem('GhaName', obj[0].GHAName);
                GHAID = obj[0].GHAID;
                DOLevel = obj[0].DOLevel;
               localStorage.setItem('ctoID', GHAID);
              localStorage.setItem('MawbRowId', obj[0].MAWBROWID);
              localStorage.setItem('IgmRowId', obj[0].IGMROWID);
              MAWBROWID = obj[0].MAWBROWID;
              localStorage.setItem('HouseArrayData',obj[0].BoEID);
              $("#txtIGMNo").text(obj[0].IGMNo); 
              $("#txtIGMYear").text(obj[0].IGMYear); 
              $("#txtHawbNo").text(obj[0].HAWBNumber); 
              $("#txtMawbNo").text(obj[0].MAWBNumber.substring(0, 3) + "-" + obj[0].MAWBNumber.substring(3, obj[0].MAWBNumber.length));  
              $("#txtHawbDate").text(obj[0].HAWBDate.substring(0, 11)); 

              $("#txtFlightNo").text(obj[0].FlightNo);
              $("#txtFlightDate").text(obj[0].FlightDate.substring(0, 11));

              flightNo = obj[0].FlightNo;
              flightDate = obj[0].FlightDate.substring(0, 11);
              localStorage.setItem('FlightNo',flightNo);
              localStorage.setItem('FlightDate',flightDate);
              // $("#spnHawbNo").text(obj[0].HAWBNumber); 
              $("#spnPcsTotal").text(obj[0].HAWB_Total_Nop); 
              $("#spnPcsRcvd").text(obj[0].HAWB_Rcvd_Nop); 
          
              $("#spnPcsTotalMawb").text(obj[0].HAWB_Total_Nop); 
              $("#spnPcsRcvdMawb").text(obj[0].HAWB_Rcvd_Nop); 
         

              // if( HawbNumber == "" || HawbNumber == null){
                $("#spnGrWtTotalMawb").text((obj[0].HAWB_Total_GrossWt).toFixed(2)); 
                $("#spnGrWtRcvdMawb").text((obj[0].HAWB_Rcvd_GrossWt).toFixed(2));
                $("#spnChWtTotalMawb").text((obj[0].HAWB_Total_ChargeWt).toFixed(2));  
              // }else{
              //   $("#spnGrWtTotal").text((obj[0].HAWB_Total_GrossWt).toFixed(2)); 
              //   $("#spnGrWtRcvd").text((obj[0].HAWB_Rcvd_GrossWt).toFixed(2));
              //   $("#spnChWtTotal").text((obj[0].HAWB_Total_ChargeWt).toFixed(2));
              // }
              boestatus = obj[0].BoEApproved;
              oocstatus = obj[0].OoCApproved;
              asistatus = obj[0].BoEASIStatus;
              assignStatus = obj[0].AssignStatus;
              VTStatus = obj[0].VTStatus;
             
              if(obj[0].BoEASIStatus == "Pending"){
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
             
              if(obj[0].BoEASIStatus == "Completed"){
                $("#BoEAsiStatus").text(obj[0].BoEASIStatus).css( "color", "#03b6ae" );
               $("#BoEAsiStatusDate").text(obj[0].BoEASIDateTime.substring(0, 11));
                 $("#BoEAsiStatusTime").text(obj[0].BoEASIDateTime.substring(11, 17));
               }
                else{
                $("#BoEAsiStatus").text(obj[0].BoEASIStatus).css( "color", "#ff9800" );
                $("#BoEAsiStatusDate").text("--");
                }

                if(obj[0].TspStatus == "Completed"){
                  $("#DODot").css('background-color', '#03b6ae');
                  $("#DODot").css('border', '1px solid #03b6ae');
                  $("#AssignCLAgntDot").css('border', '1px solid orange');
                  DOstatus = obj[0].TspStatus;
                  localStorage.setItem('DOstatus',DOstatus);
                  $("#DOStatus").text((obj[0].TspStatus)).css( "color", "#03b6ae" );
                  $("#DOStatusDate").text(obj[0].TspDateTime.substring(0, 11));
                    $("#DOStatusTime").text(obj[0].TspDateTime.substring(11, 17));
                 }else{
                  DOstatus = obj[0].TspStatus;
                  localStorage.setItem('DOstatus',DOstatus);
                    $("#DOStatus").text(obj[0].TspStatus).css( "color", "#ff9800" );
                    $("#TSPDot").css('background-color', '#f9f9f9');
                  $("#DOStatusDate").text("--");
                  }
                  if(obj[0].AssignStatus == "Completed"){
                    $("#AssignCLAgntDot").css('background-color', '#03b6ae');
                    $("#AssignCLAgntDot").css('border', '1px solid #03b6ae');
                    $("#BoEStatusDot").css('border', '1px solid orange');
                    $("#AssignStatus").text(obj[0].AssignStatus).css( "color", "#03b6ae" );
                   $("#AssignStatusDate").text(obj[0].AssignDate.substring(0, 11));
                     $("#AssignStatusTime").text(obj[0].AssignDate.substring(11, 17));
                   }
                    else{
                      $("#AssignCLAgntDot").css('background-color', '#f9f9f9');
                    $("#AssignStatus").text(obj[0].AssignStatus).css( "color", "#ff9800" );
                    $("#AssignStatusDate").text("--");
                    }
                
                if(obj[0].BOEStatus == "Approved"){
                  $("#BoEStatusDot").css('background-color', '#03b6ae');
                  $("#BoEStatusDot").css('border', '1px solid #03b6ae');
                  $("#VTDot").css('border', '1px solid orange');
                  $("#BoEStatus").text(obj[0].BOEStatus).css( "color", "#03b6ae" );
                 $("#BoEStatusDate").text(obj[0].BOEStatusDate.substring(0, 11));
                   $("#BoEStatusTime").text(obj[0].BOEStatusDate.substring(11, 17));
                 }
                  else{
                    $("#BoEStatusDot").css('background-color', '#f9f9f9');
                  $("#BoEStatus").text(obj[0].BOEStatus).css( "color", "#ff9800" );
                  $("#BoEStatusDate").text("--");
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
                $("#GenerateDO").css('border', '1px solid orange');

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
                  }else if(obj[0].BoENumber && obj[0].BoEApproved == "Pending"){
                    $('#accordionBoE :input').attr('disabled', 'disabled');
                    $("#removeFile").attr('disabled', 'disabled'); 
                    $("#btnSubmitBoE").attr('disabled', 'disabled');
                    $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
                  }
                  else{
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
                  }
                  else if(obj[0].OoCNumber && obj[0].OoCApproved == "Pending"){
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
                  }
                  else if(obj[0].BoENumber && obj[0].BoEApproved == "Pending"){
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
                  }
                  else if(obj[0].OoCNumber && obj[0].OoCApproved == "Pending"){
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
               
              }else if(obj[0].BoEApproved == "Approved" && (obj[0].OoCApproved == "Pending") && (!obj[0].OoCNumber )){
                $(".ui-datepicker-trigger").show(); 
                $('#accordionOoC :input').removeAttr('disabled', 'disabled');
                $("#removeFileOoC").removeAttr('disabled', 'disabled'); 
                $("#btnSubmitOoC").removeAttr('disabled');
                $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
                
              }   else if(obj[0].BoEApproved == "Approved" && (obj[0].OoCApproved == "Rejected") && (obj[0].OoCNumber )){
              $(".ui-datepicker-trigger").show(); 
              $('#accordionOoC :input').removeAttr('disabled', 'disabled');
              $("#removeFileOoC").removeAttr('disabled', 'disabled'); 
              $("#btnSubmitOoC").removeAttr('disabled');
              $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
            }
              else{
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

         
                MultipleSHC = obj[0].MultipleSHC;
                localStorage.setItem('MultipleSHC',MultipleSHC);

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

getBoEDetails = function(){

  // if(boestatus == "Approved"){
  //   $("#btnSubmitBoE").attr('disabled', 'disabled');
  //   $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"});
  // }else{
  //   $("#btnSubmitBoE").removeAttr('disabled');
  //   $("#btnSubmitBoE").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
  // }
  console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
   type: 'POST',
   url: ACSServiceURL + "/ACS_Imp_BoE_details",
   data: JSON.stringify({ OperationType: "1", AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, IGMNo: IGMNo, IGMYear: IGMYear, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId, BoENumber:0, BoEDate:null, BoE_NoP:0, BoE_CAVValue:0, BoE_CHA_Code:null }),
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
           $("#txtBOECode").val(obj[0].BoE_CHA_Code); 
           $("#spnBoEMode").text(obj[0].BoEMode); 
           $("#txtBOENo").val(obj[0].BoENumber); 
           $("#txtBOEDate").val(obj[0].BoEDate.substring(0, 11)); 
           $("#txtBOEPcs").val(obj[0].BoE_NoP); 
           $("#txtBOEGrWt").val((obj[0].BoE_GrossWt).toFixed(2));  
           $("#txtBOEChWt").val((obj[0].BoE_ChargeWt).toFixed(2));  
           $("#txtBOECAV").val(obj[0].BoE_CAV); 
           
           if(obj[0].BoEID){
            BOEID =  obj[0].BoEID;
           
           viewDocumentBoE(BOEID);
           }
          // fillDriverImage(response);
           $("body").mLoading('hide');
           // $.alert('Details saved successfully');
         }else{
            
           errmsg = "Alert</br>";
           errmsgcont = obj[0].ERRORMSG;
           // $.alert(errmsg,errmsgcont);
           return;

         }
       } else {
           $("body").mLoading('hide');
          
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

getPickOrderDetails = function(){

 console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
 $.ajax({
  type: 'POST',
  url: ACSServiceURL + "/ACS_Imp_PickOrder_details",
  data: JSON.stringify({ OperationType: "1", AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, IGMNo: IGMNo, IGMYear: IGMYear, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId, PickOrdExm_NoP:0, PickOrdExm_Remarks:""}),
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
          $("#spnConsignee").text(obj[0].ConsigneeName); 
          $("#spnAgentCode").text(obj[0].CHAAgentCode); 
          $("#spnNoG").text(obj[0].NOG); 
          $("#spnRouting").text(obj[0].Routing); 
          $("#spnLocation").text(obj[0].LocationCode);
          $("#spnDamageNOP").text(DamagedNOP);
          $("#spnPcsExam").val(obj[0].PAO_ExamPieces); 
          ExamPiecesVal = obj[0].PAO_ExamPieces;
          $("#spnRemarks").val(obj[0].Remarks); 
          $("#spnIgmNo").text(obj[0].IGMNo); 
          $("#spnFlightNo").text(obj[0].FlightNo); 
          $("#spnFlightDateTime").text(obj[0].FlightDateTime); 
          $("#spnPkgs").text(obj[0].HAWB_Total_Nop); 
          $("#spnGrWt").text((obj[0].HAWB_Total_GrossWt).toFixed(2)); 
          $("#spnChWt").text((obj[0].HAWB_Total_ChargeWt).toFixed(2));  
          
         // fillDriverImage(response);
          $("body").mLoading('hide');
          // $.alert('Details saved successfully');
        }else{
           
          errmsg = "Alert</br>";
          errmsgcont = obj[0].ERRORMSG;
         //  $.alert(errmsg,errmsgcont);
          return;

        }
      } else {
          $("body").mLoading('hide');
         
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

getOoCDetails = function(){

 console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
 $.ajax({
  type: 'POST',
  url: ACSServiceURL + "/ACS_Imp_OoC_details",
  data: JSON.stringify({ OperationType: "1", AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, IGMNo: IGMNo, IGMYear: IGMYear, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId, OoCNumber:0, OoCDate:null, OoC_NoP:0}),
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
          $("#spnOoCMode").text(obj[0].OoCMode); 
          $("#spnOoCNo").val(obj[0].OoCNumber); 
          $("#spnOoCDate").val(obj[0].OoCDate.substring(0, 11)); 
          $("#txtOoCPcs").val(obj[0].OoC_NoP); 
          $("#txtBOEPcsOoC").val(obj[0].OoC_BoE_NoP);
          
          if(obj[0].OoCID){
           var OOCID =  obj[0].OoCID;
          // alert(OOCID);
          localStorage.setItem('oocid', OOCID);
          viewDocumentOoC(OOCID);
          }
          
         // fillDriverImage(response);
          $("body").mLoading('hide');
          // $.alert('Details saved successfully');
        }else{
           
          errmsg = "Alert</br>";
          errmsgcont = obj[0].ERRORMSG;
         //  $.alert(errmsg,errmsgcont);
          return;

        }
      } else {
          $("body").mLoading('hide');
         
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

submitBoEData = function(){
  if($("#txtBOENo").val() == "" || $("#txtBOENo").val() == undefined){
    errmsg = "Alert</br>";
    errmsgcont = "Please enter BoE Number.</br>";
    $.alert(errmsg,errmsgcont);
    return;

  }

  if($("#txtBOEDate").val() == "" || $("#txtBOEDate").val() == undefined){
    errmsg = "Alert</br>";
    errmsgcont = "Please select Date.</br>";
    $.alert(errmsg,errmsgcont);
    return;

  }
 if($("#txtBOEPcs").val() != $("#spnPcsTotal").text()){
   errmsg = "Alert</br>";
   errmsgcont = "Please enter valid pieces.</br>";
   $.alert(errmsg,errmsgcont);
   return;
 }
 if($("#fileList").val() == "" || $("#fileList").val() == undefined){
   errmsg = "Alert</br>";
   errmsgcont = "Please upload BoE document.</br>";
   $.alert(errmsg,errmsgcont);
   return;

 }
 $('body').mLoading({
   text: "Please Wait..",
});
 var MAWBRowId = localStorage.getItem('MawbRowId');
 var HAWBRowId = localStorage.getItem('HawbRowId');
 var IGMRowId = localStorage.getItem('IgmRowId');

var boENumber=  $("#txtBOENo").val(); 
 var boEDate = $("#txtBOEDate").val(); 
 var boEPcs = $("#txtBOEPcs").val(); 
 // $("#txtBOEGrWt").val(obj[0].BoE_GrossWt); 
 // $("#txtBOEChWt").val(obj[0].BoE_ChargeWt); 
 var boECAV = $("#txtBOECAV").val(); 
var boECode =  $("#txtBOECode").val(); 
var filename = this.documentuploadobj.FileName;
var pdfFileSize = this.documentuploadobj.FileSize;
var docName = filename.substr(0, filename.lastIndexOf('.'));


var filePath = " ~\\EDocket\\" + OrganizationId + "\\" + OrganizationBranchId;


//  var today = new Date(boEDate);
//  var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

// boEDate = dd + '/' + mm + '/' + yyyy + ' 00:00:00';
// console.log(boEDate);
 console.log(boENumber + ',' + docName + ',' + pdfFileSize + ',' + CreatedByUserId + ',' + filePath + ',' + OrganizationId + ',' + OrganizationBranchId + ',' + ActualFileData );

 $.ajax({
   type: 'POST',
   url: ACSServiceURL + "/ACS_Imp_Insert_BoEAndOoC_Documents",
   data: JSON.stringify(
     {
       "BoENo":boENumber,
       "AWBId":0,
       "DocumentTemplateId":100,
       "DocumentName":docName,
       "FileLength":pdfFileSize,
       "Comments":"",
       "Status":"Uploaded",
       "CreatedBy":CreatedByUserId,
       "organizationTypeId":"3",
       "FilePath":filePath,
       "organizationId":OrganizationId,
       "OrganizationBranchId":OrganizationBranchId,
       "BOEID":0,
       "OOCID":0,
       "IGMMAWBHAWBID":0,
       "IGMI":0,
       "FileExtension":".pdf",
       "UniqueId":"",
       "DocumentStoreId":0,
       "ActualFileData" : ActualFileData
     }),
     
   contentType: "application/json; charset=utf-8",
   dataType: "json",
   success: function (response, xhr, textStatus) {
       var obj = JSON.parse(response.d);
      console.log(response.d);
      console.log(obj);
       if (obj.length > 0) {
         if (obj[0].ERRORMSG == undefined) {
           var BoEuniqueId = obj[0].UniqueId;
           $("#tblAirWayBillInfo").fadeIn('slow');
           $("#tblAirWayBillInfo1").show();
           console.log(response);
           saveBoEData(BoEuniqueId);
          
           
         }else{
           $("body").mLoading('hide');
           errmsg = "Alert</br>";
           errmsgcont = obj[0].ERRORMSG;
           $.alert(errmsg,errmsgcont);
           return;
 
         }
       } else {
           $("body").mLoading('hide');
          
           errmsg = "Wrong MAWB number</br>";
           errmsgcont = "Please enter a valid BoE number</br>";
       //    $.alert(errmsg,errmsgcont);
           return;
       }
 
   },
   error: function (xhr, textStatus, errorThrown) {
       $("body").mLoading('hide');
       alert('Server not responding...');
   }
 });
}

saveBoEData = function(BoEuniqueId){

 console.log(BoEuniqueId);

 if(boestatus == "Rejected"){
   var OperatnType = "2";
 }else{
   var OperatnType = "1";
 }


var boENumber=  $("#txtBOENo").val(); 
 var boEDate = $("#txtBOEDate").val(); 
 var boEPcs = $("#txtBOEPcs").val(); 
 // $("#txtBOEGrWt").val(obj[0].BoE_GrossWt); 
 // $("#txtBOEChWt").val(obj[0].BoE_ChargeWt); 
 var boECAV = $("#txtBOECAV").val(); 
var boECode =  $("#txtBOECode").val(); 

var today = new Date(boEDate);
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

boEDate = dd + '/' + mm + '/' + yyyy + ' 00:00:00';
console.log(boEDate);


 $.ajax({
   type: 'POST',
   url: ACSServiceURL + "/ACS_IMP_INSERT_BoE_Details",
   data: JSON.stringify(
     {
       "OperationType":OperatnType,
       "userid":CreatedByUserId,
       "BoEnumberXMLData":"",
       "strOutmsg":"",
       "OrganizationId":OrganizationId,
       "OrganizationBranchId":OrganizationBranchId,
       "BoENumber":boENumber,
       "BoEDate":boEDate,
       "BoE_NoP":boEPcs,
       "BoE_CAVValue":boECAV,
       "BoE_CHA_Code":boECode,
       "BoEType":"1",
       "AirlinePrefix":AirlinePrefix,
       "AwbNumber":AwbNumber,
       "HawbNumber":HawbNumber,
       "IGMNo":IGMNo,
       "IGMYear":IGMYear,
       "BoEID":"0",
       "UniqueId":BoEuniqueId

     }),
    
       
   contentType: "application/json; charset=utf-8",
   dataType: "json",
   success: function (response, xhr, textStatus) {
       var obj = JSON.parse(response.d);
      console.log(response.d);
      console.log(obj);
       if (obj.length > 0) {
         if (obj[0].Successmessage == undefined) {
           $("#tblAirWayBillInfo").fadeIn('slow');
           $("#tblAirWayBillInfo1").show();
           console.log(response);
          
           
          // fillDriverImage(response);
           $("body").mLoading('hide');
           // $.alert('Details saved successfully');
         }else{
           $("body").mLoading('hide');
           if(obj[0].BoEID){
             $("#btnSubmitBoE").attr('disabled', 'disabled');
             $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
             errmsg = "Alert</br>";
             errmsgcont = obj[0].Successmessage;
             $.alert(errmsg,errmsgcont);
           }else{
             $("#btnSubmitBoE").removeAttr('disabled');
             $("#btnSubmitBoE").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
           }
           ImportListingPageDetails('1', AirlinePrefix, AwbNumber, HawbNumber, IGMNo, IGMYear, CreatedByUserId, OrganizationBranchId, OrganizationId);
           getBoEDetails();
         }
       } else {
           $("body").mLoading('hide');
          
           errmsg = "Wrong MAWB number</br>";
           errmsgcont = "Please enter a valid BoE number</br>";
          // $.alert(errmsg,errmsgcont);
           return;
       }
 
   },
   error: function (xhr, textStatus, errorThrown) {
       $("body").mLoading('hide');
       alert('Server not responding...');
   }
 });
}

viewDocumentBoE = function(id){
 
 
  $.ajax({
   type: 'POST',
   url: ACSServiceURL + "/ACS_Import_ViewJobDocument",
  data: JSON.stringify({
     "OperationType":"1",
     "BoEID":id,
     "OOCID":0,
     "Type":"BoE"
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
           $("#tblAirWayBillInfo").fadeIn('slow');
           $("#tblAirWayBillInfo1").show();
           console.log(response)
           // $("#fileList").val(obj[0].DocumentName); 
           $("#fileList").hide(); 
           $("#fileData").show(); 
          
           $('#viewFile').text(obj[0].DocumentName + ".pdf");
         
           $('#viewFile').attr('href', obj[0].FilePath);
           BoEFilePath = obj[0].FilePath;
           $("body").mLoading('hide');
         }else{
            
           errmsg = "Alert</br>";
           errmsgcont = obj[0].ERRORMSG;
           // $.alert(errmsg,errmsgcont);
           return;

         }
       } else {
           $("body").mLoading('hide');
          
           errmsg = "Wrong MAWB number</br>";
           errmsgcont = "No valid Document</br>";
          //$.alert(errmsg,errmsgcont);
           return;
       }

   },
   error: function (xhr, textStatus, errorThrown) {
       $("body").mLoading('hide');
       alert('Server not responding...');
   }
});
}
removePdf = function(){
   if(BOEID){
     $("#viewFile").text("");
     removeDocumentBoE();
   }
}
removeDocumentBoE = function(){

 $.ajax({
  type: 'POST',
  url: ACSServiceURL + "/ACS_Import_ViewJobDocument",
 data: JSON.stringify({
   "OperationType":"2",
     "BoEID":BOEID,
     "OOCID":0,
     "Type":"BoE"
     }),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (response, xhr, textStatus) {

      var obj = JSON.parse(response.d);
     console.log(response.d);
     console.log(obj);
      if (obj.length > 0) {
        if (obj[0].StrMessage == undefined) {
          $("#tblAirWayBillInfo").fadeIn('slow');
          $("#tblAirWayBillInfo1").show();
          console.log(response)
    
        
          $("body").mLoading('hide');
        }else{
         $("#fileList").show(); 
         $("#fileData").hide(); 
         $("body").mLoading('hide');
          errmsg = "Alert</br>";
          errmsgcont = obj[0].StrMessage;
           $.alert(errmsg,errmsgcont);
          return;

        }
      } else {
          $("body").mLoading('hide');
         
          errmsg = "Wrong MAWB number</br>";
          errmsgcont = "No valid Document</br>";
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

submitOoCData = function(){
  
  if($("#spnOoCNo").val() == "" || $("#spnOoCNo").val() == undefined){
    errmsg = "Alert</br>";
    errmsgcont = "Please enter Ooc Number.</br>";
    $.alert(errmsg,errmsgcont);
    return;

  }

  if($("#spnOoCDate").val() == ""){
    errmsg = "Alert</br>";
    errmsgcont = "Please enter Date.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
 
  if($("#txtOoCPcs").val() =="" || $("#txtOoCPcs").val() ==undefined){
    errmsg = "Alert</br>";
    errmsgcont = "Please enter OoC pieces.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
  if($("#txtBOEPcsOoC").val() =="" || $("#txtBOEPcsOoC").val() ==undefined){
    errmsg = "Alert</br>";
    errmsgcont = "Please enter BoE pieces.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }

  if($("#txtBOEPcs").val() != $("#txtOoCPcs").val()){
    errmsg = "Alert</br>";
    errmsgcont = "BOE total pieces and OOC total pieces does not match.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
    
  if($("#txtBOEPcsOoC").val() != $("#txtOoCPcs").val()){
    errmsg = "Alert</br>";
    errmsgcont = "BOE total pieces and OOC total pieces does not match.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }

  if($("#fileListOoC").val() == "" || $("#fileListOoC").val() == undefined){
    errmsg = "Alert</br>";
    errmsgcont = "Please upload OoC document.</br>";
    $.alert(errmsg,errmsgcont);
    return;

  }

  $('body').mLoading({
    text: "Please Wait..",
});
  var MAWBRowId = localStorage.getItem('MawbRowId');
  var HAWBRowId = localStorage.getItem('HawbRowId');
  var IGMRowId = localStorage.getItem('IgmRowId');

 var boENumber=  $("#txtBOENo").val(); 
  var boEDate = $("#txtBOEDate").val(); 
  var boEPcs = $("#txtBOEPcsOoC").val(); 
  // $("#txtBOEGrWt").val(obj[0].BoE_GrossWt); 
  // $("#txtBOEChWt").val(obj[0].BoE_ChargeWt); 
  var boECAV = $("#txtBOECAV").val(); 
 var boECode =  $("#txtBOECode").val(); 
var filename = this.documentuploadobj.FileName;
var pdfFileSize = this.documentuploadobj.FileSize;
var docName = filename.substr(0, filename.lastIndexOf('.'));


var filePath = " ~\\EDocket\\" + OrganizationId + "\\" + OrganizationBranchId;


//  var today = new Date(boEDate);
//  var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

// boEDate = dd + '/' + mm + '/' + yyyy + ' 00:00:00';
// console.log(boEDate);
  console.log(boENumber + ',' + docName + ',' + pdfFileSize + ',' + CreatedByUserId + ',' + filePath + ',' + OrganizationId + ',' + OrganizationBranchId + ',' + ActualFileData );

  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_Imp_Insert_BoEAndOoC_Documents",
    data: JSON.stringify(
      {
        "BoENo":boENumber,
        "AWBId":0,
        "DocumentTemplateId":101,
        "DocumentName":docName,
        "FileLength":pdfFileSize,
        "Comments":"",
        "Status":"Uploaded",
        "CreatedBy":CreatedByUserId,
        "organizationTypeId":"3",
        "FilePath":filePath,
        "organizationId":OrganizationId,
        "OrganizationBranchId":OrganizationBranchId,
        "BOEID":0,
        "OOCID":0,
        "IGMMAWBHAWBID":0,
        "IGMI":0,
        "FileExtension":".pdf",
        "UniqueId":"",
        "DocumentStoreId":0,
        "ActualFileData" : ActualFileData
      }),
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].ERRORMSG == undefined) {
            var OoCuniqueId = obj[0].UniqueId;
            $("#tblAirWayBillInfo").fadeIn('slow');
            $("#tblAirWayBillInfo1").show();
            console.log(response);
            saveOoCData(OoCuniqueId);
           
          }else{
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].ERRORMSG;
            $.alert(errmsg,errmsgcont);
            return;
  
          }
        } else {
            $("body").mLoading('hide');
           
            errmsg = "Wrong MAWB number</br>";
            errmsgcont = "Please enter a valid BoE number</br>";
          //  $.alert(errmsg,errmsgcont);
            return;
        }
  
    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        alert('Server not responding...');
    }
  });
}

saveOoCData = function(OoCuniqueId){

  console.log(OoCuniqueId);

  if(oocstatus == "Rejected"){
    var OperatnType = "2";
  }else{
    var OperatnType = "1";
  }


  if($("#fileListOoC").val() == "" || $("#fileListOoC").val() == undefined){
    errmsg = "Alert</br>";
    errmsgcont = "Please upload OoC document.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
  var OoCNumber= $("#spnOoCNo").val();
  var OoCDate = $("#spnOoCDate").val(); 
  var OoCPcs = $("#txtOoCPcs").val();
  
  var boENumber=  $("#txtBOENo").val(); 
  var boEDate = $("#txtBOEDate").val(); 
  var boEPcs = $("#txtBOEPcsOoC").val(); 
  // $("#txtBOEGrWt").val(obj[0].BoE_GrossWt); 
  // $("#txtBOEChWt").val(obj[0].BoE_ChargeWt); 
  var boECAV = $("#txtBOECAV").val(); 
 var boECode =  $("#txtBOECode").val(); 

 var today = new Date(boEDate);
 var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

boEDate = dd + '/' + mm + '/' + yyyy + ' 00:00:00';
console.log(boEDate);

var today = new Date(OoCDate);
 var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

OoCDate = dd + '/' + mm + '/' + yyyy + ' 00:00:00';
console.log(OoCDate);

console.log(boENumber + ',' + boEDate + ',' + boEPcs + ',' + boECAV + ',' + CreatedByUserId + ',' + boECode + ',' + OrganizationId + ',' + OrganizationBranchId + ',' + ActualFileData );
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_INSERT_Update_OoC_Details",
    data: JSON.stringify(
      {
        "OperationType":OperatnType,
        "userid":CreatedByUserId,
        "OoCnumberXML":"",
        "strOutmsg":"",
        "OrganizationId":OrganizationId,
        "OrganizationBranchId":OrganizationBranchId,
        "BoENumber":boENumber,
        "BoEDate":boEDate,
        "BoE_NoP":boEPcs,
        "BoE_CAVValue":boECAV,
        "BoE_CHA_Code":boECode,
        "OoCType":"1",
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber,
        "IGMNo":IGMNo,
        "IGMYear":IGMYear,
        "OoCID":"0",
        "UniqueId":OoCuniqueId,
        "OOCNumber":OoCNumber,
        "OOCDate":OoCDate,
        "OoC_NoP":OoCPcs
 
      }),
  
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].Successmessage == undefined) {
            $("#tblAirWayBillInfo").fadeIn('slow');
            $("#tblAirWayBillInfo1").show();
            console.log(response);
           
            
           // fillDriverImage(response);
            $("body").mLoading('hide');
            // $.alert('Details saved successfully');
          }else{
            $("body").mLoading('hide');
            if(obj[0].OoCID){
              $("#btnSubmitOoC").attr('disabled', 'disabled');
              $("#btnSubmitOoC").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
              errmsg = "Alert</br>";
              errmsgcont = obj[0].Successmessage;
              $.alert(errmsg,errmsgcont);
            }else{
              $("#btnSubmitOoC").removeAttr('disabled');
              $("#btnSubmitOoC").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
            }
            ImportListingPageDetails('1', AirlinePrefix, AwbNumber, HawbNumber, IGMNo, IGMYear, CreatedByUserId, OrganizationBranchId, OrganizationId);
            getOoCDetails();
  
          }
        } else {
            $("body").mLoading('hide');
           
            errmsg = "Wrong MAWB number</br>";
            errmsgcont = "Please enter a valid BoE number</br>";
         //   $.alert(errmsg,errmsgcont);
            return;
        }
  
    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        alert('Server not responding...');
    }
  });
}
viewDocumentOoC = function(id){

 //alert(OOCID)
 $.ajax({
  type: 'POST',
  url: ACSServiceURL + "/ACS_Import_ViewJobDocument",
  data: JSON.stringify({
   "OperationType":"1",
     "BoEID":0,
     "OOCID":id,
     "Type":"OoC"
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
          $("#tblAirWayBillInfo").fadeIn('slow');
          $("#tblAirWayBillInfo1").show();
          console.log(response)
          $("#fileListOoC").hide(); 
          $("#fileDataOoC").show(); 
         
          $('#viewFileOoC').text(obj[0].DocumentName + ".pdf");
        
          $('#viewFileOoC').attr('href', obj[0].FilePath);


          OoCFilePath = obj[0].FilePath;
        
          $("body").mLoading('hide');
        }else{
           
          errmsg = "Alert</br>";
          errmsgcont = obj[0].ERRORMSG;
          // $.alert(errmsg,errmsgcont);
          return;

        }
      } else {
          $("body").mLoading('hide');
         
          errmsg = "Wrong MAWB number</br>";
          errmsgcont = "No valid Document</br>";
          //$.alert(errmsg,errmsgcont);
          return;
      }

  },
  error: function (xhr, textStatus, errorThrown) {
      $("body").mLoading('hide');
      alert('Server not responding...');
  }
});
}
viewFileOoC = function(){
  window.open(OoCFilePath);
  }
  viewFileBoE = function(){
    window.open(BoEFilePath);
    }
removePdfOoC = function(){
 var OOCID = localStorage.getItem('oocid');
 if(OOCID){
   $("#viewFileOoC").text("");
   removeDocumentOoC(OOCID);
 }
}
removeDocumentOoC = function(OOCID){
console.log(OOCID)
$.ajax({
type: 'POST',
url: ACSServiceURL + "/ACS_Import_ViewJobDocument",
data: JSON.stringify({
 "OperationType":"2",
   "BoEID":0,
   "OOCID":OOCID,
   "Type":"OoC"
   }),
contentType: "application/json; charset=utf-8",
dataType: "json",
success: function (response, xhr, textStatus) {

    var obj = JSON.parse(response.d);
   console.log(response.d);
   console.log(obj);
    if (obj.length > 0) {
      if (obj[0].StrMessage == undefined) {
        $("#tblAirWayBillInfo").fadeIn('slow');
        $("#tblAirWayBillInfo1").show();
        console.log(response)
  
      
        $("body").mLoading('hide');
      }else{
       $("#fileListOoC").show(); 
       $("#fileDataOoC").hide(); 
       $("body").mLoading('hide');
        errmsg = "Alert</br>";
        errmsgcont = obj[0].StrMessage;
         $.alert(errmsg,errmsgcont);
        return;

      }
    } else {
        $("body").mLoading('hide');
       
        errmsg = "Wrong MAWB number</br>";
        errmsgcont = "No valid Document</br>";
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
onDateChangeBoE = function(){
var boeDate = $("#txtBOEDate").val();
var boeNo = $("#txtBOENo").val();

var GivenDate = boeDate;
var CurrentDate = new Date();
GivenDate = new Date(GivenDate);

if(GivenDate > CurrentDate){
   // alert('Given date is greater than the current date.');
   errmsg = "Alert</br>";
   errmsgcont = "Given date is greater than the current date.";
   $.alert(errmsg,errmsgcont);
   return;
}


var today = new Date(boeDate);
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

dateandTime = yyyy + '-' + mm + '-' + dd + ' 00:00:00';
console.log(dateandTime);

$.ajax({
 type: 'POST',
 url: ACSServiceURL + "/ACS_Imp_BoE_OoC_CheckDataWithDate",
 data: JSON.stringify({ BoE_OoC_Number: boeNo, BoE_OoC_Date: dateandTime, Type: 'BOE'}),
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
         console.log(response);
         if( obj[0].IsExist == 1){
           $("#btnSubmitBoE").attr('disabled', 'disabled');
           $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
           errmsg = "BoE number</br>";
           errmsgcont = "Bill of Entry number already exists.</br>";
           $.alert(errmsg,errmsgcont);
           return;
         }
         $("#btnSubmitBoE").removeAttr('disabled');
         $("#btnSubmitBoE").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});

         // $("#BoEexist").text(obj[0].IsExist); 
         
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

onDateChangeOoC = function(){
 var oocDate = $("#spnOoCDate").val();
 var oocNo = $("#spnOoCNo").val();
 
 var GivenDate = oocDate;
 var CurrentDate = new Date();
 CurrentDate.setHours(0,0,0,0);
 GivenDate = new Date(GivenDate);
 if(GivenDate >= CurrentDate){
    console.log("working...")    
 }
else{
 errmsg = "Alert</br>";
 errmsgcont = "Given date is less than the current date.";
 $.alert(errmsg,errmsgcont);
 return;
}
 

var today = new Date(oocDate);
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

dateandTime = yyyy + '-' + mm + '-' + dd + ' 00:00:00';
console.log(dateandTime);
 $.ajax({
   type: 'POST',
   url: ACSServiceURL + "/ACS_Imp_BoE_OoC_CheckDataWithDate",
   data: JSON.stringify({ BoE_OoC_Number: oocNo, BoE_OoC_Date: dateandTime, Type: 'OOC'}),
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
           console.log(response);
           if( obj[0].IsExist == 1){
             $("#btnSubmitBoE").attr('disabled', 'disabled');
             $("#btnSubmitBoE").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
             errmsg = "BoE number</br>";
             errmsgcont = "BoE number already exists.</br>";
             $.alert(errmsg,errmsgcont);
             return;
           }
           $("#btnSubmitBoE").removeAttr('disabled');
           $("#btnSubmitBoE").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
 
           // $("#BoEexist").text(obj[0].IsExist); 
           
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

 savePickOrder = function(){

   var examPcs = parseInt($("#spnPcsExam").val());
   var totalPcs = parseInt($("#spnPkgs").text());
   if($("#spnPcsExam").val() == ""){
    errmsg = "Alert</br>";
    errmsgcont = "Please enter pieces for exam.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
  if($("#spnRemarks").val() == ""){
    errmsg = "Alert</br>";
    errmsgcont = "Please enter remarks.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
   if(examPcs > totalPcs){
     errmsg = "Alert</br>";
     errmsgcont = "Please enter valid pieces.</br>";
     $.alert(errmsg,errmsgcont);
     return;
   }

   $('body').mLoading({
    text: "Please Wait..",
    });

   if( HawbNumber == ""){
     var house =  ""; 
   }else
   var house =  HawbNumber; 
  
   var consigneeName=  $("#spnConsignee").text(); 
   var agentCode = $("#spnAgentCode").text(); 
   var NOG = $("#spnNoG").text(); 
   var examPieces=  $("#spnPcsExam").val(); 
   var remarks = $("#spnRemarks").val(); 
   var location = $("#spnLocation").text(); 
   var dateandTime = $("#spnFlightDateTime").text(); 
 
  var today = new Date(dateandTime);
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
 
 dateandTime = mm + '/' + dd + '/' + yyyy + ' 00:00:00';
 console.log(dateandTime);

   $.ajax({
     type: 'POST',
     url: ACSServiceURL + "/ACS_Imp_Insert_PickOrder_details",
     data: JSON.stringify(
       {
       "OperationType":"1",
 "AirlinePrefix":AirlinePrefix,
 "AwbNumber":AwbNumber,
 "PO_PickOrderDate":dateandTime,
 "ConsigneeName":consigneeName,
 "CHAOrgBranchID":"0",
 "CHAAgentCode":agentCode,
 "CHAAgentName":"",
 "NatureOfGoods":NOG,
 "ExamPieces":examPieces,
 "OriginCode":"",
 "LocationCode":location,
 "PickOrdExm_Remarks":remarks,
 "CreatedBy":CreatedByUserId,
 "HOUSE":house,
 "igmno":IGMNo,
 "OrganizationId":OrganizationId,
 "OrganizationBranchId":OrganizationBranchId,
 "sequenceno":""

       }),
       
     contentType: "application/json; charset=utf-8",
     dataType: "json",
     success: function (response, xhr, textStatus) {
         var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
         if (obj.length > 0) {
           if (obj[0].ErrorMessages == undefined) {
             $("#tblAirWayBillInfo").fadeIn('slow');
             $("#tblAirWayBillInfo1").show();
             console.log(response);
            
             
            // fillDriverImage(response);
             $("body").mLoading('hide');
             // $.alert('Details saved successfully');
           }else{
             if(obj[0].Sequensnumber){
               $("#btnPickorderSave").attr('disabled', 'disabled');
               $("#btnPickorderSave").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
             }else{
               $("#btnPickorderSave").removeAttr('disabled');
               $("#btnPickorderSave").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
             }

             ImportListingPageDetails('1', AirlinePrefix, AwbNumber, HawbNumber, IGMNo, IGMYear, CreatedByUserId, OrganizationBranchId, OrganizationId);
             $("body").mLoading('hide');
             errmsg = "Alert</br>";
             errmsgcont = obj[0].ErrorMessages;
             $.alert(errmsg,errmsgcont);
             return;

           }
         } else {
             $("body").mLoading('hide');
            
             errmsg = "Wrong MAWB number</br>";
             errmsgcont = "Please enter a valid BoE number</br>";
           //  $.alert(errmsg,errmsgcont);
             return;
         }
   
     },
     error: function (xhr, textStatus, errorThrown) {
         $("body").mLoading('hide');
         alert('Server not responding...');
     }
   });
 }

 getAsiDetails = function(){

   if( HawbNumber == ""){
     var house =  ""; 
   }else
   var house =  HawbNumber; 

   $.ajax({
     type: 'POST',
     url: ACSServiceURL + "/ACS_Imp_BoECharge_DetailsForASI",
     data: JSON.stringify(
       {
           "OperationType":"1",
           "AirlinePrefix":AirlinePrefix,
           "AwbNumber":AwbNumber,
           "HawbNumber":"",
           "CreatedByUserId":CreatedByUserId,
           "OrganizationId":OrganizationId,
           "OrganizationBranchId":OrganizationBranchId
       }),
       
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
             if(obj[0].IsACSChargesPaidByFF == "1"){
              getFFAsiDetails();
          
            }
            $("#orgName").hide();
            $("#accNo").hide();
            $("#bal").hide();
             $("#spnBalance").text(obj[0].ACSCurrentBalance); 
             $("#spnAcsCharge").text("AED " + (obj[0].Amount).toFixed(2)); 
            //  $("#spnCGST").text("INR " +  (obj[0].CGST).toFixed(2));
            //  $("#spnSGST").text("INR " +  (obj[0].SGST).toFixed(2)); 
            //  $("#spnIGST").text("INR " +  (obj[0].IGST).toFixed(2)); 
            //   console.log(obj[0].SGST)
            //   $("#spnGSTTotal").text("INR " +  ((obj[0].CGST + obj[0].SGST + obj[0].IGST)).toFixed(2));
             $("#spTotalPayable").text("AED " +  (obj[0].TotalAmount).toFixed(2));
             
             console.log(response);
             $("#spnGSTTotal").text("AED " +  (obj[0].CGST).toFixed(2)); 
             $("#spTotalPayable").text("AED " +  (obj[0].TotalAmount).toFixed(2)); 
          
           }else{
             $("body").mLoading('hide');
             errmsg = "Alert</br>";
             errmsgcont = obj[0].ERRORMSG;
             // $.alert(errmsg,errmsgcont);
             return;
   
           }
         } else {
             $("body").mLoading('hide');
             errmsg = "Wrong MAWB number</br>";
             errmsgcont = "Please enter a valid BoE number</br>";
        //     $.alert(errmsg,errmsgcont);
             return;
         }
   
     },
     error: function (xhr, textStatus, errorThrown) {
         $("body").mLoading('hide');
         alert('Server not responding...');
     }
   });
 }

 getFFAsiDetails = function(){

  if( HawbNumber == ""){
    var house =  ""; 
  }else
  var house =  HawbNumber; 
  var mawb = MAWBNo.replace("-", "")

  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_EXP_GetFFAccountDetails",
    data: JSON.stringify(
      {
          "MODE":"I",
          "AirlinePrefix":AirlinePrefix,
          "MAWBNumber":mawb,
          "HAWBNumber":house,
      }),
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].ERRORMSG == undefined) {
            $("#orgName").show();
            $("#accNo").show();
            $("#bal").show();
            $("#spnPDBalance").text(obj[0].Balance.toFixed(2)); 
            $("#spnPDAccountNo").text(obj[0].PDAccountNumber); 
            $("#spnOrgName").text(obj[0].Name); 
         
            
            console.log(response);
           
         
          }else{
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].ERRORMSG;
            // $.alert(errmsg,errmsgcont);
            return;
  
          }
        } else {
            $("body").mLoading('hide');
            errmsg = "Wrong MAWB number</br>";
            errmsgcont = "Please enter a valid BoE number</br>";
       //     $.alert(errmsg,errmsgcont);
            return;
        }
  
    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        alert('Server not responding...');
    }
  });
}
 SubmitAsiDetails = function(){
   $('body').mLoading({
     text: "Please Wait..",
 });
var totalAmount= ($("#spTotalPayable").text()).substring(4); 

   if( HawbNumber == ""){
     var house =  ""; 
   }else
   var house =  HawbNumber; 

   $.ajax({
     type: 'POST',
     url: ACSServiceURL + "/ACS_IMP_TO_CheckPDABalance",
     data: JSON.stringify(
       {
           "OperationType":"1",
           "AirlinePrefix":AirlinePrefix,
           "AwbNumber":AwbNumber,
           "HawbNumber":house,
           "OrganizationBranchId":OrganizationBranchId,
           "TotalAmountTobeDeducted":totalAmount,
           "strErrorMsg":""
       }),

     contentType: "application/json; charset=utf-8",
     dataType: "json",
     success: function (response, xhr, textStatus) {
         var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
         if (obj.length > 0) {
           if (obj[0].strErrorMsg == undefined) {
             
             console.log(response);
            
    
           }else{
             if(obj[0].strErrorMsg  == "OK."){               
               insertTransactionDetails();
              
             return;
             }else{
               $("body").mLoading('hide');
               errmsg = "Alert</br>";
               errmsgcont = obj[0].strErrorMsg;
               $.alert(errmsg,errmsgcont);
               return;
             }
   
           }
         } else {
             $("body").mLoading('hide');
            
             errmsg = "Wrong MAWB number</br>";
             errmsgcont = "Please enter a valid BoE number</br>";
          //   $.alert(errmsg,errmsgcont);
             return;
         }
   
     },
     error: function (xhr, textStatus, errorThrown) {
         $("body").mLoading('hide');
         alert('Server not responding...');
     }
   });
 }

 insertTransactionDetails = function(){

   if( HawbNumber == ""){
     var house =  ""; 
   }else
   var house =  HawbNumber; 

   $.ajax({
     type: 'POST',
     url: ACSServiceURL + "/ACS_Imp_Insert_TransactionEvents",
     data: JSON.stringify(
      
           {
             "strShipmentMode":"IMP",
             "intFFJObId":"0",
             "intFWDJObId":"0",
             "strCHAJobId":"",
             "strCHACOOId":"",
             "strCHACARRId":"",
             "AirlinePrefix":AirlinePrefix,
             "AwbNumber":AwbNumber,
             "HawbNumber":house,
             "strUserIPAddress":"",
             "strShipperName":"",
             "strConsigneeName":"",
             "CreatedByUserId":CreatedByUserId,
             "OrganizationId":OrganizationId,
             "OrganizationBranchId":OrganizationBranchId,
             "strErrorMsg":""
             
       }),
       
     contentType: "application/json; charset=utf-8",
     dataType: "json",
     success: function (response, xhr, textStatus) {
         var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
         if (obj.length > 0) {
           if (obj[0].strErrorMsg == undefined) {
             $("#tblAirWayBillInfo").fadeIn('slow');
             $("#tblAirWayBillInfo1").show();
         
             
             console.log(response);
           }else{
             errmsg = "Alert</br>";
             errmsgcont = obj[0].strErrorMsg;
             insertBoEASIDetails();
             // $.alert(errmsg,errmsgcont);
             return;
   
           }
         } else {
             $("body").mLoading('hide');
             errmsg = "Wrong MAWB number</br>";
             errmsgcont = "Please enter a valid BoE number</br>";
      //       $.alert(errmsg,errmsgcont);
             return;
         }
   
     },
     error: function (xhr, textStatus, errorThrown) {
         $("body").mLoading('hide');
         alert('Server not responding...');
     }
   });
 }

 insertBoEASIDetails = function(){
 

   if( HawbNumber == ""){
     var house =  ""; 
   }else
   var house =  HawbNumber; 

 var decTotalAmount = parseFloat($("#spnAcsCharge").text().substring(4)).toFixed(2);
 var decTotalTax = parseFloat($("#spnGSTTotal").text().substring(4)).toFixed(2);
 var decTotalRcptAmount = parseFloat($("#spTotalPayable").text().substring(4)).toFixed(2);

 var _boEDate = $("#txtBOEDate").val(); 
 var _boENumber = $("#txtBOENo").val();

var today = new Date(_boEDate);
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

_boEDate = mm + '/' + dd + '/' + yyyy + ' 00:00:00';
console.log(_boEDate);

console.log(decTotalAmount + ',' + decTotalTax + ',' + decTotalRcptAmount + ',' + AirlinePrefix + ',' + AwbNumber + ',' + house + ',' + CreatedByUserId + ',' + OrganizationId + ',' + OrganizationBranchId + ',' + _boENumber + ',' + _boEDate);
   $.ajax({
     type: 'POST',
     url: ACSServiceURL + "/ACS_Imp_Insert_BoEASIDetails",
     data: JSON.stringify(
      {
        "strShipmentMode":"IMP",
        "chrPaymentMode":"P",
        "BaseStation":"SHJ",
        "decTotalAmount":0,
        "decTotalTax":0,
        "decTotalRcptAmount":0,
        "intFFJObId":"0",
        "intFWDJObId":"0",
        "strCHAJobId":"",
        "strCHACOOId":"",
        "strCHACARRId":"ASI",
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":"",
        "strUserIPAddress":"",
        "strShipperName":"",
        "strConsigneeName":"",
        "CreatedByUserId":CreatedByUserId,
        "OrganizationId":OrganizationId,
        "OrganizationBranchId":OrganizationBranchId,
        "strReceiptRegisterXML":"",
        "BoENumber":"",
        "BoEDate":"",
        "strErrorMsg":""
      
  }),
       
     contentType: "application/json; charset=utf-8",
     dataType: "json",
     success: function (response, xhr, textStatus) {
         var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
         if (obj.length > 0) {
           if (obj[0].strErrorMsg == undefined) {
             $("#tblAirWayBillInfo").fadeIn('slow');
             $("#tblAirWayBillInfo1").show();
           
             console.log(response);
            
           }else{
             if(obj[0].ReceiptNumber){
               $("#btnSubmitAsi").attr('disabled', 'disabled');
               $("#btnSubmitAsi").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
             }else{
               $("#btnSubmitAsi").removeAttr('disabled');
               $("#btnSubmitAsi").css({ "background-color": "#03b6ae", "color": "white" , "border-color": "#03b6ae"});
             }
             ImportListingPageDetails('1', AirlinePrefix, AwbNumber, HawbNumber, IGMNo, IGMYear, CreatedByUserId, OrganizationBranchId, OrganizationId);
             $("body").mLoading('hide');
             errmsg = "Alert</br>";
             errmsgcont = obj[0].strErrorMsg;
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
             errmsgcont = "Please enter a valid BoE number</br>";
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

 getDocumentStorePath = function(){

   console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
   $.ajax({
   type: 'POST',
   url: ACSServiceURL + "/ACS_Imp_get_DocumentStorPath",
   data: JSON.stringify({"ParameterCode":"DocumentStorePath"}),
   contentType: "application/json; charset=utf-8",
   dataType: "json",
   success: function (response, xhr, textStatus) {
       var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
       if (obj.length > 0) {
         if (obj[0].ERRORMSG == undefined) {
       documentStorePath = obj[0].ParameterValue;
           console.log(response)
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

var DOstatusMaster;
var DOstatusHouse;
  FillMasterData = function(){
    $("#masterData").show();
    $("#masterData").empty();

    var boENum=  $("#txtBOENo").val(); 

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_TSPGetDetails_SAS",
    data: JSON.stringify({
        "OperationType":1,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":"", //IF HAWB IS THERE THEN SEND
        "IGMNo":0,
        "IGMYear":0,
        "BoENumber":0,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CommodityGroup":"",
        "CommodityName":"",
        "MAWBID":0,
        "HAWBID":0
        }
        
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
      console.log(response.d);
      console.log(obj);
      var count = 0;
      var row = "";
       if (obj.length > 0) {
        var MAWBNo = obj[0].MAWBNo;
         if (obj[0].HAWBNo == null) {
          if(obj[0].IHM_DONO != null){
            DOstatusMaster = "true";
          var DOnum = obj[0].IHM_DONO;
          }else{
          var DOnum = "";}
                row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important;padding: 5px 5px;'>";
                row += " <div onclick='goToMasterDetails(" + MAWBNo+ ")'>";
              
                row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + MAWBNo+ "&nbsp;&nbsp;&nbsp;&nbsp;" + DOnum+ "</h5>";
                row += " <button id='' class='btn-arrow' style= 'float:right;margin :3px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                row += " </div>";
                row += " </div>";
                
         }else{
          if(obj[0].IHM_DONO != null){
            DOstatusMaster = "true";
          var DOnum = obj[0].IHM_DONO;
          }else{
          var DOnum = "";}
          
                row += " <div class= 'div-wrapper' id='master' style= 'background-color:#03b6ae !important'>";
                row += " <div onclick='goToMasterDetails(" + MAWBNo+ ")'>";
              
              
                // row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + MAWBNo+ "</h5>";
                // row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + DOnum+ "</h5>";
                // row += " <button id='' class='btn-arrow' style= 'float:right;margin :3px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                row += "<div class='contacts row contacts__itemfortext1' style='height:52px;'>";
                row += "<div class='col-5' id ='lblSbDate'>";
                row += "<div class='form-group vtMargin'>";
                row += "<h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin-top:10px !important'>" + MAWBNo+ "</h5>"
                row += "</div>";
                row += "</div>";
                row += "<div class='col-4' style=''>";
                row += "<div class='form-group'>";
                if(DOLevel == "DOHAWBLevel")           
                row += "<h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin-top:8px !important'></h5>"
                else
                row += "<h5 class='primary-heading' style='padding: 10px 0px;display: inline-flex;color:white;font-size: 13px;margin-top:8px !important'>" + DOnum+ "</h5>"
                row += "</div>";
                row += "</div>";
                row += "<div class='col-3' style='text-align: right;'>";
                row += "<div class='form-group'>";
                row += "<button id='' class='btn-arrow' style= 'float:right;margin :10px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>"
                row += " </div>";
                row += "</div>";
                row += "</div>";
                row += " </div>";
                row += " </div>";

               $.each(obj, function (i, d) {
                if(d.IHM_DONO != null){
                DOstatusHouse = "true";
                var DOnumber =  d.IHM_DONO;
                }else{
                var DOnumber = "";}
                var house = '"' + d.HAWBNo + '"';
                var hid = '"' + d.HID + '"';
                row += " <div class= 'div-wrapper' id='house' style= 'background-color:#03b6ae !important'>";
                row += " <div onclick='goToHouseDetails(" + house+ ", " + hid+ ")'>";
              
                row += "<div class='contacts row contacts__itemfortext1' style='height:52px;'>";
                row += "<div class='col-5' id ='lblSbDate'>";
                row += "<div class='form-group vtMargin'>";
                row += "<h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin-top:10px !important'>" +  d.HAWBNo + "</h5>"
                row += "</div>";
                row += "</div>";
                row += "<div class='col-4' style=''>";
                row += "<div class='form-group'>";
                row += "<h5 class='primary-heading' style='padding: 10px 0px;display: inline-flex;color:white;font-size: 13px;margin-top:8px !important'>" + DOnumber + "</h5>"
                row += "</div>";
                row += "</div>";
                row += "<div class='col-3' style='text-align: right;'>";
                row += "<div class='form-group'>";
                row += "<button id='' class='btn-arrow' style= 'float:right;margin :10px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>"
                row += " </div>";
                row += "</div>";
                row += "</div>";
                row += " </div>";
                row += " </div>";
                  
                
                  count++;
                      
              });
         }
       
         $("#masterData").append(row);
              $("body").mLoading('hide');
       } else {
           $("body").mLoading('hide');
          
           errmsg = "Wrong MAWB number</br>";
           errmsgcont = "Please enter a valid BoE number</br>";
       //    $.alert(errmsg,errmsgcont);
           return;
       }
 
   },
   error: function (xhr, textStatus, errorThrown) {
       $("body").mLoading('hide');
       alert('Server not responding...');
   }
 });

        } 
      

        goToMasterDetails = function (number) {
          console.log(number);
          localStorage.setItem('hawbNo', "");
          localStorage.setItem('isHouse', false);
  
           if(DOLevel == "DOHAWBLevel")  {
              errmsg = "Alert</br>";
              errmsgcont = "DO generated at HAWB level</br>";
              $.alert(errmsg,errmsgcont);
              return;  
            }else
              window.location.href = 'IMP_DOPaymentFromMenu.html';
 
      }
    
        goToHouseDetails = function (number, id) {
        
          localStorage.setItem('hawbNo', number);
          localStorage.setItem('HawbRowId', id);
          localStorage.setItem('isHouse', true);
           console.log(number);
          //  if(DOstatus == "Completed"){
          //   window.location.href = 'IMP_DOPayment.html';
          //  }
          // else 
          if(DOLevel == "DOMAWBLevel")  {
            errmsg = "Alert</br>";
            errmsgcont = "DO generated at MAWB level</br>";
            $.alert(errmsg,errmsgcont);
            return;  
          }else
          window.location.href = 'IMP_DOPaymentFromMenu.html';

    }
  getTspDetails = function(){
   var element = document.getElementById("heading6"); 
   var text = element.getAttribute("aria-expanded");
  // alert(text)

  if(text == "true"){
    if(asistatus == "Completed"){
        $('body').mLoading({
          text: "Please Wait..",
        });
              // if(DOstatus == "Approved"){
              //   var CommodityGroup = "";
              //   var CommodityName = "";
              FillMasterData();
              // }else{
              //   getCTOStatusDetails();
              // }
    }else{
          var disablePanel = true;  //or falsey value
          $("#accordionTSP").on('hide.bs.collapse show.bs.collapse',  PanelEvent);

    }    
  }
  function PanelEvent(e){
    $self = (this);  
    if(disablePanel){    
    e.preventDefault();    // this is the trick
    console.log("panel should not behave");
   }
  else{
    console.log("panel opens or closes!");
   }
  };
  }

   
 getTSPDetailsMABB = function(CommodityGroup,CommodityName){
  $('body').mLoading({
    text: "Please Wait..",
});
$("#viewList").empty();
  var boENum=  $("#txtBOENo").val(); 

  console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
  type: 'POST',
  url: ACSServiceURL + "/ACS_IMP_TSPGetDetails",
  data: JSON.stringify({
      "OperationType":1,
      "AirlinePrefix":AirlinePrefix,
      "AwbNumber":AwbNumber,
      "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
      "IGMNo":0,
      "IGMYear":0,
      "BoENumber":boENum,
      "CreatedByUserId":CreatedByUserId,
      "OrganizationBranchId":OrganizationBranchId,
      "OrganizationId":OrganizationId,
      "CommodityGroup":CommodityGroup,
      "CommodityName":CommodityName
      }
      
    ),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (response, xhr, textStatus) {
      var input = response.d;
      console.log(response.d);
      $("body").mLoading('hide');
          const [clientXml, id] = input.split('~');
          console.log(clientXml); 
          console.log(id);
          var fields = id.split('=');
          console.log(fields[1]);
          var payTspId = fields[1];
          localStorage.setItem('payTspId', payTspId);
          var obj = JSON.parse(clientXml);
          console.log(obj);
      console.log(obj.Status);
      if (obj.ErrorMessage == "" || obj.ErrorMessage == null) {
      $("#PDAccNo").text(obj["ReceiptDetails"].PDAccountNo); 
      $("#CTOPDBalance").text((obj["ReceiptDetails"].PDBalance).toFixed(2));  
      $("#TSPPayAmount").text((obj["ReceiptDetails"].PayableAmount).toFixed(2)); 
      $("#payMode").text(obj["ReceiptDetails"].PaymentMode); 
          var count = 0;
          var row = "";

      
        
          if (obj["ChargeDetails"].length > 0) {
            for(i = 0; i< obj["ChargeDetails"].length ; i++){
              
              row += " <tr class=''>";
              row += "<td>" + obj["ChargeDetails"][i].ChargeDescription + "</td>";
              row += "<td>" + (obj["ChargeDetails"][i].TotalAmount).toFixed(2) + "</td>";
              var gstAmount = obj["ChargeDetails"][i].CGSTAmount + obj["ChargeDetails"][i].IGSTAmount + obj["ChargeDetails"][i].SGSTAmount + obj["ChargeDetails"][i].UTGSTAmount;
              row += "<td>" + (gstAmount).toFixed(2) + "</td>";
              var totalAmt = gstAmount + (obj["ChargeDetails"][i].TotalAmount);
              row += "<td>" + totalAmt.toFixed(2) + "</td>";
              row += "</tr>";
             
              count++;
            }
              $("#viewList").append(row);
            } else {
                $("#viewList").html('There are no records').css('color', '#f7347a');
            }
      
          // console.log(response);
          // $("#ddlCommodityTypeList").html('<option>' + obj[0].CargoType + '</option>'); 
          // $("#ddlCommodityNameList").html('<option>' + obj[0].CommodityName + '</option>'); 
          // $("#HSNCode").val(obj[0].HSNCode); 
          // $("#payMode").text(obj[0].PaymentMode); 
          // $("#CTOPDBalance").text($(xml).find('PDBalance').text()); 
          // $("#TSPPayAmount").text($(xml).find('PayableAmount').text()); 
          
          // fillDriverImage(response);
          $("body").mLoading('hide');
          // $.alert('Details saved successfully');
        }else{
          $("#btnSubmitTSP").attr('disabled', 'disabled');
          $("#btnSubmitTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
          
          errmsg = "Alert</br>";
          errmsgcont = obj.ErrorMessage;
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
  getTSPDetailsAISATS = function(CommodityGroup,CommodityName){
    $('body').mLoading({
      text: "Please Wait..",
  });
  $("#viewList").empty();
    var boENum=  $("#txtBOENo").val(); 
 
    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_TSPGetDetails",
    data: JSON.stringify({
        "OperationType":1,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
        "IGMNo":IGMNo,
        "IGMYear":IGMYear,
        "BoENumber":boENum,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CommodityGroup":CommodityGroup,
        "CommodityName":CommodityName
        }
        
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var input = response.d;
        console.log(response.d);
        $("body").mLoading('hide');
            const [clientXml, id] = input.split('~');
            console.log(clientXml); 
            console.log(id);
            var fields = id.split('=');
            console.log(fields[1]);
            var payTspId = fields[1];
            localStorage.setItem('payTspId', payTspId);
            var obj = JSON.parse(clientXml);
            console.log(obj);
            if (obj["IMPCHGCALCULATIONRESPONSE"][0].errorMessage == "" || obj["IMPCHGCALCULATIONRESPONSE"][0].errorMessage == null) {
            console.log(obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails);
            console.log(obj["IMPCHGCALCULATIONRESPONSE"][0].receiptDetails.pdAccountNo);
            console.log(obj["IMPCHGCALCULATIONRESPONSE"][0].status);
            $("#PDAccNo").text(obj["IMPCHGCALCULATIONRESPONSE"][0].receiptDetails.pdAccountNo);
            $("#CTOPDBalance").text((obj["IMPCHGCALCULATIONRESPONSE"][0].receiptDetails.pdBalance).toFixed(2));  
            $("#TSPPayAmount").text((obj["IMPCHGCALCULATIONRESPONSE"][0].receiptDetails.payableAmount).toFixed(2));  
            $("#payMode").text(obj["IMPCHGCALCULATIONRESPONSE"][0].receiptDetails.paymentMode); 
            var count = 0;
            var row = "";
 
         
          
            if ((obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails).length > 0) {
              for(i = 0; i< (obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails).length ; i++){
                
                row += " <tr class=''>";
                row += "<td>" + obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].chargeDescription + "</td>";
                row += "<td>" + (obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].totalAmount).toFixed(2) + "</td>";
                var gstAmount = obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].cgstAmount + obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].sgstAmount + obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].igstAmount + obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].utgstAmount;
                row += "<td>" + (gstAmount).toFixed(2) + "</td>";
                var totalAmt = obj["IMPCHGCALCULATIONRESPONSE"][0].chargeDetails[i].totalAmount + gstAmount;
                row += "<td>" + totalAmt.toFixed(2) + "</td>";
                row += "</tr>";
               
                count++;
              }
                $("#viewList").append(row);
              } else {
                  $("#viewList").html('There are no records').css('color', '#f7347a');
              }
        
            // console.log(response);
            // $("#ddlCommodityTypeList").html('<option>' + obj[0].CargoType + '</option>'); 
            // $("#ddlCommodityNameList").html('<option>' + obj[0].CommodityName + '</option>'); 
            // $("#HSNCode").val(obj[0].HSNCode); 
            // $("#payMode").text(obj[0].PaymentMode); 
            // $("#CTOPDBalance").text($(xml).find('PDBalance').text()); 
            // $("#TSPPayAmount").text($(xml).find('PayableAmount').text()); 
            
            // fillDriverImage(response);
            $("body").mLoading('hide');
            // $.alert('Details saved successfully');
          }else{
            $("#btnSubmitTSP").attr('disabled', 'disabled');
            $("#btnSubmitTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
            errmsg = "Alert</br>";
            errmsgcont = obj["IMPCHGCALCULATIONRESPONSE"][0].errorMessage;
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
  getTSPDetailsKaleGHA = function(CommodityGroup,CommodityName){
    $('body').mLoading({
      text: "Please Wait..",
  });
  $("#viewList").empty();
    var boENum=  $("#txtBOENo").val(); 

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_TSPGetDetails",
    data: JSON.stringify({
        "OperationType":1,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
        "IGMNo":IGMNo,
        "IGMYear":IGMYear,
        "BoENumber":boENum,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CommodityGroup":CommodityGroup,
        "CommodityName":CommodityName
        }
        
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {

      var obj = JSON.parse(response.d);
     console.log(response.d);
     console.log(obj);
      if (obj.length > 0) {
        if (obj[0].Msg == undefined) {

          console.log(response);
          $("#HSNCode").val(obj[0].HSNCode); 
          $("#PDAccNo").text(obj[0].PDAccountNo);
          $("#payMode").text(obj[0].PaymentMode);
          $("#CTOPDBalance").text((obj[0].PDBalance).toFixed(2));
          $("#TSPPayAmount").text((obj[0].PayableAmount).toFixed(2));

          // var ClientResponseXML = "<?xml version='1.0' encoding='utf-16'?><clsImpCalculationResponse xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'><ReceiptDetails><PaymentMode>PDA</PaymentMode><PDAccountNo>123</PDAccountNo><TotalAmount>1100.25</TotalAmount><TotalTax>198.25</TotalTax><AdjustableAmount>0</AdjustableAmount><PayableAmount>1280.25</PayableAmount><PaidBy /><CreatedBy>ACS</CreatedBy><CreatedOn>2022-03-14T19:42:58.2960483+05:30</CreatedOn><Pieces>30</Pieces><GrossWeight>300.000</GrossWeight><ChargeableWeight>300.000</ChargeableWeight><PDBalance>10000</PDBalance><CommodityGroup>GEN</CommodityGroup><CommodityDesc>AUTO PARTS</CommodityDesc></ReceiptDetails><ChargeDetails><clsImpChargeCalculationResponse><ChargeCode>TER</ChargeCode><ChargeDescription>Terminal Charge</ChargeDescription><TotalAmount>800</TotalAmount><TaxAmount>144</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>STP</ChargeCode><ChargeDescription>Strapping Charge</ChargeDescription><TotalAmount>200</TotalAmount><TaxAmount>36</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>DEM</ChargeCode><ChargeDescription>Demurrage Charges</ChargeDescription><TotalAmount>100</TotalAmount><TaxAmount>18</TaxAmount><TaxCode /></clsImpChargeCalculationResponse></ChargeDetails><Status>0</Status></clsImpCalculationResponse>"
  
          //   xmlDoc = $.parseXML(ClientResponseXML);
            
          //   console.log(xmlDoc);
         
            // $("#tblChargeDetails").show(); 
            // $("#proceedBtn").hide(); 
            
            var row = "";
            row += " <tr class=''>";

            // $eventItem = $(xmlDoc).find("clsImpChargeCalculationResponse");  
  
            //$eventItem.each(function(index, element) {     
                row += "<td>" + obj[0].TChargeDescription + "</td>"; 
                row += "<td>" + parseInt(obj[0].TTotalAmount).toFixed(2) + "</td>";
                row += "<td>" + parseInt(obj[0].TTaxAmount).toFixed(2) + "</td>";
                var a = obj[0].TTotalAmount;
                var b = obj[0].TTaxAmount;
                var totalT = parseInt(a) + parseInt(b);
                row += "<td>" + totalT.toFixed(2)+ "</td>";
                row += "</tr>";  

                row += " <tr class=''>";
                row += "<td>" + obj[0].SChargeDescription + "</td>";
                row += "<td>" + parseInt(obj[0].STotalAmount).toFixed(2) + "</td>";
                row += "<td>" + parseInt(obj[0].STaxAmount).toFixed(2) + "</td>";
                var a = obj[0].STotalAmount;
                var b = obj[0].STaxAmount;
                var totalS = parseInt(a) + parseInt(b);
                row += "<td>" + totalS.toFixed(2)+ "</td>";
                row += "</tr>"; 


                row += " <tr class=''>";
                row += "<td>" + obj[0].DChargeDescription + "</td>";
                row += "<td>" + parseInt(obj[0].DTotalAmount).toFixed(2) + "</td>";
                row += "<td>" + parseInt(obj[0].DTaxAmount).toFixed(2) + "</td>";
                var a = obj[0].DTotalAmount;
                var b = obj[0].DTaxAmount;
                var totalD = parseInt(a) + parseInt(b);
                row += "<td>" + totalD.toFixed(2)+ "</td>";
                row += "</tr>"; 
 
            //});
                 
            $("#viewList").append(row);
            $("body").mLoading('hide');
 
          //getTSPDetailsKaleGHAXML();
            $("body").mLoading('hide');
        }else{
          $("#btnSubmitTSP").attr('disabled', 'disabled');
          $("#btnSubmitTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
         $("body").mLoading('hide');
          errmsg = "Alert</br>";
          errmsgcont = obj[0].Msg;
           $.alert(errmsg,errmsgcont);
          return;
  
        }
      } else {
          $("body").mLoading('hide');
         
          errmsg = "Wrong MAWB number</br>";
          errmsgcont = "No valid Document</br>";
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
  getTSPDetailsKaleGHAXML = function(CommodityGroup,CommodityName){
    $('body').mLoading({
      text: "Please Wait..",
  });
  $("#viewList").empty();
    var boENum=  $("#txtBOENo").val(); 

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_TSPGetDetails",
    data: JSON.stringify({
        "OperationType":1,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
        "IGMNo":IGMNo,
        "IGMYear":IGMYear,
        "BoENumber":boENum,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CommodityGroup":CommodityGroup,
        "CommodityName":CommodityName
        }
        
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {

      var obj = JSON.parse(response.d);
     console.log(response.d);
     console.log(obj);
      if (obj.length > 0) {
        if (obj[0].StrMessage == undefined) {

          var ClientResponseXML = "<ReceiptDetails><PaymentMode>PDA</PaymentMode><PDAccountNo>123</PDAccountNo><TotalAmount>1100.25</TotalAmount><TotalTax>198.25</TotalTax><AdjustableAmount>0</AdjustableAmount><PayableAmount>1280.25</PayableAmount><PaidBy /><CreatedBy>ACS</CreatedBy><CreatedOn>2022-03-14T19:42:58.2960483+05:30</CreatedOn><Pieces>30</Pieces><GrossWeight>300.000</GrossWeight><ChargeableWeight>300.000</ChargeableWeight><PDBalance>10000</PDBalance><CommodityGroup>GEN</CommodityGroup><CommodityDesc>AUTO PARTS</CommodityDesc></ReceiptDetails><ChargeDetails><clsImpChargeCalculationResponse><ChargeCode>TER</ChargeCode><ChargeDescription>Terminal Charge</ChargeDescription><TotalAmount>800</TotalAmount><TaxAmount>144</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>STP</ChargeCode><ChargeDescription>Strapping Charge</ChargeDescription><TotalAmount>200</TotalAmount><TaxAmount>36</TaxAmount><TaxCode /></clsImpChargeCalculationResponse><clsImpChargeCalculationResponse><ChargeCode>DEM</ChargeCode><ChargeDescription>Demurrage Charges</ChargeDescription><TotalAmount>100</TotalAmount><TaxAmount>18</TaxAmount><TaxCode /></clsImpChargeCalculationResponse></ChargeDetails><Status>0</Status></clsImpCalculationResponse>"
   
          console.log(response);
     
            xmlDoc = $.parseXML(ClientResponseXML),
            
         
            // $("#tblChargeDetails").show(); 
            // $("#proceedBtn").hide(); 
            // $("#passwordTag").hide(); 
            
            
            $("#btnPayTSP").attr('disabled', 'disabled'); 
            $("#btnPayTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 
            var row = "";
            row += " <tr class=''>";

            $eventItem = $(xmlDoc).find("clsImpChargeCalculationResponse");  
  
            $eventItem.each(function(index, element) {     
                row += "<td>" + ($(element).find('ChargeDescription').text()) + "</td>";
                row += "<td>" + ($(element).find('TotalAmount').text()) + "</td>";
                row += "<td>" + ($(element).find('TaxAmount').text()) + "</td>";
                var totalAmt = $(element).find('TotalAmount').text().toString() + $(element).find('TaxAmount').text().toString();
                row += "<td>" + totalAmt + "</td>";
                row += "</tr>";  
            });
                 
            $("#viewList").append(row);
            $("body").mLoading('hide');
        }else{
         $("#fileListOoC").show(); 
         $("#fileDataOoC").hide(); 
         $("body").mLoading('hide');
          errmsg = "Alert</br>";
          errmsgcont = obj[0].StrMessage;
           $.alert(errmsg,errmsgcont);
          return;
  
        }
      } else {
          $("body").mLoading('hide');
         
          errmsg = "Wrong MAWB number</br>";
          errmsgcont = "No valid Document</br>";
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
  getTSPDetailsApproved = function(CommodityGroup,CommodityName){
    $('body').mLoading({
      text: "Please Wait..",
  });

  $("#viewList").empty();
    var boENum=  $("#txtBOENo").val(); 

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_TSPGetDetails",
    data: JSON.stringify({
        "OperationType":1,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber, //IF HAWB IS THERE THEN SEND
        "IGMNo":0,
        "IGMYear":0,
        "BoENumber":boENum,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "CommodityGroup":CommodityGroup,
        "CommodityName":CommodityName
        }
        
      ),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
     console.log(response.d);
     console.log(obj);
      if (obj.length > 0) {
        if (obj[0].strErrorMsg == undefined) {
           xmlDoc = $.parseXML( obj[0].ClientResponseXML),
            $("#ddlCommodityTypeList").html('<option>' + obj[0].CargoType + '</option>'); 
            $("#ddlCommodityNameList").html('<option>' + $(xmlDoc).find('CommodityDesc').text() + '</option>'); 
            $("#HSNCode").val(obj[0].HSNCode).attr('disabled','disabled');
            $("#payMode").text(obj[0].PaymentMode); 
           
            
  
            $("#PDAccNo").text($(xmlDoc).find('PDAccountNo').text()); 
            $("#CTOPDBalance").text(Number($(xmlDoc).find('PDBalance').text()).toFixed(2)); 
            $("#TSPPayAmount").text(Number($(xmlDoc).find('PayableAmount').text()).toFixed(2)); 
         
            $("#tblChargeDetails").show(); 
            $("#proceedBtn").hide(); 
            $("#passwordTag").hide(); 
            
            
            $("#btnPayTSP").attr('disabled', 'disabled'); 
            $("#btnPayTSP").css({ "background-color": "lightgrey", "color": "#585a5d" , "border-color": "grey"}); 

            if(CTOName == "KALE_GHA"){
              $eventItem = $(xmlDoc).find("clsImpChargeDetails");  
            }else{
              $eventItem = $(xmlDoc).find("clsChargeDetails");  
            }
            var row = "";
            row += " <tr class=''>";
            $eventItem.each(function(index, element) {     
                row += "<td>" + ($(element).find('ChargeDescription').text()) + "</td>";
                row += "<td>" + parseInt($(element).find('TotalAmount').text()).toFixed(2) + "</td>";
                row += "<td>" + parseInt($(element).find('TaxAmount').text()).toFixed(2) + "</td>";
                var a = $(element).find('TotalAmount').text();
                var b = $(element).find('TaxAmount').text();
                var totalAmt = parseInt(a) + parseInt(b);
              
                row += "<td>" + totalAmt.toFixed(2) + "</td>";
                row += "</tr>";  
            });
                 
            $("#viewList").append(row);
            $("body").mLoading('hide');
        }else{
         
          $("body").mLoading('hide');
          errmsg = "Alert</br>";
          errmsgcont = obj[0].strErrorMsg;
          $.alert(errmsg,errmsgcont);
          return;

        }
      } else {
          $("body").mLoading('hide');
         
          errmsg = "Wrong MAWB number</br>";
          errmsgcont = "Please enter a valid BoE number</br>";
        //  $.alert(errmsg,errmsgcont);
          return;
      }

  },
  error: function (xhr, textStatus, errorThrown) {
      $("body").mLoading('hide');
      alert('Server not responding...');
  }
  });
  }
  PayTSPDetails = function(){

    if($("#HSNCode").val() == "" ){
      $("body").mLoading('hide');
      errmsg = "Message</br>";
      errmsgcont = "Please enter HSN Code.</br>";
      $.alert(errmsg,errmsgcont);
      return;
    }

    if($("#tspPassword").val() == "" ){
      $("body").mLoading('hide');
      errmsg = "Alert</br>";
      errmsgcont = "Please enter transaction password.</br>";
      $.alert(errmsg,errmsgcont);
      return;
    }
    $('body').mLoading({
      text: "Please Wait..",
  });
   var boENumber=  $("#txtBOENo").val(); 
    var boEDate = $("#txtBOEDate").val(); 
    var boEPcs = $("#txtBOEPcs").val(); 
    var boEGrWt = $("#txtBOEGrWt").val(); 
    var boEChWt = $("#txtBOEChWt").val();
    var HSNCode = $("#HSNCode").val(); 
    var password = $("#tspPassword").val(); 
    var RequestID = localStorage.getItem('payTspId');
    if(RequestID == null || RequestID == ""){
      RequestID = "12345";
    }
   var commodityType = $('#ddlCommodityTypeList :selected').text();
  var commodityTypeId = $('#ddlCommodityNameList :selected').val();
  var commodityName = $('#ddlCommodityNameList :selected').text();
  var fields = commodityName.split(': ');
                  console.log(fields[1]);
                  var CommodityGroup = fields[1];
    $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_IMP_Insert_OR_Pay_TSPDetails",
      data: JSON.stringify(
        {
          "OperationType":1,
          "AirlinePrefix":AirlinePrefix,
          "AwbNumber":AwbNumber,
          "HawbNumber":HawbNumber,
          "IGMNo":IGMNo,
          "IGMYear":IGMYear,
          "BoENumber":boENumber,
          "CreatedByUserId":CreatedByUserId,
          "OrganizationBranchId":OrganizationBranchId,
          "OrganizationId":OrganizationId,
          "CommodityGroup":CommodityGroup,
          "CommodityName":commodityName,
          "mode":"I",
          "BoERcvPices":boEPcs,
          "BoERCVDGRWt":boEGrWt,
          "BoEChWt":boEChWt,
          "HSNCode":HSNCode,
          "CommodityTypeID":commodityTypeId,
          "BoEID":BOEID,
          "RequestID":RequestID,
          "CalculationResponse":"",
          "Transactionpassword":password
          }),
      
          
          
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          if (obj[0].StrMessage == undefined) {
            console.log(response);
            $("body").mLoading('hide');
          }else{
            if(obj[0].StrMessage == "Transaction password is invalid."){
              $("body").mLoading('hide');
              errmsg = "Alert</br>";
              errmsgcont = obj[0].StrMessage;
              $.alert(errmsg,errmsgcont);
              return;
            }else{
            ImportListingPageDetails('1', AirlinePrefix, AwbNumber, HawbNumber, IGMNo, IGMYear, CreatedByUserId, OrganizationBranchId, OrganizationId);
            getTSPDetailsApproved(CommodityGroup,commodityName);
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].StrMessage;
            $.alert(errmsg,errmsgcont);
            return;
            }
          }
        } else {
            $("body").mLoading('hide');
            errmsg = "Wrong MAWB number</br>";
            errmsgcont = "Please enter a valid BoE number</br>";
            //$.alert(errmsg,errmsgcont);
            return;
        }
  
    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        alert('Server not responding...');
    }
  });
  }

  getCTOStatusDetails = function(){
    
    var boENum=  $("#txtBOENo").val(); 
    if(boENum == "" || boENum == undefined || boENum == null){
      boENum = 0;
    }

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_spAWB_GET_CTOStatus",
    data: JSON.stringify({
      "OperationType": 1,
      "AirlinePrefix":AirlinePrefix,
      "AwbNumber":AwbNumber,
      "HawbNumber":HawbNumber,
      "BoENumber":boENum,
      "Message":""
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
            console.log(response)

            checkCommodityNameandGroup();
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
  proceedTSPDetails = function(){
    if($("#viewList").val() == ""){
      $("#tblChargeDetails").show(); 
    }else{
      $("#tblChargeDetails").show(); 
    }
  }
  checkCommodityNameandGroup = function(){
    
    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_CheckCommodityNameandGroup",
    data: JSON.stringify({
        "OperationType":1,
        "AirlinePrefix":AirlinePrefix,
        "AwbNumber":AwbNumber,
        "HawbNumber":HawbNumber
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
            console.log(response)
            $("body").mLoading('hide');
            if(obj[0].CommodityGroup == null && obj[0].CommodityName == null  ){
              getCommodityTypeAndDescription();
            }else{
              var commoGrp = obj[0].CommodityGroup;
              var commoName = obj[0].CommodityName;
              getExistedCommodityTypeAndDescription(commoGrp,commoName);
            }
            
          }else{
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].ERRORMSG;
            $.alert(errmsg,errmsgcont);
            return;

          }
        } else {
            $("body").mLoading('hide');
            
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


  getCommodityTypeAndDescription = function(){
    
    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_Get_ComodityType_ComodityDescription",
    data: JSON.stringify({
      "OperationType":1,
      "AirlinePrefix":AirlinePrefix,
      "CategoryDescription":"",
      "CreatedByUserId":CreatedByUserId,
      "OrganizationId":OrganizationId,
      "OrganizationBranchId":OrganizationBranchId
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
            console.log(response)
            var s = '<option value="-1">Select</option>';
            for (var i = 0; i < obj.length; i++) {
     
                  s += '<option value = ' + obj[i].CommodityTypeId +'>' + obj[i].CategoryDescription + '</option>';
         
                  $("#ddlCommodityTypeList").html(s);
           
          }
           
            // $.alert('Details saved successfully');
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

  getExistedCommodityTypeAndDescription = function(CommodityGroup,CommodityName){
    console.log(CommodityGroup);
    console.log(CommodityName);
    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_Get_IFEXIST_ComodityType_ComodityDescriptionForTSP",
    data: JSON.stringify({
      "OperationType":3,
      "AirlinePrefix":AirlinePrefix,
      "CommodityGroup":CommodityGroup,
      "CommodityName":CommodityName,
      "SelectedCommodityGroup":"",
      "SelectedCommodityName":"",
      "CreatedByUserId":CreatedByUserId,
      "OrganizationId":OrganizationId,
      "OrganizationBranchId":OrganizationBranchId
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
            console.log(response);
            if(obj.length == 1){
                  $("#ddlCommodityTypeList").html('<option value = ' + obj[0].CommodityTypeId +'>' + obj[0].CategoryDescription + '</option>');
                  $("#ddlCommodityNameList").html('<option value = ' + obj[0].CommodityTypeId +'>' + obj[0].NAME + '</option>');
                  $("#ddlCommodityTypeList").attr('disabled', 'disabled');
                  $("#ddlCommodityNameList").attr('disabled', 'disabled');

                  // var CommodityGroup = $('#ddlCommodityTypeList :selected').text();
                  var CommodityName = $('#ddlCommodityNameList :selected').text();
                  var fields = CommodityName.split(': ');
                  console.log(fields[1]);
                  var CommodityGroup = fields[1];
                  if(CTOName == "MABB")
                  getTSPDetailsMABB(CommodityGroup,CommodityName);
                  else if(CTOName == "AISATS")
                  getTSPDetailsAISATS(CommodityGroup,CommodityName);
                  else{
                  getTSPDetailsKaleGHA(CommodityGroup,CommodityName);
                  }
            }else{
              var type;
              var name;
              for (var i = 0; i < obj.length; i++) {
                  type += '<option value = ' + obj[i].CommodityTypeId +'>' + obj[i].CategoryDescription + '</option>';
                  $("#ddlCommodityTypeList").html(type);
                  name += '<option value = ' + obj[i].CommodityTypeId +'>' + obj[i].NAME + '</option>';
                  $("#ddlCommodityNameList").html(name);
                  $("#ddlCommodityTypeList").removeAttr('disabled');
                  $("#ddlCommodityNameList").removeAttr('disabled');
              }
              var CommodityName = $('#ddlCommodityNameList :selected').text();
              var field = CommodityName.split(': ');
              console.log(field[1]);
              var CommodityGroup = field[1];
              if(CTOName == "MABB")
                  getTSPDetailsMABB(CommodityGroup,CommodityName);
                  else if(CTOName == "AISATS")
                  getTSPDetailsAISATS(CommodityGroup,CommodityName);
                  else{
                  getTSPDetailsKaleGHA(CommodityGroup,CommodityName);
                  }
            }
            // $.alert('Details saved successfully');
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
 
  getCommodityNameList = function(){
    if ($('#ddlCommodityTypeList').val() != '-1') {
      //$("#tblAirWayBillInfo").fadeOut();
      //$("#btndiv").fadeOut();
      //$("#btnSignDiv").fadeOut();
      var commodityType = $('#ddlCommodityTypeList :selected').text();
      var commodityTypeId = $('#ddlCommodityTypeList :selected').val();
      }

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_IMP_Get_ComodityType_ComodityDescription",
      data: JSON.stringify({
        "OperationType":2,
        "AirlinePrefix":AirlinePrefix,
        "CategoryDescription":commodityType,
        "CreatedByUserId":CreatedByUserId,
        "OrganizationId":OrganizationId,
        "OrganizationBranchId":OrganizationBranchId
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
            console.log(response);
            var s = '<option value="-1">Select</option>';
            for (var i = 0; i < obj.length; i++) {
         
                  s += '<option value = ' + obj[i].CommodityTypeId +'>' + obj[i].Name + '</option>';
         
                  $("#ddlCommodityNameList").html(s);
           
          }


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
  onChangeCommodityName = function(){
    // var CommodityGroup = $('#ddlCommodityTypeList :selected').text();
    var CommodityName = $('#ddlCommodityNameList :selected').text();
    var fields = CommodityName.split(':');
            console.log(fields[1]);
            var CommodityGroup = fields[1];
            if(CTOName == "MABB")
            getTSPDetailsMABB(CommodityGroup,CommodityName);
            else if(CTOName == "AISATS")
                  getTSPDetailsAISATS(CommodityGroup,CommodityName);
                  else{
                  getTSPDetailsKaleGHA(CommodityGroup,CommodityName);
                  }
  }
 
  CheckTSPConfigurationSetting = function(){

    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/ACS_IMP_CheckTSPConfigurationSetting",
    data: JSON.stringify({ "AirlinePrefix":AirlinePrefix,
                  "AwbNumber":AwbNumber,
                  "OrganizationId":OrganizationId,
                  "OrganizationBranchId":OrganizationBranchId,
                  "mode": 'I'}),
   
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
        if (obj.length > 0) {
          if (obj[0].Msg == undefined || obj[0].Msg == "") {
            if(obj[0].OrgName == "AISATS_BLR"){
              CTOName = "AISATS";
            }else if(obj[0].OrgName == "MABB_BLR"){
              CTOName = "MABB";
            }else{
              CTOName = "KALE_GHA";
            }
            console.log(response)
            // fillDriverImage(response);
            $("body").mLoading('hide');
            // $.alert('Details saved successfully');
          }else{
              
            errmsg = "Alert</br>";
            errmsgcont = obj[0].Msg;
            // $.alert(errmsg,errmsgcont);
            return;

          }
        } else {
            $("body").mLoading('hide');
            
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

  setPickOrderDamageNoP = function(){
    var AwbNumber = MAWBNo.replace('-', '');
    console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/UpdateWHLocationMABB",
    data: JSON.stringify({
                  "AwbNumber":AwbNumber,
                  "HawbNumber":HawbNumber,
                  "IGMNo":IGMNo,
                  "IGMYear": IGMYear}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
        var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
        if (obj.length > 0) {
          if (obj[0].status == "S") {
            var currXml = obj[0].strInputXML;
            xmlDoc = $.parseXML( currXml ),
            $xml = $( xmlDoc ),
            $details = $xml.find("Details"),
            $DamagedNOP = $details.attr("DamagedNOP");
        
            console.log($details);
            console.log($DamagedNOP);
            DamagedNOP = $DamagedNOP;
            // fillDriverImage(response);
            $("body").mLoading('hide');
            // $.alert('Details saved successfully');
          }else{
              
            errmsg = "Alert</br>";
            errmsgcont = obj[0].Msg;
            // $.alert(errmsg,errmsgcont);
            return;

          }
        } else {
            $("body").mLoading('hide');
            
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

  getVTDetails = function(){
    var element = document.getElementById("heading7");
    var text = element.getAttribute("aria-expanded");
   // alert(text);
 
   if(text == "true"){
      if(VTStatus== "Pending" && assignStatus== "Completed" ){

        var disablePanel = true;  //or falsey value
        $("#accordionVT").on('hide.bs.collapse show.bs.collapse',  PanelEvent);

        window.location.href = "IMP_AllocateShipment.html";
      }
       else if(assignStatus== "Pending" ){
        var disablePanel = true;  //or falsey value
        $("#accordionVT").on('hide.bs.collapse show.bs.collapse',  PanelEvent);
              
     }else{
          console.log("VT Generated !!!!!!");
          if(VehTokenNos != ""){
          FillControlVTs();
          }
     }    
   }
   function PanelEvent(e){
     $self = (this);  
     if(disablePanel){    
     e.preventDefault();    // this is the trick
     console.log("panel should not behave");
    }
   else{
     console.log("panel opens or closes!");
    }
   };
   }

  FillControlVTs = function(){

    $("#VTlist").empty();
     
    var count = 0;
    var row = "";
    if (VehTokenNos.indexOf(',') > -1) 
    { 
      $("#VTlist").empty();
      var myarray = VehTokenNos.split(','); 
      for (var i = 0; i < myarray.length; i++) {

        if (myarray[i]) {

          var VT =  '"' + myarray[i] + '"';
                row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important'>";
                row += " <div onclick='goToVTDetails(" + VT + ")'>";
              
                row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;margin-top:0px !important'>" + myarray[i] + "</h5>";
                row += " <button id='' class='btn-arrow' style= 'float:right;margin :10px 15px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                row += " </div>";
                row += " </div>";

                count++;
            
            }
           
          }
        }
    else{
      $("#VTlist").empty();
      var myarray = '"' + VehTokenNos + '"';

                row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important'>";
                row += " <div onclick='goToVTDetails(" + myarray + ")'>";

                row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;margin-top:0px !important'>" + VehTokenNos + "</h5>";
                row += " <button id='' class='btn-arrow' style= 'float:right;margin :10px 15px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                row += " </div>";
                row += " </div>";
              
    }
    $("#VTlist").append(row);
    $("body").mLoading('hide');
        } 
     
        goToVTDetails = function (vt) {
          localStorage.setItem('VT', vt);
           console.log(vt)
          // if (vtno.charAt(0) == 'E' || vtno.charAt(1) == 'E') {
          //     localStorage.setItem('Tab', 'Exports');
          // }else{
          //     localStorage.setItem('Tab', 'Imports');
          // }
          window.location.href = 'IMP_viewVehicleTokenDetails.html';
      }

      getApplicableCharges = function(){
var row = "";
             
               for(var i = 0; i<1 ;i++){
                  // var CUSTODIAN = '"' + d.CUSTODIAN + '"';
                    
                  row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important'>";
                  row += " <div onclick='goToChargeDetails()'>";
  
                  row += " <h5 class='' style='padding: 10px;display: inline-flex;color:white;'>Invoice No.</h5>";
                  row += " <h5 class='' style='padding: 10px;display: inline-flex;color:white;'>Total Charges(INR)</h5>";
                  row += " <h5 class='' style='padding: 10px;display: inline-flex;color:white;'>INV000001</h5>";
                  row += " <h5 class='' style='padding: 10px;display: inline-flex;color:white;'>844.00</h5>";

                  row += " <button id='' class='btn-arrow' style= 'float:right;margin :0px 15px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
                  row += " </div>";
                  row += " </div>";
    
                 
                
                }
                $("#appChargeslist").append(row);
                $("body").mLoading('hide');
      
        // $.ajax({
        //   type: 'POST',
        //   url: ACSServiceURL + "/ACS_IMP_GetCustodianDetails",
        //   data: JSON.stringify({"OperationType": 1 }),
        //   contentType: "application/json; charset=utf-8",
        //   dataType: "json",
        //   success: function (response, xhr, textStatus) {
        //       var obj = JSON.parse(response.d);
        //      console.log(response.d);
        //      console.log(obj);
    
        //      var count = 0;
        //      var row = "";
        //       if (obj.length > 0) {
             
        //         $.each(obj, function (i, d) {
        //           var CUSTODIAN = '"' + d.CUSTODIAN + '"';
                    
        //           row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important'>";
        //           row += " <div onclick='goToVTDetails(" + myarray + ")'>";
  
        //           row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;'>" + VehTokenNos + "</h5>";
        //           row += " <button id='' class='btn-arrow' style= 'float:right;margin :10px 15px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
        //           row += " </div>";
        //           row += " </div>";
    
        //             count++;
                
        //         });
        //         $("#CTOlist").append(row);
        //         $("body").mLoading('hide');
        //     } else {
        //         $("body").mLoading('hide');
        //         $("#CTOlist").html('There are no active CTOs').css('color', '#f7347a');
        //     }
        // }
        // });
      }

  clearInputsBoE = function(){
    $("#txtBOENo").val(''); 
    $("#txtBOEDate").val(''); 
    $("#txtBOEPcs").val(''); 
    $("#txtBOEGrWt").val(''); 
    $("#txtBOEChWt").val(''); 
    $("#txtBOECAV").val(''); 
    $("#txtBOECode").val('');
    $("#fileList").val('');  

  }
  clearInputsOoC = function(){
    $("#spnOoCNo").val(''); 
    $("#spnOoCDate").val(''); 
    $("#txtOoCPcs").val(''); 
    $("#txtBOEPcsOoC").val('');    
    $("#fileListOoC").val('');
    
  }
  clearInputsPickOrder = function(){
    $("#spnPcsExam").val(''); 
    $("#spnRemarks").val(''); 
    
  }
  clearInputsBoEASI = function(){
    
  }

  clearTSPInputs  = function() {

    var sel ='<option value="-1">Select</option>';
    $("#ddlCommodityTypeList").html(sel);

    var select ='<option value="-1">Select</option>';
    $("#ddlCommodityNameList").html(select);
    $("#HSNCode").val(''); 
    $("#payMode").val(''); 
    $("#PDAccNo").val(''); 
    $("#LocationCode").val(''); 
    $("#CTOPDBalance").val(''); 
    $("#TSPPayAmount").val(''); 
  }

  clearTSPDetails = function () {
    $("#tspPassword").val(''); 
  }

  function viewPassword() {
    var x = document.getElementById("tspPassword");
    if (x.type === "password") {
        $(".zmdi-eye").hide();
        $(".zmdi-eye-off").show();
      
        x.type = "text";
    } else {
        $(".zmdi-eye").show();
        $(".zmdi-eye-off").hide();
        x.type = "password";
    }
}



FillMasterDataAssignClearing = function(){
  $("#AssignData").show();
  $("#AssignData").empty();

  var boENum=  $("#txtBOENo").val(); 

  console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
  type: 'POST',
  url: ACSServiceURL + "/ACS_IMP_TSPGetDetails_SAS",
  data: JSON.stringify({
      "OperationType":1,
      "AirlinePrefix":AirlinePrefix,
      "AwbNumber":AwbNumber,
      "HawbNumber":"", //IF HAWB IS THERE THEN SEND
      "IGMNo":0,
      "IGMYear":0,
      "BoENumber":0,
      "CreatedByUserId":CreatedByUserId,
      "OrganizationBranchId":OrganizationBranchId,
      "OrganizationId":OrganizationId,
      "CommodityGroup":"",
      "CommodityName":"",
      "MAWBID":0,
      "HAWBID":0
      }
      
    ),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (response, xhr, textStatus) {
    var obj = JSON.parse(response.d);
    console.log(response.d);
    console.log(obj);
    var count = 0;
    var row = "";
     if (obj.length > 0) {
      var MAWBNo = obj[0].MAWBNo;
       if (obj[0].HAWBNo == null) {
        if(obj[0].IHM_DONO != null){
          DOstatusMaster = "true";
        var DOnum = obj[0].IHM_DONO;
        }else{
        var DOnum = "";}
              row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important;padding: 5px 5px;'>";
              row += " <div onclick='goToMasterDetailsAssignClearing(" + MAWBNo+ ")'>";
            
              row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + MAWBNo+ "</h5>";
              row += " <button id='' class='btn-arrow' style= 'float:right;margin :3px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
              row += " </div>";
              row += " </div>";
              
       }else{
        if(obj[0].IHM_DONO != null){
          DOstatusMaster = "true";
        var DOnum = obj[0].IHM_DONO;
        }else{
        var DOnum = "";}
              row += " <div class= 'div-wrapper' id='master' style= 'background-color:#03b6ae !important'>";
              row += " <div onclick='goToMasterDetailsAssignClearing(" + MAWBNo+ ")'>";
            
              // row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + MAWBNo+ "</h5>";
              // row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + DOnum+ "</h5>";
              // row += " <button id='' class='btn-arrow' style= 'float:right;margin :3px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
              row += "<div class='contacts row contacts__itemfortext1' style='height:52px;'>";
              row += "<div class='col-6' id ='lblSbDate'>";
              row += "<div class='form-group vtMargin'>";
              row += "<h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin-top:10px !important'>" + MAWBNo+ "</h5>"
              row += "</div>";
              row += "</div>";

              row += "<div class='col-6' style='text-align: right;'>";
              row += "<div class='form-group'>";
              row += "<button id='' class='btn-arrow' style= 'float:right;margin :10px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>"
              row += " </div>";
              row += "</div>";
              row += "</div>";
              row += " </div>";
              row += " </div>";

             $.each(obj, function (i, d) {
              if(d.IHM_DONO != null){
              DOstatusHouse = "true";
              var DOnumber =  d.IHM_DONO;
              }else{
              var DOnumber = "";}
              var house = '"' + d.HAWBNo + '"';
              var hid = '"' + d.HID + '"';
              var assignStatus = '"' + d.AssignStatus + '"';
              var TspStatus = '"' + d.TspStatus + '"';
              row += " <div class= 'div-wrapper' id='house' style= 'background-color:#03b6ae !important'>";
              row += " <div onclick='goToHouseDetailsAssignClearing(" + house+ ", " + hid+ " , " + assignStatus+ ", "+ TspStatus+")'>";
            
              row += "<div class='contacts row contacts__itemfortext1' style='height:52px;'>";
              row += "<div class='col-6' id ='lblSbDate'>";
              row += "<div class='form-group vtMargin'>";
              row += "<h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin-top:10px !important'>" +  d.HAWBNo + "</h5>"
              row += "</div>";
              row += "</div>";
          
              row += "<div class='col-6' style='text-align: right;'>";
              row += "<div class='form-group'>";
              row += "<button id='' class='btn-arrow' style= 'float:right;margin :10px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>"
              row += " </div>";
              row += "</div>";
              row += "</div>";
              row += " </div>";
              row += " </div>";
                
              
                count++;
                    
            });
       }
     
       $("#AssignData").append(row);
            $("body").mLoading('hide');
     } else {
         $("body").mLoading('hide');
        
         errmsg = "Wrong MAWB number</br>";
         errmsgcont = "Please enter a valid BoE number</br>";
     //    $.alert(errmsg,errmsgcont);
         return;
     }

 },
 error: function (xhr, textStatus, errorThrown) {
     $("body").mLoading('hide');
     alert('Server not responding...');
 }
});

      } 
    

      goToMasterDetailsAssignClearing = function (number) {
        console.log(number);
        localStorage.setItem('hawbNo', "");
        localStorage.setItem('isHouse', false);
    
        if(DOLevel == "DOHAWBLevel")  {
           errmsg = "Alert</br>";
           errmsgcont = "DO generated at HAWB level</br>";
           $.alert(errmsg,errmsgcont);
           return;  
         }else if(assignStatus == "Completed")  {
         
          return;  
        }else
          window.location.href = 'IMP_AssignClearingAgentFromMenu.html';

    }
    goToHouseDetailsAssignClearing =  function (number, id, AssignStatus, TspStatus) {
      localStorage.setItem('hawbNo', number);
      localStorage.setItem('HawbRowId', id);
        localStorage.setItem('isHouse', true);
         console.log(number);

         if(TspStatus == "Pending"){
          return;  
         }
         else if(AssignStatus == "Completed"){
          return;  
         }
        else if(DOLevel == "DOMAWBLevel")  {
          errmsg = "Alert</br>";
          errmsgcont = "DO generated at MAWB level</br>";
          $.alert(errmsg,errmsgcont);
          return;  
        }else
        window.location.href = 'IMP_AssignClearingAgentFromMenu.html';

  }
getAssignClearingDetails = function(){
 var element = document.getElementById("heading4"); 
 var text = element.getAttribute("aria-expanded");
// alert(text)

if(text == "true"){
  if(DOstatus == "Completed" || DOstatus == "Partial"){
      $('body').mLoading({
        text: "Please Wait..",
      });
            // if(DOstatus == "Approved"){
            //   var CommodityGroup = "";
            //   var CommodityName = "";
            FillMasterDataAssignClearing();
            // }else{
            //   getCTOStatusDetails();
            // }
  }else{
        var disablePanel = true;  //or falsey value
        $("#accordionTSP").on('hide.bs.collapse show.bs.collapse',  PanelEvent);

  }    
}
function PanelEvent(e){
  $self = (this);  
  if(disablePanel){    
  e.preventDefault();    // this is the trick
  console.log("panel should not behave");
 }
else{
  console.log("panel opens or closes!");
 }
};
}



 
 
 FillMasterBoEStatus = function(){
  $("#BoEStatusData").show();
  $("#BoEStatusData").empty();

  var boENum=  $("#txtBOENo").val(); 

  console.log(AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
  type: 'POST',
  url: ACSServiceURL + "/ACS_IMP_TSPGetDetails_SAS",
  data: JSON.stringify({
      "OperationType":1,
      "AirlinePrefix":AirlinePrefix,
      "AwbNumber":AwbNumber,
      "HawbNumber":"", //IF HAWB IS THERE THEN SEND
      "IGMNo":0,
      "IGMYear":0,
      "BoENumber":0,
      "CreatedByUserId":CreatedByUserId,
      "OrganizationBranchId":OrganizationBranchId,
      "OrganizationId":OrganizationId,
      "CommodityGroup":"",
      "CommodityName":"",
      "MAWBID":0,
      "HAWBID":0
      }
      
    ),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (response, xhr, textStatus) {
    var obj = JSON.parse(response.d);
    console.log(response.d);
    console.log(obj);
    var count = 0;
    var row = "";
     if (obj.length > 0) {
      var MAWBNo = obj[0].MAWBNo;
       if (obj[0].HAWBNo == null) {
        if(obj[0].IHM_DONO != null){
          DOstatusMaster = "true";
        var DOnum = obj[0].IHM_DONO;
        }else{
        var DOnum = "";}
              row += " <div class= 'div-wrapper' style= 'background-color:#03b6ae !important;padding: 5px 5px;'>";
              row += " <div onclick='goToMasterBoEStatus(" + MAWBNo+ ")'>";
            
              row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + MAWBNo+ "</h5>";
              row += " <button id='' class='btn-arrow' style= 'float:right;margin :3px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
              row += " </div>";
              row += " </div>";
              
       }else{
        if(obj[0].IHM_DONO != null){
          DOstatusMaster = "true";
        var DOnum = obj[0].IHM_DONO;
        }else{
        var DOnum = "";}
              row += " <div class= 'div-wrapper' id='master' style= 'background-color:#03b6ae !important'>";
              row += " <div onclick='goToMasterBoEStatus(" + MAWBNo+ ")'>";
            
              // row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + MAWBNo+ "</h5>";
              // row += " <h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin:0px !important'>" + DOnum+ "</h5>";
              // row += " <button id='' class='btn-arrow' style= 'float:right;margin :3px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>";
              row += "<div class='contacts row contacts__itemfortext1' style='height:52px;'>";
              row += "<div class='col-6' id ='lblSbDate'>";
              row += "<div class='form-group vtMargin'>";
              row += "<h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin-top:10px !important'>" + MAWBNo+ "</h5>"
              row += "</div>";
              row += "</div>";

              row += "<div class='col-6' style='text-align: right;'>";
              row += "<div class='form-group'>";
              row += "<button id='' class='btn-arrow' style= 'float:right;margin :10px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>"
              row += " </div>";
              row += "</div>";
              row += "</div>";
              row += " </div>";
              row += " </div>";

             $.each(obj, function (i, d) {
              if(d.IHM_DONO != null){
              DOstatusHouse = "true";
              var DOnumber =  d.IHM_DONO;
              }else{
              var DOnumber = "";}
              var house = '"' + d.HAWBNo + '"';
              var hid = '"' + d.HID + '"';
              row += " <div class= 'div-wrapper' id='house' style= 'background-color:#03b6ae !important'>";
              row += " <div onclick='goToHouseBoEStatus(" + house+ ", " + hid+ " )'>";
            
              row += "<div class='contacts row contacts__itemfortext1' style='height:52px;'>";
              row += "<div class='col-6' id ='lblSbDate'>";
              row += "<div class='form-group vtMargin'>";
              row += "<h5 class='primary-heading' style='padding: 10px;display: inline-flex;color:white;font-size: 13px;margin-top:10px !important'>" +  d.HAWBNo + "</h5>"
              row += "</div>";
              row += "</div>";
          
              row += "<div class='col-6' style='text-align: right;'>";
              row += "<div class='form-group'>";
              row += "<button id='' class='btn-arrow' style= 'float:right;margin :10px 10px' ><i class='zmdi zmdi-chevron-right' style= 'color:white;font-size:25px'></i></button>"
              row += " </div>";
              row += "</div>";
              row += "</div>";
              row += " </div>";
              row += " </div>";
                
              
                count++;
                    
            });
       }
     
       $("#BoEStatusData").append(row);
            $("body").mLoading('hide');
     } else {
         $("body").mLoading('hide');
        
         errmsg = "Wrong MAWB number</br>";
         errmsgcont = "Please enter a valid BoE number</br>";
     //    $.alert(errmsg,errmsgcont);
         return;
     }

 },
 error: function (xhr, textStatus, errorThrown) {
     $("body").mLoading('hide');
     alert('Server not responding...');
 }
});

      } 
    

      goToMasterBoEStatus = function (number) {
        console.log(number);
        localStorage.setItem('hawbNo', "");
        localStorage.setItem('isHouse', false);
    
        // if(DOLevel == "DOHAWBLevel")  {
        //    errmsg = "Alert</br>";
        //    errmsgcont = "DO generated at HAWB level</br>";
        //    $.alert(errmsg,errmsgcont);
        //    return;  
        //  }else
          window.location.href = 'IMP_BoEStatusFromMenu.html';

    }
    goToHouseBoEStatus = function (number, id) {
      localStorage.setItem('hawbNo', number);
      localStorage.setItem('HawbRowId', id);
        localStorage.setItem('isHouse', true);
         console.log(number);
        //  if(DOstatus == "Completed"){
        //   window.location.href = 'IMP_DOPaymentFromMenu.html';
        //  }
        // else 
        // if(DOLevel == "DOMAWBLevel")  {
        //   errmsg = "Alert</br>";
        //   errmsgcont = "DO generated at MAWB level</br>";
        //   $.alert(errmsg,errmsgcont);
        //   return;  
        // }else
        window.location.href = 'IMP_BoEStatusFromMenu.html';

  }
getBoEStatusDetails = function(){
 var element = document.getElementById("heading5"); 
 var text = element.getAttribute("aria-expanded");
// alert(text)

if(text == "true"){
  // if(asistatus == "Completed"){
      $('body').mLoading({
        text: "Please Wait..",
      });
            // if(DOstatus == "Approved"){
            //   var CommodityGroup = "";
            //   var CommodityName = "";
            FillMasterBoEStatus();
            // }else{
            //   getCTOStatusDetails();
            // }
  // }else{
  //       var disablePanel = true;  //or falsey value
  //       $("#accordionTSP").on('hide.bs.collapse show.bs.collapse',  PanelEvent);

  // }    
}
function PanelEvent(e){
  $self = (this);  
  if(disablePanel){    
  e.preventDefault();    // this is the trick
  console.log("panel should not behave");
 }
else{
  console.log("panel opens or closes!");
 }
};
}