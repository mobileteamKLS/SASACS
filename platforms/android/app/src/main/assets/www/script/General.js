﻿//var WebServiceUrl = "http://10.22.3.205/GalaxyService/GalaxyService.asmx/";  //LOCAL PC
var WebServiceUrl = "http://10.22.3.222/GalaxyMobAppService/GalaxyService.asmx/";  //Local 


(function () {
    document.addEventListener("deviceready", LoadNavBar, false);
})();
function ShowHomePage() {
    window.location.href = "GalaxyHome.html";
}
function LoadNavBar() {
    $('#myNavbar').load("NavBar.html");
    if (window.location.pathname.split("/").pop() == "EXP_AirsideRelease.html") {
        $('#navhdrName').html("Airside Release");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_Binning.html") {
        $('#navhdrName').html("Binning");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_Dashboard.html") {
        $('#navhdrName').html("Export Dashboard");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_DocumentUpload.html") {
        $('#navhdrName').html("Document Upload");
    }
    else if (window.location.href.split("/").pop() == "EXP_EuroPalletAcceptance.html") {
        $('#navhdrName').html("Euro Pallet Acceptance");
    }
    else if (window.location.href.split("/").pop() == "EXP_EuroPalletAcceptance.html?TDG=TDG") {
        $('#navhdrName').html("TDG Acceptance");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_ExportQuery.html") {
        $('#navhdrName').html("Export Query");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_MomentofShipment.html") {
        $('#navhdrName').html("Movement of Shipment");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_ScanningLocation.html") {
        $('#navhdrName').html("Vehicle Tracking");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_ScanningLocationMain.html") {
        $('#navhdrName').html("Vehicle Tracking");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_ULDModification.html") {
        $('#navhdrName').html("ULD Cancel/Change/Rebuild");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_Unitization.html") {
        $('#navhdrName').html("Unitization");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_VCTCheck.html") {
        $('#navhdrName').html("VCT Check");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_ULDBuildUp.html") {
        $('#navhdrName').html("ULD Buildup");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_VCTAcceptance.html") {
        $('#navhdrName').html("VCT Acceptance");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_AddULDtoFlight.html") {
        $('#navhdrName').html("Add ULD To Flight");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_AWBLocation.html") {
        $('#navhdrName').html("AWB Location");
    }
    else if (window.location.pathname.split("/").pop() == "EXP_CreateAWB.html") {
        $('#navhdrName').html("Create AWB");
    }
    else if (window.location.pathname.split("/").pop() == "GalaxyHome.html") {
        $('#navhdrName').html("Dashboard");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_Binning.html") {
        $('#navhdrName').html("Binning");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_CheckAWB.html") {
        $('#navhdrName').html("Check AWB");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_Dashboard.html") {
        $('#navhdrName').html("Import Dashboard");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_DocumentUpload.html") {
        $('#navhdrName').html("Document Upload");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_FinalDelivery.html") {
        $('#navhdrName').html("Final Delivery");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_FlightCheck.html") {
        $('#navhdrName').html("Flight Check");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_InternalMovement.html") {
        $('#navhdrName').html("Internal Movement");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_ScanningLocation.html") {
        $('#navhdrName').html("Scanning Location");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_ScanningLocationMain.html") {
        $('#navhdrName').html("Scanning Location");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_Segregation.html") {
        $('#navhdrName').html("Segregation");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_ShipmentBackwarding.html") {
        $('#navhdrName').html("Back from Customs Exam");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_ShipmentForwarding.html") {
        $('#navhdrName').html("Sent to Customs Exam");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_ShipmentStatus.html") {
        $('#navhdrName').html("Shipment Status");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_VCTCheck.html") {
        $('#navhdrName').html("VCT Check");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_WDOoperations.html") {
        $('#navhdrName').html("WDO Operations");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_RecordDamage.html") {
        $('#navhdrName').html("Record Damage");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_RecordDiscrepancy.html") {
        $('#navhdrName').html("Record Discrepancy");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_ShipmentArrival.html") {
        $('#navhdrName').html("Shipment Arrival");
    }
    else if (window.location.pathname.split("/").pop() == "IMP_CreateAWB.html") {
        $('#navhdrName').html("Create AWB");
    }
    else if (window.location.pathname.split("/").pop() == "GMAXHHT_EXP_Dashboard.html") {
        $('#navhdrName').html("Export Dashboard");
    }
    else if (window.location.pathname.split("/").pop() == "GMAXHHT_EXP_VehicleLocation.html") {
        $('#navhdrName').html("Vehicle Location");
    }
    else if (window.location.href.split("/").pop() == "GMAXHHT_EXP_TokenScan.html") {
        $('#navhdrName').html("Vehicle Token Scan");
    }
    else if (window.location.pathname.split("/").pop() == "GmaxHHTHome.html") {
        $('#navhdrName').html("Main Menu");
    }
    else if (window.location.href.split("/").pop() == "GMAXHHT_EXP_Bag.html") {
        $('#navhdrName').html("BAG");
    }
}
function NumberOnly(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    return false;
}
function ChkMaxLength(txt, len) {
    if ($('#' + txt.id).val().length > parseInt(len)) {
        $('#' + txt.id).val($('#' + txt.id).val().substring(0, len));
    }
}

//function scan() {
//    cordova.plugins.barcodeScanner.scan(
//      function (result) {
//          if (result.text != "") {
//              window.location.href = "ExportPassTracker.html";
//              sessionStorage.setItem("ContainerNo", result.text);
//          }
//      },
//      function (error) {
//          alert("Scanning failed: " + error);
//      }
//   );
//}

//navigator.camera.getPicture(onPhotoFileSuccess, onFail, {
//    quality: 100,
//    targetWidth: 500,
//    targetHeight: 500,
//    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//    destinationType: Camera.DestinationType.FILE_URI
//});

