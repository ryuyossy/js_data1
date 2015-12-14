jQuery(function($, doc) {
	
	var domTxtSet = function(title, fkanji, lkanji, fkana, lkana, birth, gcheck) {
		$(".modal h2").text(title);
		$('.input_kanjiFirstName input').val(fkanji);
		$('.input_kanjiLastName input').val(lkanji);
		$('.input_kanaFirstName input').val(fkana);
		$('.input_kanaLastName input').val(lkana);
		$('.input_fullbirth input').val(U.checkBirthday(birth));
		doc.getElementById('genderWoman').checked = gcheck;
		doc.getElementById('genderMan').checked = !gcheck;
	};
	
	var dataSet = function(ckld, ckls) {
		var firstKanji = userData[ckld].dataKanjiFirst,
			lastKanji = userData[ckld].dataKanjiLast,
			first = userData[ckld].dataNameFirst,
			last =  userData[ckld].dataNameLast,
			gender = userData[ckld].dataGender,
			birthday = userData[ckld].dataBirthday,
			targetfirstKanji = userData[ckld].dataTargetNameKanjiFirst,
			targetlastKanji = userData[ckld].dataTargetNameKanjiLast,
			targetfirst = userData[ckld].dataTargetNameFirst,
			targetlast = userData[ckld].dataTargetNameLast,
			targetGender = userData[ckld].dataTargetGender,
			targetbirthday = userData[ckld].dataTargetBirthday,
			titleTxt = ckls == true ? 'あなたのお名前を登録' : '鑑定する方のお名前',
			firstkanjiTxt = ckls == true ? firstKanji : targetfirstKanji,
			lastKanjiTxt = ckls == true ? lastKanji : targetlastKanji,
			furiganaFirstTxt = ckls == true ? first : targetfirst,
			furiganaLastTxt = ckls == true ? last : targetlast,
			genderTxt = ckls == true ? gender : targetGender,
			birthdayTxt = ckls == true ? birthday : targetbirthday,
			genderChecked = genderTxt === 'F' ? true : false;
			domTxtSet(
				titleTxt, 
				firstkanjiTxt, 
				lastKanjiTxt, 
				furiganaFirstTxt, 
				furiganaLastTxt, 
				birthdayTxt, 
				genderChecked
			);
	};
	
	var dspSet = function(objElm) {
		var formName = [],
		modal = $('.modal');
		if(objElm.find('.js_kanjiFullName').size() <= 0) {
			formName.push('kanji');
		};
		if(objElm.find('.js_kanaFullName').size() <= 0) {
			formName.push('kana');
		};
		if(objElm.find('.js_fullbirth').size() <= 0) {
			formName.push('fullbirth');
		};
		if(objElm.find('.js_gender').size() <= 0) {
			formName.push('gender');
		};
		modal.find('dl').removeClass('off');
		formName.forEach(function(i) {
			modal.find('.' + i).addClass('off');
		});
	};
	
	var openPopup = function() {
		if(popup.getGestFlg()) {
			popup.openGuestPopup();
		} else {
			openModal(true);
		};
	};
	
	var openModalCallback = function() {
		currentKanteiClass = $(this).attr('class').indexOf('user') !== -1 ? true : false;
		currentKanteiId = $(this).parents('.btnArea').attr('id'),
		cld = $('#' + currentKanteiId);
		dataSet(currentKanteiId, currentKanteiClass);
		dspSet(cld);
		openPopup();
		return false;
	};
	
	$('.user, .target').bind('click', openModalCallback);
	
	var setReplace = function() {
		if (0 < $('.modal .kanji').size()) {
			firstKanji = $('.input_kanjiFirstName input').val().replace(/\s|　/g, '');
			lastKanji = $('.input_kanjiLastName input').val().replace(/\s|　/g, '');
			first = $('.input_kanaFirstName input').val().replace(/\s|　/g, '');
			last = $('.input_kanaLastName input').val().replace(/\s|　/g, '');
			gender = doc.getElementById("genderWoman").checked ? "F" :"M";
			birthday = $('.input_fullbirth input').val();
			b = birthday;
		} else {
			first = $('.input_kanaFirstName input').val().replace(/\s|　/g, '');
			last = $('.input_kanaLastName input').val().replace(/\s|　/g, '');
			birthday = $('.input_fullbirth input').val();
			b = birthday;
		}
		stgType = currentKanteiClass === true ? '_user' : '_target';
		b = b.substring(0, 4) + '年' + ' ' + b.substring(5, 7) + '月' + b.substring(8, 10) + '日';
		g = gender === 'F' ? '女性' : '男性';
	};
	
	var objectSet = function(crobj) {
		var objects = stgType === '_user' ? defaultUser : defaultTarget,
			objKanji = stgType === '_user' ? ".user .js_kanjiFullName" : ".target .js_kanjiFullName",
			objKana = stgType === '_user' ? ".user .js_kanaFullName" : ".target .js_kanaFullName",
			objGender = stgType === '_user' ? ".user .js_gender" : ".target .js_gender",
			objBirth = stgType === '_user' ? ".user .js_fullbirth" : ".target .js_fullbirth";
		if (objects['dataNameFirst'] !== '') {
			firstKanji = objects.dataKanjiFirst;
			lastKanji = objects.dataKanjiLast;
			first = objects.dataNameFirst;
			last = objects.dataNameLast;
			gender = objects.dataGender;
			birthday = objects.dataBirthday;
			crobj.find(objKanji).text(lastKanji + ' ' + firstKanji);
			crobj.find(objKana).text(last + ' ' + first);
			g = gender === 'F' ? '女性' : '男性';
			crobj.find(objGender).text(g);
			b = birthday.substring(0, 4) + '年' + ' ' + birthday.substring(5, 7) + '月' + birthday.substring(8, 10) + '日';
			crobj.find(objBirth).text(b);
		} else {
			crobj.find(objKanji).text('未設定');
			crobj.find(objKana).text('未設定');
			crobj.find(objGender).text('未設定');
			crobj.find(objBirth).text('未設定');
		}
		U.removeLocalStorage(userData[currentKanteiId].storageName + currentKanteiId + stgType);
	};
	
	var setLocalStorage = function() {
		U.saveLocalStorage(userData[currentKanteiId].storageName + currentKanteiId + stgType, {
			'firstName': first,
			'lastName': last,
			'firstKanjis': firstKanji,
			'lastKanjis': lastKanji,
			'gender': gender,
			'birthday': birthday,
		});
	};
	
	var formSetData = function(crobj) {
		if (currentKanteiClass) {
			crobj.find(".user .js_kanjiFullName").text(lastKanji + ' ' + firstKanji);
			crobj.find(".user .js_kanaFullName").text(last + ' ' + first);
			crobj.find(".user .js_fullbirth").text(b);
			crobj.find(".user .js_gender").text(g);
			userData[currentKanteiId].dataKanjiFirst = firstKanji;
			userData[currentKanteiId].dataKanjiLast = lastKanji;
			userData[currentKanteiId].dataNameFirst = first;
			userData[currentKanteiId].dataNameLast = last;
			userData[currentKanteiId].dataGender = gender;
			userData[currentKanteiId].dataBirthday = birthday;
		} else {
			crobj.find(".target .js_kanjiFullName").text(lastKanji + ' ' + firstKanji);
			crobj.find(".target .js_kanaFullName").text(last + ' ' + first);
			crobj.find(".target .js_fullbirth").text(b);
			crobj.find(".target .js_gender").text(g);
			userData[currentKanteiId].dataTargetNameKanjiFirst = firstKanji;
			userData[currentKanteiId].dataTargetNameKanjiLast = lastKanji;
			userData[currentKanteiId].dataTargetNameFirst = first;
			userData[currentKanteiId].dataTargetNameLast = last;
			userData[currentKanteiId].dataTargetGender = gender;
			userData[currentKanteiId].dataTargetBirthday = birthday;
		};
		crobj.find(".errorMsg").hide();
	};
	
	var formSetCallback = function() {
		setReplace();
		var currentObj = $('#' + currentKanteiId);
		if (
			!firstKanji && !lastKanji && !first && !last && !birthday 
			|| !first && !last && !birthday 
			|| !first && !last
		) {
			objectSet(currentObj);
			
		} else {
			setLocalStorage();
			formSetData(currentObj);
		}
		
		openModal(false, currentKanteiId);
		return false;
	};
	
	$('.modal button').bind('click', formSetCallback);
	
	$('.popup .after').click(function(){popup.openPopup(false);});
	
	var divinationSetData = function(ckid, curobj) {
		var ticketType = userData[ckid].dataTicketType,
			ticketCost = userData[ckid].dataTicketCost,
			historyUri = userData[ckid].historyUri,
			ticketCount = Number(ticketCost),
			contentIds = userData[ckid].dataContentId;
			postPass = '/report/' + contentIds + '/menu/';
		if (userTickets[ticketType] >= ticketCount) {
			var kanjiFirst = userData[ckid].dataKanjiFirst,
				kanjiLast = userData[ckid].dataKanjiLast,
				first = userData[ckid].dataNameFirst,
				last = userData[ckid].dataNameLast,
				gender = userData[ckid].dataGender,
				birthday = userData[ckid].dataBirthday,
				targetKanjiFirst = userData[ckid].dataTargetNameKanjiFirst,
				targetKanjiLast = userData[ckid].dataTargetNameKanjiLast,
				targetFirst = userData[ckid].dataTargetNameFirst,
				targetLast = userData[ckid].dataTargetNameLast,
				targetGender = userData[ckid].dataTargetGender,
				targetBirthday = userData[ckid].dataTargetBirthday;
			formSet.formWithSet(
				postPass + userData[ckid].dataMenuId,
				$('#rtoken').text(),
				userData.dataRole,
				ticketType,
				ticketCost,
				historyUri,
				first,
				last,
				kanjiFirst,
				kanjiLast,
				gender,
				birthday,
				targetFirst,
				targetLast,
				targetKanjiFirst,
				targetKanjiLast,
				targetGender,
				targetBirthday
			);
			if (curobj.find('.user').size() > 0) {
				if (!kanjiFirst || !kanjiLast || !first || !last || !birthday) {
					curobj.find('.errorMsg').text('お名前を正しく入力してください').show();
					return false;
				}
			} else if (curobj.find('.target').size() > 0) {
				if (!targetKanjiFirst || !targetKanjiLast || !targetFirst || !targetLast || !targetBirthday) {
					curobj.find('.errorMsg').text('お相手の情報を入力してください').show();
					return false;
				}
			}
			popup.openFortunePopup(ticketNames[userData[ckid].dataTicketType], userData[ckid].dataTicketCost);
			return false;
		}
	};
	
	var popupCheckTicket = function(ckid) {
		if (popup.getGestFlg()) {
			popup.openGuestPopup();
		} else if (popup.checkTickets(userData[ckid].dataTicketCost, userData[ckid].dataTicketType) > 0) {
			popup.openTicketPopup(popup.checkTickets(userData[ckid].dataTicketCost, userData[ckid].dataTicketType));
		}
	};
	
	var divinationSetCallback = function() {
		var currentKanteiId = $(this).parents('.btnArea').attr('id'),
			currentObj = $('#' + currentKanteiId);
		divinationSetData(currentKanteiId, currentObj);
		popupCheckTicket(currentKanteiId);
	};
	
	$('.btnArea button').bind('click', divinationSetCallback);
	
	(function() {
		var setUserInfo = function(obj, stgKeys, elemKanji, elemKana, elemGender, elemBirth, flagTypes) {
			var user = U.findLocalStorage(stgKeys);
			if (user) {
				var flags = flagTypes,
					first = user.firstName,
					last = user.lastName,
					firstKanji = user.firstKanjis,
					lastKanji = user.lastKanjis,
					gender = user.gender,
					g = gender === 'F' ? '女性' : '男性';
					b = user.birthday,
					birthday = b.substring(0, 4) + '年' + b.substring(5, 7) + '月' + b.substring(8, 10) + '日';
				elemKanji.text(lastKanji + ' ' + firstKanji);
				elemKana.text(last + ' ' + first);
				elemGender.text(g);
				elemBirth.text(birthday);
				if (flags) {
					obj.dataKanjiFirst = firstKanji;
					obj.dataKanjiLast = lastKanji;
					obj.dataNameFirst = first;
					obj.dataNameLast = last;
					obj.dataGender = gender;
					obj.dataBirthday = b;
				} else {
					obj.dataTargetNameKanjiFirst = firstKanji;
					obj.dataTargetNameKanjiLast = lastKanji;
					obj.dataTargetNameFirst = first;
					obj.dataTargetNameLast = last;
					obj.dataTargetGender = gender;
					obj.dataTargetBirthday = b;
				};
			};
		};
		
		for (keys in userData) {
			var element = $('#' + keys);
			setUserInfo(
				userData[keys], 
				userData[keys].storageName + userData[keys].menuBtnType + '_user',
				element.find('.user .js_kanjiFullName'),
				element.find('.user .js_kanaFullName'),
				element.find('.user .js_gender'),
				element.find('.user .js_fullbirth'),
				true
			);
			setUserInfo(
				userData[keys], 
				userData[keys].storageName + userData[keys].menuBtnType + '_target',
				element.find('.target .js_kanjiFullName'),
				element.find('.target .js_kanaFullName'),
				element.find('.target .js_gender'),
				element.find('.target .js_fullbirth'),
				false
			);
		}
		
	}());
		
}(jQuery, document));