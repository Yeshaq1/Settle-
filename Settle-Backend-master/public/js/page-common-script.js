/*=========================================================================================
    File Name: datatables-styling.js
    Description: Styling Datatable
    ----------------------------------------------------------------------------------------
    Item Name: Apex - Responsive Admin Theme
    Version: 2.1
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(document).ready(function() {
    var $loginHolder = $('#login-holder');
    var $forgotPasswordHolder = $('#forgot-password-holder');
    var $forgotPasswordBtn = $('#forgot-password-btn');
    var $loginBtn = $('#login-btn');

    $loginHolder.show();
    $forgotPasswordHolder.hide();

    $forgotPasswordBtn.click(function () {
        if ($loginHolder.is(':visible')) {
            $loginHolder.hide();
            $forgotPasswordHolder.show();
        }
    });

    $loginBtn.click(function () {
        if ($forgotPasswordHolder.is(':visible')) {
            $loginHolder.show();
            $forgotPasswordHolder.hide();
        }
    });

    if($('.dataTableList').length > 0){
        $('.dataTableList').DataTable({
            columnDefs: [ { orderable: false, targets: [-1] } ]
        });
    }
});

$("input,select,textarea").not("[type=submit]").jqBootstrapValidation();

$color = $(this).data('color');
var $colors = {
    'primary': "#967ADC",
    'success': "#37BC9B",
    'danger': "#DA4453",
    'warning': "#F6BB42",
    'info': "#3BAFDA"
};
if ($color !== undefined) {
    $colorCode = $colors[$color];
}
else {
    $colorCode = "#37BC9B";
}

//var switchery = new Switchery($('.switchery')[0], { color: $colorCode });
