
var LocationName = localStorage.getItem('LocationName');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var OrganizationTypeId = localStorage.getItem('OrganizationTypeId');
var MAWBNo = localStorage.getItem('mawbNo');
var AirlinePrefix = localStorage.getItem('Prefix');
var AwbNumber = localStorage.getItem('AWBNumber');
var MenuTitle= localStorage.getItem('ExportsMenu');
var TSPSetting;
var fileParm;
var fileUploadParm;
  var base64textString;
  var documentuploadobj = { };
var  ActualFileDataCSD;
var  ActualFileDataDoc;
var documentCSDName;
var documentName;
var CSDFileSize;
var documentsize;
var AWBid;
var path;
var errmsg = "";
$(function () {

  otherDocumentsList();

  $("#accordionDocUpload").hide(); 
  localStorage.removeItem('fromMenus');
  localStorage.setItem('viewSB', "");
  setTimeout(function () {
      window.location.href = 'loginScreen2.html'
  }, 1200000);

  console.log(MAWBNo);
  
  $("#txtMawbNo").val(MAWBNo); 
  console.log(MenuTitle)
  $("#MenuHeading").text(MenuTitle);
  
  var HawbNumber = "";
  
 
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
    window.location.href = "dashboard-export.html";
  }

  function otherDocumentsList(){
    $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/Get_DocumentTemplate",
      data: JSON.stringify({OrganizationTypeId: 0,CanCreate:"false"}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response, xhr, textStatus) {
          var obj = JSON.parse(response.d);
          if (obj.length > 0) {

              var rson;
              rson += '<option value="" selected>Select Document</option>';
              for (var i = 0; i < obj.length; i++) {
                  rson += '<option value="' + obj[i].DocumentTemplateId + '">' + obj[i].Name + '</option>';
              }
                  $("#documentList").html(rson);
            
             


          }

      },
      error: function (xhr, textStatus, errorThrown) {
          $("body").mLoading('hide');
          //alert('Server not responding...');
      }
  });
  }
  function searchAWBNumber() {
    $("#listingDetailsRow").empty();
    AirlinePrefix = $("#txtFlightPrefix").val();
    AwbNumber = $("#txtFlightNo").val();
    if ($("#txtFlightPrefix").val() == '' || $("#txtFlightNo").val() == '' || AirlinePrefix.length != 3 || AwbNumber.length != 8 ) {
      // $("#txtFlightPrefix").css("border", "solid thin red");
      // $("#txtFlightNo").css("border", "solid thin #ccc");
      $("#tblVehicleInfo").hide();
      $("#tblVehicleInfo1").hide();
      errmsg = "No MAWB Number</br>";
      errmsgcont = "Please enter a valid MAWB number</br>";
      $.alert(errmsg,errmsgcont);
      return;
    } else {
        AirlinePrefix = $("#txtFlightPrefix").val();
        AwbNumber = $("#txtFlightNo").val();
        HawbNumber = '';
        var mawbNo = AirlinePrefix.concat("-", AwbNumber);
        localStorage.setItem('mawbNo',mawbNo);
        localStorage.setItem('Prefix',AirlinePrefix);
        localStorage.setItem('AWBNumber',AwbNumber);

        if(MenuTitle == "SB ASI")
        ImportListingPage('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
        else if(MenuTitle == "e-Docket")
        ImportTrackandTraceMenuFlow('3', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
        else
        ImportTrackandTraceMenuFlow('1', AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId);
      }
        
    }


function MovetoNext(current, nextFieldID) {
  if (current.value.length >= current.maxLength) {
      document.getElementById(nextFieldID).focus();
  }
}

function clearInputs() {
  $("#txtFlightPrefix").val('');
   $("#txtFlightNo").val('');
}



ImportListingPage = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Exp_ListingPage_ForMenuFlow",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId , AWBID:0 , SBID:0}),
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
              FillControl(response);
             // fillDriverImage(response);
              $("body").mLoading('hide');
              // $.alert('Details saved successfully'); }else{
               
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

FillControl = function (response) {
  console.log(response)
  var obj = JSON.parse(response.d);
  
  var count = 0;
  var row = "";
  if (obj.length > 0) {

    //row +="<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>";
                $.each(obj, function (i, d) {
              
                  if(d.HAWBNumber != null)
                  {
                  // row +="<div class= 'div-wrapper'>";
                  // row +="<div class='panel-heading' role='tab' id='heading" + i + "' style='font-size: 17px;padding: 5px 10px 0px 10px;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' >";
                  // row +="<label style='font-weight: bold;margin-right: 10px;'>HAWB No.</label><span id='IgmNo' style='margin-right: 20px'>" + d.HAWBNumber + "</span>";
 
                     
                    
                  // row +="<button class='btn-arrow' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "' style='border: none;background-color: white;'>";
                  // row +="<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#20A8D8;background-color: white;margin-left: 15px;'></i>";
                  // row +="</button>";
                  // row +="</div>";
                  // row +="<div id='collapse" + i + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + i + "'>";
                  row +="<div class= 'div-wrapper1'>";
                  var _HAWBNumber = '"' + d.HAWBNumber + '"';
                  var _AWBID = '"' + d.AWBID + '"';
                  row +="<div onclick='goToHawbData(" + _HAWBNumber + ", " + _AWBID + ");'>";
                  row +="<h5 class='primary-heading" + i + "' style='color: #fff;padding: 15px;display: inline-flex;' id= 'hawbNo'>" + d.HAWBNumber + "</h5>";
                  row +="<button id='' class='btn-arrow' style='margin-top: 13px;'><i class='zmdi zmdi-chevron-right' style='color: white;font-size: 29px;'></i></button>";
                  row +="</div>";
                  // row +="</div>";
                  // row +="</div>";
                  }else{
                  var _AWBID = '"' + d.AWBID + '"';
                    row +="<div class= 'div-wrapper' onclick='goToDirectShip(" + _AWBID + ");'>";
                    row +="<div class='panel-heading' role='tab' id='heading" + i + "' style='font-size: 17px;padding: 5px 10px 0px 10px;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' >";
                    row +="<label style='font-weight: bold;margin-right: 10px;'>MAWB No.</label><span id='IgmNo' style='margin-right: 20px'>" + d.MAWBNumber + "</span>";
                   
                    row +="<button class='btn-arrow' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "' style='border: none;background-color: white;'>";
                    row +="<i class='more-less zmdi zmdi-chevron-right' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#20A8D8;background-color: white;margin-left: 15px;'></i>";
                    row +="</button>";
                    row +="</div>";
                  }
                    
                
                  row +="</div>";
                  
                
                count++;
               
            });
            //row +="</div>";
      $("#listingDetailsRow").append(row);
      $("body").mLoading('hide');
  } else {
      $("body").mLoading('hide');
      $("#listingDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
  }

}

goToDirectShip = function (id) {
  localStorage.setItem('hawbNo',"");
  localStorage.setItem('awbID',id);
  
  if(MenuTitle == "SB ASI")
  window.location.href = "EXP_selectSbNo.html";
  else
  window.location.href = "EXP_ShipmentDetailsFromMenu.html";
}

goToHawbData = function (hawbNo,id){
  console.log(hawbNo)
  localStorage.setItem('hawbNo',hawbNo);
  localStorage.setItem('awbID',id); 
  if(MenuTitle == "SB ASI")
  window.location.href = "EXP_selectSbNo.html";
  else
  window.location.href = "EXP_ShipmentDetailsFromMenu.html";
}

ImportTrackandTraceMenuFlow = function (OperationType, AirlinePrefix, AwbNumber, HawbNumber, CreatedByUserId, OrganizationBranchId, OrganizationId) {
  //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
  $.ajax({
      type: 'POST',
      url: ACSServiceURL + "/ACS_Exp_ListingPage",
      data: JSON.stringify({ OperationType: OperationType, AirlinePrefix: AirlinePrefix, AwbNumber: AwbNumber, HawbNumber: HawbNumber, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId, AWBID:0 , SBID:0}),
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
              TSPSetting = obj[0].TSPSetting;
              localStorage.setItem('TSPSetting',TSPSetting);
              if(MenuTitle == "View SB Details"){
                FillControlMenu(response);
              }else if(MenuTitle == "e-Docket"){
                $("#spnMawbNo").text(obj[0].MAWBNumber);
                $("#spnMawbDate").text(obj[0].MawbDate.substring(0, 11));
                if(obj[0].ASIStatus == false){
                  
                  $("#submitButton").attr('disabled', 'disabled');
                  $("#submitButton").css({ "background-color": "lightgrey", "color": "white !important" , "border": "1 px solid grey !important"});
                }
                $("#accordionDocUpload").show(); 
                AWBid = obj[0].AWBID;
                GetDocumentsForJobByOrganization_EDocketExport();
              }else{
              if(TSPSetting == ""){
                FillControlMenu(response);}
              else{
                localStorage.setItem('hawbNo',"");
                localStorage.setItem('SBNo',obj[0].SBNumber);
                localStorage.setItem('awbID',obj[0].MasterId);
                localStorage.setItem('sbID',obj[0].SBID);
                window.location.href = "EXP_ShipmentDetailsFromMenu.html";
              }
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
FillControlMenu = function (response) {
  console.log(response)
  var obj = JSON.parse(response.d);
  var _HAWBNumber ="";
  var index;
  var count = 0;
  var row = "";
  if (obj.length > 0) {

    //row +="<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>";
                $.each(obj, function (i, d) {
              
                  if(d.HAWBNumber != null)
                  {
                        if(_HAWBNumber == d.HAWBNumber){

                          row +="<div id='collapse" + index + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + index + "'>";
                          row +="<div class= 'div-wrapper1' style='margin:0px 20px'>";
                           _HAWBNumber = '"' + _HAWBNumber + '"';
                          // index = i;
                          var _SBNumber = '"' + d.SBNumber + '"';
                          var _AWBID = '"' + d.AWBID + '"';
                          var _SBID = '"' + d.SBID + '"';
                          row +="<div onclick='goToHawbDataMenu(" + _HAWBNumber + "," + _SBNumber + ", " + _AWBID + ", " + _SBID + ");'>";
                          row +="<h5 class='primary-heading" + index + "' style='color: #fff;padding: 15px;display: inline-flex;' id= 'hawbNo'>" + d.SBNumber + "</h5>";
                          row +="<button id='' class='btn-arrow' style='margin-top: 13px;'><i class='zmdi zmdi-chevron-right' style='color: white;font-size: 29px;'></i></button>";
                          row +="</div>";
                          row +="</div>";
                          row +="</div>";
                        }else{
                          row +="<div class= 'div-wrapper'>";
                          row +="<div class='panel-heading' role='tab' id='heading" + i + "' style='font-size: 17px;padding: 5px 10px 0px 10px;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' >";
                          row +="<label style='font-weight: bold;margin-right: 10px;'>HAWB No.</label><span id='IgmNo' style='margin-right: 20px'>" + d.HAWBNumber + "</span>";
      
                          row +="<button class='btn-arrow' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "' style='border: none;background-color: white;'>";
                          row +="<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#20A8D8;background-color: white;margin-left: 15px;'></i>";
                          row +="</button>";
                          row +="</div>";
                          row +="<div id='collapse" + i + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + i + "'>";
                          row +="<div class= 'div-wrapper1'>";
                          _HAWBNumber = d.HAWBNumber;
                          index = i;
                          var HawbNumber = '"' + d.HAWBNumber + '"';
                          var _SBNumber = '"' + d.SBNumber + '"';
                          var _AWBID = '"' + d.AWBID + '"';
                          var _SBID = '"' + d.SBID + '"';
                          row +="<div onclick='goToHawbDataMenu(" + HawbNumber + "," + _SBNumber + ", " + _AWBID + ", " + _SBID + ");'>";
                          row +="<h5 class='primary-heading" + i + "' style='color: #fff;padding: 15px;display: inline-flex;' id= 'hawbNo'>" + d.SBNumber + "</h5>";
                          row +="<button id='' class='btn-arrow' style='margin-top: 13px;'><i class='zmdi zmdi-chevron-right' style='color: white;font-size: 29px;'></i></button>";
                          row +="</div>";
                          row +="</div>";
                          row +="</div>";
                        }
     
                  }else{
                    var _SBNumber = '"' + d.SBNumber + '"';
                    var _AWBID = '"' + d.AWBID + '"';
                    var _SBID = '"' + d.SBID + '"';
                      row +="<div class= 'div-wrapper' >";
                      row +="<div class='panel-heading' role='tab' id='heading" + i + "' style='font-size: 17px;padding: 5px 10px 0px 10px;width: 100%;' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' >";
                      row +="<label style='font-weight: bold;margin-right: 10px;'>MAWB No.</label><span id='IgmNo' style='margin-right: 20px'>" + d.MAWBNumber + "</span>";
                     
                      row +="<button class='btn-arrow' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + i + "' style='border: none;background-color: white;'>";
                      row +="<i class='more-less zmdi zmdi-chevron-down' id='down-arrow' style='float: none !important;margin-right: 0px !important;font-size: 30px; color:#20A8D8;background-color: white;margin-left: 15px;'></i>";
                      row +="</button>";
                      row +="</div>";
                      row +="<div id='collapse" + i + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + i + "'>";
                      row +="<div class= 'div-wrapper1'>";
                      var _SBNumber = '"' + d.SBNumber + '"';
                      var _AWBID = '"' + d.AWBID + '"';
                      var _SBID = '"' + d.SBID + '"';
                      row +="<div onclick='goToDirectShipMenu(" + _SBNumber + "," + _AWBID + "," + _SBID + ");'>";
                      row +="<h5 class='primary-heading" + i + "' style='color: #fff;padding: 15px;display: inline-flex;' id= 'hawbNo'>" + d.SBNumber + "</h5>";
                      row +="<button id='' class='btn-arrow' style='margin-top: 13px;'><i class='zmdi zmdi-chevron-right' style='color: white;font-size: 29px;'></i></button>";
                      row +="</div>";
                      row +="</div>";
                      row +="</div>";
                    }
                    
                
                  row +="</div>";
                  
                
                count++;
               
            });
            //row +="</div>";
      $("#listingDetailsRow").append(row);
      $("body").mLoading('hide');
  } else {
      $("body").mLoading('hide');
      $("#listingDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
  }

}

goToDirectShipMenu = function (SBNo,id,sbid) {
  console.log(SBNo)
  localStorage.setItem('hawbNo',"");
  localStorage.setItem('SBNo',SBNo);
  localStorage.setItem('awbID',id);
  localStorage.setItem('sbID',sbid);
  window.location.href = "EXP_ShipmentDetailsFromMenu.html";
}

goToHawbDataMenu = function (hawbNo,SBNo,id,sbid){
  console.log(hawbNo)
  console.log(SBNo)
  localStorage.setItem('hawbNo',hawbNo);
  localStorage.setItem('SBNo',SBNo);
  localStorage.setItem('awbID',id);
  localStorage.setItem('sbID',sbid);
  window.location.href = "EXP_ShipmentDetailsFromMenu.html";
}
function clearInputs(){
  $("#txtFlightPrefix").val(''); 
  $("#txtFlightNo").val('');
  $("#listingDetailsRow").empty();
  $("#listingHeading").hide();
  $("#txtFlightPrefix").focus(); 
  $("#accordionDocUpload").hide(); 
  $("#accordionDocUpload").val(""); 
}
function clearData(){
  $("#fileCSD").val("");
  $("#fileList").val("");
}


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
if( CSDFileFlag == true)
 ActualFileDataCSD = this.documentuploadobj.FileData;
else
ActualFileDataDoc = this.documentuploadobj.FileData;

}
  var CSDFileFlag =false;
function readCSDFile(event) {
  CSDFileFlag = true;
  this.fileOC = event.target.files[0];
  console.log("file========", event.target.files[0]);

  this.fileName = this.fileOC.name;
  console.log("file Name========", this.fileName);
  documentCSDName =  this.fileName;
  CSDFileSize = this.fileOC.size;
  const fsize = this.fileOC.size;
  this.fileSize = Math.round((fsize / 1024));
  console.log("file size ========", this.fileSize);
  // The size of the file.
  if (this.fileSize >= 2048) {
    this.fileList = '';

    $("#fileCSD").val(''); 
    errmsg = "Alert</br>";
    errmsgcont = "Please select a file less than 2MB.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  } else {
    uploadFlag =false;
  
  }


}
function readFile(event) {
  CSDFileFlag = false;
  this.fileOC = event.target.files[0];
  console.log("file========", event.target.files[0]);

  this.fileName = this.fileOC.name;
  console.log("file Name========", this.fileName);
  documentName =  this.fileName;
  documentsize = this.fileOC.size;
  const fsize = this.fileOC.size;
  this.fileSize = Math.round((fsize / 1024));
  console.log("file size ========", this.fileSize);
  // The size of the file.
  if (this.fileSize >= 2048) {
    this.fileList = '';
    $("#fileList").val(''); 
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

    reader.onload = imageIsLoaded;
  }
  console.log(JSON.stringify(documentuploadobj))
}
var filePath;
function imageIsLoaded(e) {
  filePath = e.target.result;
  $('#CapPdf').attr('href', e.target.result);
};

openDoc =function(){
  console.log("in open document");
  window.open(filePath);

}

$('#removeFile').click(function () {
  $("#fileList").val("");
  $("#viewFile").text("");
}); 

//var uploadFlag = false;
// uploadDoc = function(){
// // uploadFlag =true;
//  //FillGridDocDetails(ActualFileData);
// }



uploadClick = function(){
  $('body').mLoading({
    text: "Please Wait..",
});

  if($("#fileCSD").val()){
    var templateIdCSD =  $("#CSDDocument").val();
    uploadDoc(ActualFileDataCSD, documentCSDName,CSDFileSize,templateIdCSD );

      if($("#fileList").val()){
        var templateId =  $("#documentList").val();
        if(templateId ==""){
          errmsg = "Alert</br>";
          errmsgcont = "Please select Document Type.</br>";
          $.alert(errmsg,errmsgcont);
          return;
        }
        uploadDoc(ActualFileDataDoc, documentName, documentsize, templateId);
      }
  }else{
    errmsg = "Alert</br>";
    errmsgcont = "Please choose a file to proceed.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
  $("#fileCSD").val("");
  $("#fileList").val("");

}

uploadDoc = function(fileData,filename,pdfFileSize, templateId){

  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/Insert_Edocket_Document",
    data: JSON.stringify(
      {
        "fupDocument" :filename,
        "ActualFileData":fileData,
        "FileLength": pdfFileSize,
        "FileExtension": ".pdf",
        "Mode":"",
        "DocumentTemplateId":templateId,
        "JobId":AWBid,
        "Comments":"TEST",
        "Status":"UPLOADED",
        "CreatedByUserId":CreatedByUserId,
        "OrganizationTypeId":OrganizationTypeId,
        "OrganizationBranchId":OrganizationBranchId,
        "OrganizationId":OrganizationId,
        "UniqueDocId":"",
        "DocumentStoreId":0
      }),
      
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      // var obj = JSON.parse(response.d);
      //  console.log(obj);
      //     if (obj[0].ValidationMsg == undefined) {
       if (response.d) {
    
        GetDocumentsForJobByOrganization_EDocketExport();
        $("body").mLoading('hide');
    
        } else {
            $("body").mLoading('hide');
           
            errmsg = "Alert</br>";
            errmsgcont = obj[0].ValidationMsg;
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

var storeIdxml ="";
submitToCTO = function(){
 
  if(storeIdxml== ""){
    errmsg = "Alert</br>";
    errmsgcont = "Please select record to proceed.</br>";
    $.alert(errmsg,errmsgcont);
    return;
  }
  $('body').mLoading({
    text: "Please Wait..",
});
  
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/Update_Multiple_Edocket",
    data: JSON.stringify(
      {
        "AWBId":AWBid, "UserId":CreatedByUserId,"organizationId":OrganizationId,"orgbranchId":OrganizationBranchId,
        "DocumentStoreIdXML":storeIdxml
      }),
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
      var obj = JSON.parse(response.d);
      console.log(response.d);
      console.log(obj);
        if (obj[0].Doctatus == undefined) {
 
     
        } else {
            $("body").mLoading('hide');
            errmsg = "Alert</br>";
            errmsgcont = obj[0].Doctatus;
            $.alert(errmsg,errmsgcont);
            GetDocumentsForJobByOrganization_EDocketExport();
            return;
        }
  
    },
    error: function (xhr, textStatus, errorThrown) {
        $("body").mLoading('hide');
        alert('Server not responding...');
    }
  });
}
GetDocumentsForJobByOrganization_EDocketExport = function(){
    $('body').mLoading({
    text: "Please Wait..",
});
  $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/GetDocumentsForJobByOrganization_EDocketExport",
    data: JSON.stringify(
      {
        "jobId":AWBid,
        "organizationTypeId":OrganizationTypeId,
        "organizationId":OrganizationId,
        "HawbId":0,
      }),
      
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response, xhr, textStatus) {
       var obj = JSON.parse(response.d);
       console.log(response.d);
       console.log(obj);
        if (obj.length > 0) {
          FillGridDocDetails(obj);

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
var count= 1;
var counter = 0;
var countCol = 1;

  FillGridDocDetails = function (obj) {
    $("#docTable").empty();
      var count = 0;
      var row = "";
      if (obj.length > 0) {
          $.each(obj, function (i, d) {
            var DocumentStoreId = '"' + d.DocumentStoreId + '"';
            var DocumentTemplateId = '"' + d.DocumentTemplateId + '"';
            path = '' + d.FilePath + '';
            
                $("#tracklabel").show();
                $("#tblTrackInfo").show();
            
                    row += "<tr id= " + count + ">";
                    //  if(uploadFlag == true){
                    //    row +="<td></td>";
                    //  }else{
                    row +="<td><input type='checkbox' name='chk' id= 'cbCheck"  + count + "' value= " + DocumentStoreId + " class='checkboxCheck'  onclick='checkClick(this);'/></td>";
                    //}
            
                    //  if(CSDFileFlag == true){
                    //   row += "<td class='text-left' style='color: black;font-size:12px;word-break: break-all;padding-bottom: 5px;' style='text-transform:none !important' ><a id = 'myFile' href='#' onclick='goToDocument(" + ActualFileData + ", " + count + ")'>" + documentCSDName + "</a></td>";
                    //  }else{
                      row += "<td class='text-left' style='color: black;font-size:12px;word-break: break-all;padding-bottom: 5px;' style='text-transform:none !important' ><a id = 'myFile' href='#'  onclick='goToDocument()'>" + d.DocumentName + "</a></td>";
                    // }
                      if(d.Status == "Uploaded"){
                          row += "<td><img src='img/icon_status_completed.png' style='text-transform:none !important'/></td>";
                      }else{
                      row += "<td><img src='img/icon_status_pending.png' style='text-transform:none !important'/></td>";
                      }
              
                    row += "<td class='text-left' style='color: black;' style='text-transform:none !important'></td>";
                    row += "<td  id= " + count + "><img src='img/delete.png' value= " + DocumentStoreId + " style='text-transform:none !important' onclick='deleteRow(this, "+ DocumentTemplateId + ",  " + DocumentStoreId + ");'></td>";
                    row += "</tr><br><br>";
                
                count++;
                });
          $("#docTable").append(row);
          $("body").mLoading('hide');
      } else {
          $("body").mLoading('hide');
          $("#vehicleDetailsRow").html('There are no Vehicle details available').css('color', '#f7347a');
      }


  }
   checkClick = function(element){
       var rowJavascript = element.parentNode.parentNode;

     var index = rowJavascript.rowIndex - 1;
     var checkId = "#cbCheck" + index;
     var storeId  = $(checkId).val();
     storeIdxml += "<Documents><Document Id=\" " + storeId + "\"/></Documents>";

    //  var rowid = '#cbCheck' + id;
    //  console.log(rowid);
    
    //  if ($(rowid).is(':checked')) {
    //    console.log('its checked');
    //    allVals.push($(rowid).val());
    //  }else{
    //    var list = allVals.toString();
    //    var strArray = list.split(',');
    //    for (var i = 0; i <strArray.length; i++) {
    //        if (strArray[i] === $(rowid).val()) {
    //            strArray.splice(i, 1);
    //        }
    //    }
    //    allVals= strArray.toString();
   
    //  }
    //  console.log(allVals);
   }
   
   deleteRow = function(element, tempId, storeId){
    console.log("Ids ====",  tempId + storeId);
    $.ajax({
    type: 'POST',
    url: ACSServiceURL + "/Delete_Edocket_Document",
    data: JSON.stringify(
    {
    
      "DocumentStoreId":storeId,
  
      "DocumentTemplateId":tempId,
    
      "OrganizationTypeId":OrganizationTypeId
    }),
    
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (response, xhr, textStatus) {
    var obj = JSON.parse(response.d);
        console.log(response.d);
        console.log(obj);
 
     if (obj[0].IsDeleted == "True") {
      counter = 0;
      countCol = 1;
 
          var rowJavascript = element.parentNode.parentNode;
      document.getElementById("tblTrackInfo").deleteRow(rowJavascript.rowIndex);
        count--;
       
 
        var table   = document.getElementById('tblTrackInfo');
        var trRows  = table.getElementsByTagName('tr');
        var tdRows  = table.getElementsByTagName('td');
        var j = 0;
        var k = 0;
        for (var i = 0; i < trRows.length; i++) 
        {
            trRows[i].id = "row"+counter;
    
            counter++;
        }
 
       for( var i = 0; i< tdRows.length; i++){
          
            for (var j; j < k+5; j++) 
            {
              
              tdRows[j].id = "colum"+countCol;
              var index = i+1;
              $(".checkboxCheck").attr("id", 'cbCheck'+ i);
              // $(input).attr("id", 'cbCheck'+countCol);
            }
          k=j;
          countCol++;
          index++;
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
   

   //   $('#tblTrackInfo tbody').on( 'click', 'td', function () {
   //     alert('Data:'+$(this).html().trim());
   
   // });

   goToDocument =function(){
     console.log("in open document", path);
     window.open(path);
 

   }
