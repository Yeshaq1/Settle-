"use strict";

// Class definition
var KTWizard1 = function () {
	// Base elements
	var wizardEl;
	var formEl;
	var validator;
	var wizard;

	// Private functions
	var initWizard = function () {
		// Initialize form wizard
		wizard = new KTWizard('kt_wizard_v1', {
			startStep: 1
		});

		// Validation before going to next page
		/*wizard.on('beforeNext', function (wizardObj) {
			if (validator.form() !== true) {
				wizardObj.stop();  // don't go to the next step
			}
		})
*/
		// Change event
		/*wizard.on('change', function (wizard) {
			setTimeout(function () {
				KTUtil.scrollTop();
			}, 500);
		});*/
	}

	var initValidation = function () {

		validator = formEl.validate({
			// Validate only visible fields
			ignore: ":hidden",

			// Validation rules
			rules: {
				//= Step 1
				"todo_phone[]": {
					number: true,
					maxlength: 10,
					minlength: 10
				},
				image: {
					accept: "image/jpeg, image/jpg, image/png, image/svg+xml"
				},
				todo_image: {
					accept: "image/jpeg, image/jpg, image/png, image/svg+xml"
				},
				"restaurent_phone[]": {
					number: true,
					maxlength: 10,
					minlength: 10
				},


			},

			// Display error  
			invalidHandler: function (event, validator) {
				KTUtil.scrollTop();

				swal.fire({
					"title": "",
					"text": "There are some errors in your submission. Please correct them.",
					"type": "error",
					"confirmButtonClass": "btn btn-secondary"
				});
			},

			// Submit valid form
			submitHandler: function (form) {
				console.log('ok2');

				$('#kt_form').submit();
			}
		});
	}

	var initSubmit = function () {
		var btn = formEl.find('[data-ktwizard-type="action-submit"]');

		btn.on('click', function (e) {
			e.preventDefault();
			let type = $('.locationType').val();
			console.log("hello");
			// for (instance in CKEDITOR.instances) {
			// 	CKEDITOR.instances[instance].updateElement();
			// }
			callsub();
			if (validator.form()) {
				// See: src\js\framework\base\app.js
				KTApp.progress(btn);
				//KTApp.block(formEl);

				// See: http://malsup.com/jquery/form/#ajaxSubmit
				formEl.ajaxSubmit({
					success: function () {
						KTApp.unprogress(btn);
						//KTApp.unblock(formEl);
						console.log('ok1');
						location.href = window.location.protocol + "/location/" + type + "/list";
						/*swal.fire({
							"title": "", 
							"text": "The application has been successfully submitted!", 
							"type": "success",
							"confirmButtonClass": "btn btn-secondary"
						});*/
					}
				});
			}
		});
	}

	return {
		// public functions
		init: function () {
			wizardEl = KTUtil.get('kt_wizard_v1');
			formEl = $('#kt_form');

			initWizard();
			initValidation();
			initSubmit();
		}
	};
}();

jQuery(document).ready(function () {
	KTWizard1.init();
});