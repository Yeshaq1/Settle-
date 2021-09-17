$(function () {
    $(".form-validate").validate({
        errorPlacement: function(error, element)
        {
            error.insertAfter(element);
        }
    });
    $(".form-validate-signin").validate({
        errorPlacement: function(error, element)
        {
            error.insertAfter(element);
        }
    });
    $(".form-validate-signup").validate({
        rules: {
            age: {
                range: [0,100]
            }
        },
        errorPlacement: function(error, element)
        {
            error.insertAfter(element);
        }
    });
    
    $('#frmChangepass').validate({
        rules : {
            password : {
                minlength : 6
            },
            password_confirm : {
                minlength : 6,
                equalTo : "#password"
            }
        }
    });    

    // For product for validate //
    var names = "";
    $('.attribute').each(function() {
        names += $(this).attr('name') + " ";
    });
    names = $.trim(names);
    
    $('#productForm').validate({
        rules: {
            product_discount_percentage: {
            min: 1
            },
            'product_image': {
                required: $('#productForm').find("input[name=hid_product_image]").val() ? false : true,
                extension: "jpg|jpeg|png|gif"
            }
        },
        // other options,
        groups: {
            myGroup: names
        },
        errorPlacement: function(error, element)
        {
           if (element.attr('type') == 'checkbox') {
                error.insertAfter('#product_attr_table');
             } else {
                error.insertAfter(element);
             }
            
        }, messages: {
            'product_image': {
                required: "Please upload file.",
                extension: "Please upload file in these format only (jpg, jpeg, png, gif)."
            }
        }
    });

    $('.attribute').each(function () {
        $(this).rules('add', {
            require_from_group: [1, '.attribute']
        });
    });
    // For product for validate //
    
    
    // advertisement-form file upload extension checking
    $('#custom_registration').validate({
        rules: {
            'profile_image': {
                required: $('#custom_registration').find("input[name=hid_profile_image]").val() ? false : true,
                extension: "jpg|jpeg|png|gif"
            }
        },
        messages: {
            'profile_image': {
                required: "Please upload file.",
                extension: "Please upload file in these format only (jpg, jpeg, png, gif)."
            }
        }
    });

    // For banner image validation
    $('#form_banner').validate({
        rules: {
            'banner_image': {
                required: $('#form_banner').find("input[name=hid_banner_image]").val() ? false : true,
                extension: "jpg|jpeg|png|gif"
            }
        },
        messages: {
            'banner_image': {
                required: "Please upload file.",
                extension: "Please upload file in these format only (jpg, jpeg, png, gif)."
            }
        }
    });

    // For category image validation
    $('#form_category').validate({
        rules: {
            'category_image': {
                required: $('#form_category').find("input[name=hid_category_image]").val() ? false : true,
                extension: "jpg|jpeg|png|gif"
            }
        },
        messages: {
            'category_image': {
                required: "Please upload file.",
                extension: "Please upload file in these format only (jpg, jpeg, png, gif)."
            }
        }
    });

});