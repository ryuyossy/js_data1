var modal = {
	openFree  : function(url,data,cid) {
		modal.open(true,'free');
		jQuery('.free .info').addClass('off');
		jQuery('.free .text').addClass('loader');
		jQuery.ajax({
			type: 'post',
			url: url,
			data: data,
		}).done(function(data) {
			modal.close(cid);
			var r = data.report;
			var type = '<img ' + 'src="/resources/imgs/preToriumi/' + r.report.dataMap.seazon + 'Icon.png">';
			jQuery('.free .info').removeClass('off');
			jQuery('.free .name dd em').html(data.name);
			jQuery('.free .type dd').html(type);
			jQuery('.free .birthday dd').html(japaneseBirthday(r.user.birthday));
			jQuery('.free .text').removeClass('loader').html(r.report.pieceBody);
		}).fail(function() {
			modal.close(cid);
			jQuery('.free .text').removeClass('loader').html('エラーが発生しました。<br>もう一度やりなおしてください。');
		});
		return true;
	},
	open : function(flg,type,cId) {
		modal.close(cId);
		var classType = Boolean(type) ? '.' +  type : '';
		var elemBody = jQuery('body > *');
		var globals = window;
		elemBody.not('.modal' + ',.popup' + ',script')[(flg ? 'add' : 'remove') + 'Class']('off');
		jQuery('.modal' + classType)[(flg ? 'remove' : 'add') + 'Class']('off');
		if (!flg) {
			globals.location.href = '#' + cId;
		}
	},
	close: function(ckid) {
		var modalClose = jQuery('.modal .close');
		modalClose.click(function() {
			modal.open(false, false, ckid);
		});
	}
};


//「2011-1-1」のような文字列を「2011年1月1日」のような日本語に変換してくれる関数
var japaneseBirthday = function(str) {
		var birthdays = str.split('-'),
			birthday = {
				year : birthdays[0],
				month : birthdays[1],
				day : birthdays[2]
			},
			birthdayStr = birthday.year + '年' + birthday.month + '月' + birthday.day + '日';
			
	return birthdayStr;
}