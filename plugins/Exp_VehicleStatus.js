var departsStatus = localStorage.getItem('departsStatus');
var FFLocation = localStorage.getItem('FFLocation');
var CreatedByUserId = localStorage.getItem('CreatedByUserId');
var OrganizationBranchId = localStorage.getItem('OrganizationBranchId');
var OrganizationId = localStorage.getItem('OrganizationId');
var errmsg = "";
var _Mode = localStorage.getItem('Mode');
$(function () {

    if (departsStatus == 'W/H Gate-Out') {
        $("#headingNameMarshalling").hide();
        $("#headingNameWarehouse").show();
        $("#headingNameTerminal").hide();
    } else if (departsStatus == 'M/Y Gate-In') {
        $("#headingNameMarshalling").show();
        $("#headingNameWarehouse").hide();
        $("#headingNameTerminal").hide();
    } else if (departsStatus == 'Terminal Gate-In') {
        $("#headingNameMarshalling").hide();
        $("#headingNameWarehouse").hide();
        $("#headingNameTerminal").show();
    }

    $("#btnSearch").click(function () {
        if ($("#txtVTNo").val() == '') {
            $("#tbTable").hide('slow');
            errmsg = "Enter Valid VT Number.</br>";
            $.alert(errmsg);
            return;
        } else {
            $("#tbTable").show('slow');
            VTNo = $("#txtVTNo").val();
            $('body').mLoading({
                text: "Please Wait..",
            });
            GetVehicleScanning(VTNo, '3', CreatedByUserId, OrganizationBranchId, OrganizationId);
        }
    });
    $("#txtLocation").text(departsStatus);
    $("#divbtnInfo").hide();
    $("#btnSubmit").click(function () {
        $("#txtVTNo").css("border", "solid thin #ccc");
        if (departsStatus == 'W/H Gate-Out') {
            pVTNo = $("#txtVTNo").val();
            TruckingCoStatusUpdate('2', pVTNo, 'true', 'false', 'false');
        } else if (departsStatus == 'M/Y Gate-In') {
            pVTNo = $("#txtVTNo").val();
            TruckingCoStatusUpdate('2', pVTNo, 'false', 'true', 'false');
        } else if (departsStatus == 'Terminal Gate-In') {
            pVTNo = $("#txtVTNo").val();
            TruckingCoStatusUpdate('2', pVTNo, 'false', 'false', 'true');
        }
    });
});

function openScanner() {
    cordova.plugins.barcodeScanner.scan(
    function (result) {

        barCodeResule = result.text;//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        $("#txtVTNo").val(barCodeResule);
        $("#txtVTNo").css('disabled', 'disabled');
        $('body').mLoading({
            text: "Please Wait..",
        });
        GetVehicleScanning(barCodeResule, '3',CreatedByUserId, OrganizationBranchId, OrganizationId);
    },
    function (error) {
        // alert("Scanning failed: " + error);
    },
    {
        preferFrontCamera: false, // iOS and Android
        showFlipCameraButton: true, // iOS and Android
        showTorchButton: true, // iOS and Android
        torchOn: true, // Android, launch with the torch switched on (if available)
        saveHistory: true, // Android, save scan history (default false)
        prompt: "Place a barcode inside the scan area", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats: "CODE_128,QR_CODE,PDF_417,QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,PDF417,RSS_EXPANDED", // default: all but PDF_417 and RSS_EXPANDED
        orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations: true, // iOS
        disableSuccessBeep: false // iOS
    }
 );
}

function fnExit() {
    window.location.href = 'Dashboard.html';
}
function fnClear() {
    $("#tbTable").hide('slow');
    $("#txtVTNo").val('');
    $("#ddlDockOpration").val('0');
    $("#txtTPSCheckIn").val('');
    $("#txtDockIn").val('');
    $("#txtDockOut").val('');
    $("#txtTPSCheckIn").hide();
    $("#txtDockIn").hide();
    $("#txtDockOut").hide();
    $("#lblTPSCheckIn").hide();
    $("#lblDockIn").hide();
    $("#lblDockOut").hide();
}

GetVehicleScanning = function (VTNo, OperationType, CreatedByUserId, OrganizationBranchId, OrganizationId) {
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/GetVehicleScanning",
        data: JSON.stringify({ VTNo: VTNo, OperationType: OperationType, CreatedByUserId: CreatedByUserId, OrganizationBranchId: OrganizationBranchId, OrganizationId: OrganizationId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            console.log()
            if (obj.length > 0) {
                $("#spnVehicleNo").text(obj[0].VEHICLENO);
                $("#spnDriverName").text(obj[0].DRIVERNAME);
                //$("#spnDriverNo").text(obj[0].DRIVERMOBILENO);
                //$("#spnSlotDockDetail").text(obj[0].ISCANCELLED);

                //var dt = obj[0].SLOTTIME;
                //dt1 = dt.replace(/\s/g, "/");
                //var latest = dt1.split("/");
                // alert(latest);
                $("#spnSlotDockDetail").text(obj[0].SLOTTIME);

                $("#divbtnInfo").fadeIn('slow');
                $("body").mLoading('hide');


            } else {
                $("#tbTable").hide('slow');
                $("#divbtnInfo").hide('slow');
                $("body").mLoading('hide');
                errmsg = "VT No. not found</br>";
                $.alert(errmsg);
                return;
            }
        },
        error: function (requestObject, error, errorThrown) {
        }
    });
}

TruckingCoStatusUpdate = function (OperationType, pVTNo, DriverDepartStatus, DriverReachStatus, DriverCompleteStatus) {
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/TruckingCoStatusUpdate",
        data: JSON.stringify({ OperationType: OperationType, pVTNo: pVTNo, DriverDepartStatus: DriverDepartStatus, DriverReachStatus: DriverReachStatus, DriverCompleteStatus: DriverCompleteStatus }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            $("#divbtnInfo").hide('slow');
            successMessage();
            setInterval(function () { window.location.href = "Exp_DriverDepartReach.html"; }, 3000);
        },
        error: function (requestObject, error, errorThrown) {
        }
    });
}

