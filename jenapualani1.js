jQuery(function($, doc) {
	
	$('.user, .target').on('click', function() {
		currentKanteiClass = $(this).attr('class').indexOf('user') !== -1 ? true : false;
		currentKanteiId = $(this).parents('.btnArea').attr('id'),
		cld = $('#' + currentKanteiId);
		var firstKanji = userData[currentKanteiId].dataKanjiFirst,
			lastKanji = userData[currentKanteiId].dataKanjiLast,
			first = userData[currentKanteiId].dataNameFirst,
			last =  userData[currentKanteiId].dataNameLast,
			gender = userData[currentKanteiId].dataGender,
			birthday = userData[currentKanteiId].dataBirthday,
			targetfirstKanji = userData[currentKanteiId].dataTargetNameKanjiFirst,
			targetlastKanji = userData[currentKanteiId].dataTargetNameKanjiLast,
			targetfirst = userData[currentKanteiId].dataTargetNameFirst,
			targetlast = userData[currentKanteiId].dataTargetNameLast,
			targetGender = userData[currentKanteiId].dataTargetGender,
			targetbirthday = userData[currentKanteiId].dataTargetBirthday;
		var titleTxt = currentKanteiClass == true ? 'あなたのお名前を登録' : '鑑定する方のお名前',
			firstkanjiTxt = currentKanteiClass == true ? firstKanji : targetfirstKanji,
			lastKanjiTxt = currentKanteiClass == true ? lastKanji : targetlastKanji,
			furiganaFirstTxt = currentKanteiClass == true ? first : targetfirst,
			furiganaLastTxt = currentKanteiClass == true ? last : targetlast,
			genderTxt = currentKanteiClass == true ? gender : targetGender,
			birthdayTxt = currentKanteiClass == true ? birthday : targetbirthday,
			genderChecked = genderTxt === 'F' ? true : false;
		$(".modal h2").text(titleTxt);
		$('.input_kanjiFirstName input').val(firstkanjiTxt);
		$('.input_kanjiLastName input').val(lastKanjiTxt);
		$('.input_kanaFirstName input').val(furiganaFirstTxt);
		$('.input_kanaLastName input').val(furiganaLastTxt);
		$('.input_fullbirth input').val(U.checkBirthday(birthdayTxt));
		doc.getElementById('genderWoman').checked = genderChecked;
		doc.getElementById('genderMan').checked = !genderChecked;
		var formName = [],
			modal = $('.modal');
		if(cld.find('.js_kanjiFullName').size() <= 0) {
			formName.push('kanji');
		};
		if(cld.find('.js_kanaFullName').size() <= 0) {
			formName.push('kana');
		};
		if(cld.find('.js_fullbirth').size() <= 0) {
			formName.push('fullbirth');
		};
		if(cld.find('.js_gender').size() <= 0) {
			formName.push('gender');
		};
		modal.find('dl').removeClass('off');
		formName.forEach(function(i) {
			modal.find('.' + i).addClass('off');
		});
		if(popup.getGestFlg()) {
			popup.openGuestPopup();
		} else {
			openModal(true);
		};
		return false;
	});
	
	$('.modal button').on('click', function() {
		var currentObj = $('#' + currentKanteiId);
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
		if (!firstKanji && !lastKanji && !first && !last && !birthday || !first && !last && !birthday || !first && !last) {
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
				currentObj.find(objKanji).text(lastKanji + ' ' + firstKanji);
				currentObj.find(objKana).text(last + ' ' + first);
				g = gender === 'F' ? '女性' : '男性';
				currentObj.find(objGender).text(g);
				b = birthday.substring(0, 4) + '年' + ' ' + birthday.substring(5, 7) + '月' + birthday.substring(8, 10) + '日';
				currentObj.find(objBirth).text(b);
			} else {
				currentObj.find(objKanji).text('未設定');
				currentObj.find(objKana).text('未設定');
				currentObj.find(objGender).text('未設定');
				currentObj.find(objBirth).text('未設定');
			}
			U.removeLocalStorage(userData[currentKanteiId].storageName + currentKanteiId + stgType);
		} else {
			U.saveLocalStorage(userData[currentKanteiId].storageName + currentKanteiId + stgType, {
				'firstName': first,
				'lastName': last,
				'firstKanjis': firstKanji,
				'lastKanjis': lastKanji,
				'gender': gender,
				'birthday': birthday
			});
			currentObj.find(".errorMsg").hide();
			if (currentKanteiClass) {
				currentObj.find(".user .js_kanjiFullName").text(lastKanji + ' ' + firstKanji);
				currentObj.find(".user .js_kanaFullName").text(last + ' ' + first);
				currentObj.find(".user .js_fullbirth").text(b);
				currentObj.find(".user .js_gender").text(g);
				userData[currentKanteiId].dataKanjiFirst = firstKanji;
				userData[currentKanteiId].dataKanjiLast = lastKanji;
				userData[currentKanteiId].dataNameFirst = first;
				userData[currentKanteiId].dataNameLast = last;
				userData[currentKanteiId].dataGender = gender;
				userData[currentKanteiId].dataBirthday = birthday;
			} else {
				currentObj.find(".target .js_kanjiFullName").text(lastKanji + ' ' + firstKanji);
				currentObj.find(".target .js_kanaFullName").text(last + ' ' + first);
				currentObj.find(".target .js_fullbirth").text(b);
				currentObj.find(".target .js_gender").text(g);
				userData[currentKanteiId].dataTargetNameKanjiFirst = firstKanji;
				userData[currentKanteiId].dataTargetNameKanjiLast = lastKanji;
				userData[currentKanteiId].dataTargetNameFirst = first;
				userData[currentKanteiId].dataTargetNameLast = last;
				userData[currentKanteiId].dataTargetGender = gender;
				userData[currentKanteiId].dataTargetBirthday = birthday;
				console.log(userData['menu12Btn'].dataTargetNameFirst);
				console.log(userData['menu12Btn'].dataTargetNameLast);
			}
		}
		openModal(false, currentKanteiId);
		return false;
	});
	
	$('.popup .after').click(function(){
		popup.openPopup(false);
	});

	$('.btnArea button').on('click', function() {
		var currentKanteiId = $(this).parents('.btnArea').attr('id'),
			currentObj = $('#' + currentKanteiId),
			ticketType = userData[currentKanteiId].dataTicketType,
			ticketCost = userData[currentKanteiId].dataTicketCost,
			historyUri = userData[currentKanteiId].historyUri,
			ticketCount = Number(ticketCost),
			contentIds = userData[currentKanteiId].dataContentId;
			postPass = '/report/' + contentIds + '/menu/';
			console.log(currentKanteiId);
		if (userTickets[ticketType] >= ticketCount) {
			var kanjiFirst = userData[currentKanteiId].dataKanjiFirst,
				kanjiLast = userData[currentKanteiId].dataKanjiLast,
				first = userData[currentKanteiId].dataNameFirst,
				last = userData[currentKanteiId].dataNameLast,
				gender = userData[currentKanteiId].dataGender,
				birthday = userData[currentKanteiId].dataBirthday,
				targetKanjiFirst = userData[currentKanteiId].dataTargetNameKanjiFirst,
				targetKanjiLast = userData[currentKanteiId].dataTargetNameKanjiLast,
				targetFirst = userData[currentKanteiId].dataTargetNameFirst,
				targetLast = userData[currentKanteiId].dataTargetNameLast,
				targetGender = userData[currentKanteiId].dataTargetGender,
				targetBirthday = userData[currentKanteiId].dataTargetBirthday;
			if (currentObj.find('.user').size() > 0) {
				if (!kanjiFirst || !kanjiLast || !first || !last || !birthday) {
					currentObj.find('.errorMsg').text('お名前を正しく入力してください').show();
					return false;
				}
			}
			if (currentObj.find('.target').size() > 0) {
				if (!targetKanjiFirst || !targetKanjiLast || !targetFirst || !targetLast || !targetBirthday) {
					currentObj.find('.errorMsg').text('お相手の情報を入力してください').show();
					return false;
				}
			}
			formSet.formWithSet(
				postPass + userData[currentKanteiId].dataMenuId,
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
			popup.openFortunePopup(ticketNames[userData[currentKanteiId].dataTicketType], userData[currentKanteiId].dataTicketCost);
			return false;
		}
		if (popup.getGestFlg()) {
			popup.openGuestPopup();
		} else if (popup.checkTickets(userData[currentKanteiId].dataTicketCost, userData[currentKanteiId].dataTicketType) > 0) {
			popup.openTicketPopup(popup.checkTickets(userData[currentKanteiId].dataTicketCost, userData[currentKanteiId].dataTicketType));
		}
	});
	
	// Set Data
	(function() {
		function setUserInfo(obj, stgKeys, elemKanji, elemKana, elemGender, elemBirth, flagTypes) {
			var user = U.findLocalStorage(stgKeys);
			console.log(user);
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