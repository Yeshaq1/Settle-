const path = require('path')
let FCM = require('fcm-push');
let apn = require('apn');
let config = require('../config');
// ================= for ANDROID push Notification ==========================================
let serverKey = config.android_serverKey;
let fcm = new FCM(serverKey);
// console.log(10, config.ios_key);
// ================= for ANDROID push Notification ==========================================


// ================= IOS push Notification ==========================================
let options = {
  token: {
    key: config.ios_key,
    keyId: config.ios_keyId,
    teamId: config.ios_teamId
  },
  production: false
  // production: true
};

//console.log("23>>",options);
let apnProviderForDriver = new apn.Provider(options);
// ================= IOS push Notification ==========================================


exports.sendPushForChat = async function (notificationPayload, data, extra = {}) {
	try {
		//console.log("30>>", extra);
		//console.log("31>>",notificationPayload);
		//console.log("32>>",data);
		if (notificationPayload.deviceType.toLowerCase() == "ios") {
			// console.log('notificationPayload === ios ===', JSON.stringify(notificationPayload));
			let note = new apn.Notification();
			note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
			note.badge = extra.badgecount;
			note.title = data.title;
			note.payload = extra;
			note.body = data.body;
			note.sound = "default";
			note.topic = 'com.webskitters.AFU';
			//note.threadId = data.tag;
			//console.log(56, note);
			let result = await apnProviderForDriver.send(note, notificationPayload.deviceToken);
			//console.log("63 Successfully sent with response: ", JSON.stringify(result));
		}
		else {
			// console.log('notificationPayload === android ===', JSON.stringify(notificationPayload));
			let message = {
				to: notificationPayload.deviceToken,
				collapse_key: 'new_messages',
				data: extra,
				notification: {
					title: data.title,
					body: data.body,
					sound: 'default',
					click_action: data.clickAction,
					tag:data.tag
				},
				android: {
					priority: 'high'
				},
			};
			//console.log(59, message);
			let response = await fcm.send(message);
			//console.log("96 Successfully sent with response: ", JSON.stringify(response));
		}
	}
	catch (e) {
		return {status: 500,message: e.message}
	}
};