// Class definition

var KTFormControls = function () {
    // Private functions
    
    var adminLoginForm = function () {
        $("#adminLoginForm").validate({
            // define validation rules
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true                    
                },
            },
            messages: {
                email: {
                    required: "Please enter your email address",
                    email: "Please enter your valid email address"
                },
                password: {
                    required: "Please enter password"                    
                }                
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form.submit();
            }
        });
    }

    var blankSpaceNotAllow = function () {
        $("input").on("keypress", function (e) {
            var startPos = e.currentTarget.selectionStart;
            if (e.which === 32 && startPos == 0)
                e.preventDefault();
        })
    }

    return {
        // public functions
        init: function () {
            adminLoginForm();
        }
    };
}();

jQuery(document).ready(function () {
    KTFormControls.init();
});