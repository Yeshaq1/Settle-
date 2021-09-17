"use strict";

// Class definition
var KTDashboard = function () {
    

    /*author count section start*/
    

    return {
        // Init demos
        init: function () {
            
            // demo loading
            var loading = new KTDialog({
                'type': 'loader',
                'placement': 'top center',
                'message': 'Loading ...'
            });
            loading.show();

            setTimeout(function () {
                loading.hide();
            }, 3000);
        }
    };
}();

// Class initialization on page load
jQuery(document).ready(function () {
    KTDashboard.init();
});