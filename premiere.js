var premiereSet = {
	init: function() {
		U.addValidationForName();
		$('#birthdate, #birthdatePartner').change(U.bdFunc);
		$('#birthdate, #birthdatePartner').blur(U.bdFunc);
		U.bdFunc.call($('#birthdate'));
		AMB.chikuwa.ready(function() {
			var j = U.getData('lastHomeData');
			if (j) {    
				j = JSON.parse(j);
				U.initSetupScroll(j.pageYOffset);
				U.rememberData('lastHomeData', null);
			} else {
				if (!window.location.hash) {
					U.initSetupScroll();
				}
			}
			U.wireButtons();
		});
	},
	formWithSet: function(
		proceedAction,
		proceedToken,
		proceedRole,
		proceedType,
		proceedCost,
		proceedHistoryUri,
		proceedFirstName,
		proceedLastName,
		proceedFirst,
		proceedLast,
		proceedGender,
		proceedBirthday,
		proceedTargetFirstName,
		proceedTargetLastName,
		proceedTargetKanjiFirst,
		proceedTargetKanjiLast,
		proceedTargetGender,
		proceedTargetBirthday
	) 	{
		var x = jQuery('#formMain');
		jQuery('#editForm').on('touchstart', function() {
			var self = jQuery(this);
			x.attr('action', proceedAction);
			x.find('.formHidden').attr('value', proceedToken);
			x.find('#editForm').attr('data-role', proceedRole);
			x.find('#editForm').attr('data-ticket-type', proceedType);
			x.find('#editForm').attr('data-ticket-cost', proceedCost);
			x.find('#editForm').attr('data-history-uri', proceedHistoryUri);
			x.find('#editForm').attr('data-reading-uri', proceedAction);
			x.find('#cost').attr('value', proceedCost);
			x.find('#firstNameKana').attr('value', proceedFirstName);
			x.find('#lastNameKana').attr('value', proceedLastName);
			x.find('#firstName').attr('value', proceedFirst);
			x.find('#lastName').attr('value', proceedLast);
			x.find('#gender').attr('value', proceedGender);
			x.find('#birthday').attr('value', proceedBirthday);
			x.find('#targetFirstNameKana').attr('value', proceedTargetFirstName);
			x.find('#targetLastNameKana').attr('value', proceedTargetLastName);
			x.find('#targetFirstName').attr('value', proceedTargetKanjiFirst);
			x.find('#targetLastName').attr('value', proceedTargetKanjiLast);
			x.find('#targetGender').attr('value', proceedTargetGender);
			x.find('#targetBirthday').attr('value', proceedTargetBirthday);
			jQuery('#formMain').submit(function() {
				jQuery(self).attr('disabled', 'disabled');
			});
		});
	}
};

window.addEventListener('DOMContentLoaded', premiereSet.init(), false);

/*
$.ready(function() {
	U.addValidationForName();
	$('#birthdate, #birthdatePartner').change(U.bdFunc);
	$('#birthdate, #birthdatePartner').blur(U.bdFunc);
	U.bdFunc.call($('#birthdate'));
});

(function() {
	AMB.chikuwa.ready(function() {
		var j = U.getData('lastHomeData');
		if (j) {    
			j = JSON.parse(j);
			U.initSetupScroll(j.pageYOffset);
			U.rememberData('lastHomeData', null);
		} else {
			if (!window.location.hash) {
				U.initSetupScroll();
			}
		}
		U.wireButtons();
	});
}());
*/