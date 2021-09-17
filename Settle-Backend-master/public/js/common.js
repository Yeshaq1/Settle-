$(document).ready(function () {
	var navListItems = $('div.setup-panel div a'),
		allWells = $('.setup-content'),
		allNextBtn = $('.nextBtn'),
		allPrevBtn = $('.prevBtn');

	allWells.hide();
	navListItems.click(function (e) {
		e.preventDefault();
		var $target = $($(this).attr('href')),
			$item = $(this);
		if (!$item.hasClass('disabled')) {
			navListItems.removeClass('btn-primary').addClass('btn-default');
			$item.addClass('btn-primary').removeClass('btn-default');
			allWells.hide();
			$target.show();
			$target.find('input:eq(0)').focus();
		}
	});

	allPrevBtn.click(function () {
		var curStep = $(this).closest(".setup-content"),
			curStepBtn = curStep.attr("id"),
			prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
		prevStepWizard.removeAttr('disabled').trigger('click');
	});

	allNextBtn.click(function () {
		var curStep = $(this).closest(".setup-content"),
			curStepBtn = curStep.attr("id"),
			nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
			curInputs = curStep.find("input[type='text'],input[type='url']"),
			isValid = true;

		$(".form-group").removeClass("has-error");
		for (var i = 0; i < curInputs.length; i++) {
			if (!curInputs[i].validity.valid) {
				isValid = false;
				$(curInputs[i]).closest(".form-group").addClass("has-error");
			}
		}
		if (isValid)
			nextStepWizard.removeAttr('disabled').trigger('click');
	});
	$('div.setup-panel div a.btn-primary').trigger('click');
});

$(document).ready(function () {
	$('#kt_datepicker_1_modal').datepicker({
		rtl: KTUtil.isRTL(),
		todayHighlight: true,
		orientation: "bottom left",
		format: 'mm-dd-yyyy',
		//templates: arrows
	});

	$('#kt_daterangepicker_2').daterangepicker({
		buttonClasses: ' btn',
		applyClass: 'btn-primary',
		cancelClass: 'btn-secondary',
		autoclose: true,
		clearBtn: true,
		dateFormat: 'YYYY-MM-DD',
	}, function (start, end, label) {
		$('#kt_daterangepicker_2 .form-control').val(start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
	});

	$('#kt_daterangepicker_3').daterangepicker({
		buttonClasses: ' btn',
		applyClass: 'btn-primary',
		cancelClass: 'btn-secondary',
		autoclose: true,
		clearBtn: true
	}, function (start, end, label) {
		$('#kt_daterangepicker_3 .form-control').val(start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
	});

});

$('.ansSelect').change(function () {
	if ($(this).val() == "Selective") {
		$('#answerDiv').css('display', 'block');
		$("[name^=answer]").each(function () {
			$(this).rules("add", { required: true, messages: { required: "Answer is required", } });
		});
	}
	else {
		$('#answerDiv').css('display', 'none');
		$("[name^=answer]").each(function () {
			$(this).rules('remove', 'required');
		});
	}
});

var addButton = $('.btnAdd');
var wrapper = $('#contentAnswer');
var editButton = $('.btnAddEdit');

$(addButton).click(function () {
	var existAnswerText = $('.answer_input').length;
	var x = parseInt(existAnswerText) + parseInt(1);

	var fieldHTML = '<div class="form-group row"><div class="col-lg-10"><input type="text" name="answer[' + x + ']" id="answer' + x + '" class="form-control answer_input required" placeholder="Enter Answer"></div><div class="col-lg-2"><button class="remove_button btn btn-danger btn-elevate btn-elevate-air">Remove</button></div></div></div><p></p>';
	$(wrapper).append(fieldHTML);

	$("[name^=answer]").each(function () {
		$(this).rules("add", { required: true, messages: { required: "Answer is required", } });
	});
	x++;
});

$(wrapper).on('click', '.remove_button', function (e) {
	e.preventDefault();
	$(this).parent('div').parent('div').remove();
	x--;
});

$('.remove_button').click(function (e) {
	e.preventDefault();
	$(this).parent('div').parent('div').remove();
});

$(editButton).click(function () {
	var count = $('.answer_input_edit').length;
	var newcount = parseInt(count) + parseInt(1)
	var fieldHTML = '<div id="testdiv" class="form-group row"><div class="col-lg-10"><input type="text" name="answer[' + newcount + ']" id="answerE' + newcount + '" class="form-control answer_input_edit" placeholder="Enter Answer"></div><div class="col-lg-2"><button class="remove_button btn btn-danger btn-elevate btn-elevate-air">Remove</button></div></div></div> <p></p>';
	$(wrapper).append(fieldHTML);

	$("[name^=answer]").each(function () {
		$(this).rules("add", { required: true, messages: { required: "Answer is required", } });
	});
	newcount++;
});


// add adoptprocess
$(function () {
	var i = 1;

	if ($("#editCurrentIndex").val()) {
		var i = $("#editCurrentIndex").val();
	}
	$("#addMore").click(function (e) {
		e.preventDefault();
		var adoptprocesstitle = $(".adoptprocesstitle").html();
		$("#fieldList").append(`<div class="row row-` + i + `">
		<div class="col-lg-12">
		`+ adoptprocesstitle + `
		</div>
		<div class="col-lg-12">
		<br>
		<label>Description:</label>
		<textarea name="adoption_description[]" class="form-control required" required cols="30" rows="10"></textarea>
   </div>
		<div class="col-lg-2">
    <button class="btn btn-danger" type="button" onclick="removeIn(`+ i + `)" style="margin-top: 24px;">Remove <i class="fas fa-trash"></i></button>
    </div>
</div>`);
		i++;
	});
});

function removeIn(index) {
	$('.row-' + index).remove();
}
//end

$(document).on('click', '.clickBanner', function (e) {
	//alert("hi");
	e.preventDefault();
	let id = $('.restaurantId').val();
	let imagename = $(this).attr('id');
	swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'No, cancel!',
		reverseButtons: true
	}).then(function (result) {
		if (result.value) {
			window.location.href = `${window.location.protocol}//${window.location.host}/restaurant/deletephotos/${id}/${imagename}`;
		}
	});
});

$(document).ready(() => {
	if ($("#lastIndex").val() && $("#lastIndex").val() != "") {
		var i = $("#lastIndex").val();
	}
	else {
		var i = 0;
	}

	$('#addInputFieldBtn').click(() => {
		i++;
		$('#dynamic_field').append(`
		
			<div  id="row${i}">
					<div class="row">
							<div class="col-lg-6">
									<div class="form-group">
											<label for="name" class="control-label">Seat Title</label>
											<div class="controls">
													<input type="text" name="seat[]" class="form-control" required>
											</div>
									</div>
							</div>
							<div class="col-lg-2">
							<label class="w-100 d-block">&#160;</label>
							<button type="button" class="btn btn-danger btn_remove" name="remove" id="${i}" onClick="removeInput(this.id)" >X</button>
					</div>
					</div>
					</div>
				
			`);


	});

});

function removeInput(id) {
	$(`#row${id}`).remove();
};

