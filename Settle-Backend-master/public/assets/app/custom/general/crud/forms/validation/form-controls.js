// Class definition

var KTFormControls = function () {
	// Private functions

	var adminLoginValidation = function () {
		$("#adminLoginForm").validate({
			rules: {
				email: {
					required: true,
					email: true
				},
				password: {
					required: true,
				},
			},
			messages: {
				email: {
					required: "Please enter your email",
					email: "Please enter valid email"
				},
				password: {
					required: "Please enter password",
				},
			},
			//display error alert on form submit  
			invalidHandler: function (event, validator) {
				KTUtil.scrollTop();
			},
			submitHandler: function (form) {
				form[0].submit();
			}
		});
	}




	var myProfileValidation = function () {
		$("#frmMyProfile").validate({
			// define validation rules
			rules: {
				first_name: {
					required: true,
					letterswithbasicpunc: true
				},
				last_name: {
					required: true,
					letterswithbasicpunc: true
				},
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				first_name: {
					required: "Please enter your first name",
					letterswithbasicpunc: "Please enter alphabets only"
				},
				last_name: {
					required: "Please enter your last name",
					letterswithbasicpunc: "Please enter alphabets only"
				},
				email: {
					required: "Please enter your email",
					email: "Please enter valid email"
				}
			},
			//display error alert on form submit  
			invalidHandler: function (event, validator) {
				KTUtil.scrollTop();
			},

			submitHandler: function (form) {
				form[0].submit();
			}
		});
	}

	var changePasswordValidation = function () {
		$("#changePasswordForm").validate({
			// define validation rules
			rules: {
				old_password: { required: true, },
				password: { required: true, minlength: 6 },
				password_confirm: { required: true, minlength: 6, equalTo: "#password" }
			},
			messages: {
				old_password: {
					required: "Please enter your old password",
					minlength: "Password must be atleast 6 characters length"
				},
				password: {
					required: "Please enter your new password",
				},
				password_confirm: {
					required: "Make sure that you have entered the same password here.",
					minlength: "Confirm password must be atleast 6 characters length",
					equalTo: "Confirm password must match with password"
				}
			},
			//display error alert on form submit  
			invalidHandler: function (event, validator) {
				KTUtil.scrollTop();
			},
			submitHandler: function (form) {
				form[0].submit();
			}
		});
	}

	var frmAddRestaurant = function () {
		$("#frmAddRestaurant").validate({
			// define validation rules
			rules: {
				restaurant_name: { required: true },
				email: { required: true },
				password: { required: true },
				restaurant_photos: { required: true },
			},
			messages: {
				restaurant_name: { required: "This field is required." },
				email: { required: "This field is required." },
				password: { required: "This field is required." },
				restaurant_photos: { required: "This field is required." },
			},
			//display error alert on form submit  
			invalidHandler: function (event, validator) {
				KTUtil.scrollTop();
			},
			submitHandler: function (form) {
				form[0].submit();
			}
		});
	}

	var frmEditRestaurant = function () {
		$("#frmEditRestaurant").validate({
			// define validation rules
			rules: {
				restaurant_name: { required: true },
				email: {
					required: true,
					email: true
				},
				password: { required: true },
				// restaurant_photos: { required: true },
			},
			messages: {
				restaurant_name: { required: "This field is required." },
				email: {
					required: "This field is required.",
					email: "Please enter a valid email."
				},
				password: { required: "This field is required." },
				// restaurant_photos: { required: "This field is required." },
			},
			//display error alert on form submit  
			invalidHandler: function (event, validator) {
				KTUtil.scrollTop();
			},
			submitHandler: function (form) {
				form[0].submit();
			}
		});
	}

	frmAddUserWebApp = function () {
		$("#frmAddUserWebApp").validate({
			// define validation rules
			rules: {
				first_name: { required: true },
				last_name: { required: true },
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true,
					//	phoneUS: true
				},
				zip_code: { required: true },
				// restaurant_photos: { required: true },
			},
			messages: {
				restaurant_name: { required: "This field is required." },
				email: {
					required: "This field is required.",
					email: "Please enter a valid email."
				},
				password: { required: "This field is required." },
				phone: {
					required: "This field is required.",
					//	phoneUS: "Please enter a valid phone no."
				},
			},
			//display error alert on form submit  
			invalidHandler: function (event, validator) {
				KTUtil.scrollTop();
			},
			submitHandler: function (form) {
				form[0].submit();
			}
		});
	}


	frmEditUserWebApp = function () {
		$("#frmEditUserWebApp").validate({
			// define validation rules
			rules: {
				first_name: { required: true },
				last_name: { required: true },
				email: { required: true },
				phone: {
					required: true,
					//	phoneUS: true
				},
				zip_code: { required: true },
				// restaurant_photos: { required: true },
			},
			messages: {
				restaurant_name: { required: "This field is required." },
				email: { required: "This field is required." },
				password: { required: "This field is required." },
				phone: {
					required: "This field is required.",
					//phoneUS: "Please enter a valid phone no."
				},
			},
			//display error alert on form submit  
			invalidHandler: function (event, validator) {
				KTUtil.scrollTop();
			},
			submitHandler: function (form) {
				form[0].submit();
			}
		});
	}

	var editCmsFrm = function () {
		$("#frmEditUserWebApp").validate({
			// define validation rules
			rules: {

			},
			messages: {

			},
			//display error alert on form submit  
			invalidHandler: function (event, validator) {
				KTUtil.scrollTop();
			},
			submitHandler: function (form) {
				form[0].submit();
			}
		});
	}

	return {
		// public functions
		init: function () {
			adminLoginValidation();
			myProfileValidation();
			changePasswordValidation();
			frmAddRestaurant();
			frmEditRestaurant();
			frmAddUserWebApp();
			frmEditUserWebApp();
			editCmsFrm();
		}
	};
}();

jQuery(document).ready(function () {
	KTFormControls.init();
});