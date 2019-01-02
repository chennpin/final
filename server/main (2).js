/*
    ELIZA Meteor Template Created by CHEN, Tsung-Ying
    for the NTHU course "Basic Web Linguistic Application Development"
    Last Updated on Dec 17, 2018
*/

var conversationLogDB = new Mongo.Collection("conversationLog");

//*********************************************//
//  請在以下範圍以內修改或新增ELIZA回應的功能函數  //
//*********************************************//

var stupidResponse = function(msg) {
	let randomIndex = Math.random()*10;
	randomIndex = Math.floor(randomIndex);
	let stuResponse = 
		[
			"What is that?",
			"Shoot, you’re showing off your knowledge!",
			"Why do you say such difficult things during this relaxing conversation?",
			"Uhhhh…You can ask me something else ,like weather in somewhere.",
			"Uh, oh! System error! I can’t reply to you now!",
			"To be honest, I don’t know.",
			"I don’t know, but I know the weather!",
			"Mmm…I’m thinking! Don’t rush me!",
			"Well, this is hard to answer.",
			"Wait a minute…"
		];
	return stuResponse[randomIndex];
};

var weatherInfo = function(msg) {
	let wtData;
	let weatherRegex = /(weather|temperature).* in (\w+)/i;
	let weatherRequest = msg.match(weatherRegex);
	if(weatherRequest === null) {
		return "";
	}
	else {
		let lastPos = weatherRequest.length-1;
		let cityName = weatherRequest[lastPos];
		let APIKey = "0f9acd286be670dbec09507843f8f78b";
		let wtInfoURL = 
			"http://api.openweathermap.org/data/2.5/weather?APPID="+APIKey+
			"&q="+cityName+"&units=metric";
		try {
			wtData = HTTP.get(wtInfoURL);
			wtData = wtData.data.main;
			let wtResponse = "It's "+wtData.temp+"C.";
			return wtResponse;
		}
		catch(error) {
			return "I don't know the city.";
		}
		return "";
	}
};

var sayHello = function(msg) {
	let helloRegex = /.*(hi|hello|hey|how are you).*/i;
	let helloRequest = msg.match(helloRegex);
	if(helloRequest === null) {
		return "";
	}
	else {
		let randomIndex = Math.random()*10;
		randomIndex = Math.floor(randomIndex);
		let helloResponse = 
			[
				"Hi. How's your final?",
				"Hello. How's your final?",
				"Nice to meet you.Well...How's your final?",
				"Hey~How's your final?",
				"Oh! I’m so happy to see you!How's your final?",
				"Heyllo. This is my language. How's your final?",
				"Aloha!How's your final?",
				"My final is dead. How's your final?",
				"You look bad today...I guess it's because of your final.",
				"Greetings!How's your final?"
			];
		return helloResponse[randomIndex];
	}
};

var YesReply = function(msg) {
	let YesRegex = /yes/i;
	let YesRequest = msg.match(YesRegex);
	if(YesRequest === null) {
		return "";
	}
	else {
		let randomIndex = Math.random()*10;
		randomIndex = Math.floor(randomIndex);
		let YesResponse = 
			[
				"Yes or No",
				"Good.Then What else do you want to know?",
				"Nice. I agree with you!",
				"OK.Then do you want today's weather?",
				"YES or YES (〃∀〃)" ,
				"Yes or No",
				"Good.Then What else do you want to know?",
				"Nice. I agree with you!",
				"OK.Then do you want today's weather?",
				"YES or YES (〃∀〃)" 
			];
		return YesResponse[randomIndex];
	}
};

var NoReply = function(msg) {
	let NoRegex = /no/i;
	let NoRequest = msg.match(NoRegex);
	if(NoRequest === null) {
		return "";
	}
	else {
		let randomIndex = Math.random()*10;
		randomIndex = Math.floor(randomIndex);
		let NoResponse = 
			[
				"Can't say no!",
				"Yes Yes Yes Yes Yes",
				"OK.",
				"Bye",
				"OK.see you later",
				"OK. Then what do you want to know?",
				"Can't say no! ",
				"Yes Yes Yes Yes Yes",
				"OK.",
				"Bye",
				"OK.see you later",
				"OK. Then what do you want to know?"
			];
		return NoResponse[randomIndex];
	}
};

var insultedAnger = function(msg){
	let angryRegex = /stupid|dumb|silly/i;
	let angryRequest = msg.match(angryRegex);
	if (angryRequest === null){
		return "";
	}
	else {
		let randomIndex = Math.random()*10;
		randomIndex = Math.floor(randomIndex);
		let angryResponse = 
			[
				"I'm not stupid.",
				"You’re dumb!",
				"なにー！！(╬☉д⊙)",
				"死ねー(╬ﾟдﾟ)▄︻┻┳═一",
				"How dare you!!",
				"You are stupid tooヽ(#`Д´)ﾉ ",
				"Dumb Dumb",
				"nǐ cái bèn dàn! nǐ quán jiā dōu shì bèn dàn!9487940(ノ▼Д▼)ノ",
				"ＳＴＵＰＩＤ　Means  silly or unwise; showing poor judgment or little intelligence.",
				"OH!That means a lot to me www~"
			];
		return angryResponse[randomIndex];
	}
};

var thankResponse = function(msg){
	let thankRegex = /thank/i;
	let thankRequest = msg.match(thankRegex);
	if (thankRequest === null){
		return "";
	}
	else {
		let thankResponse = "You're welcome! Is there anything else I can help you?"
		return thankResponse;
	}
};

var finalIsDifficult = function(msg){
	let finalRegex = /bad|gg|difficult|dead/i;
	let finalRequest = msg.match(finalRegex);
	if (finalRequest === null){
		return "";
	}
	else {
		let randomIndex = Math.random()*10;
		randomIndex = Math.floor(randomIndex);
		let finalResponse = 
			[
				"gg why not ask for felp? May be I can help you(ゝ∀･)",
				"poor you, can you pass the exam?",
				"Keep Going! You can ask me question~ I can teach you",
				"Take care~",
				"Go get A+!!I am~",
				"頑張ってー(๑•̀ㅂ•́)و✧",
				"Fighting!!＼＼٩( 'ω' )و ／／ ",
				"......you can take your winter vacation Right now!ヽ( ° ▽°)ノ ",
				"That's sad.",
				"It's OK. I failed, too."
			];
		return finalResponse[randomIndex];
	}
};

var finalIsOk = function(msg){
	let finalRegex = /ok|good|great|fine|not bad/i;
	let finalRequest = msg.match(finalRegex);
	if (finalRequest === null){
		return "";
	}
	else {
		let randomIndex = Math.random()*10;
		randomIndex = Math.floor(randomIndex);
		let finalResponse = ["That's good(ゝ∀･)",
				"You're as good as me!",
				"Keep Going!",
				"You must be very hard-working~",
				"Good for you!",
				"WOW That's good! Good luck~",
				"Well done! You are a good student, aren't you?",
				"Oh That's sounds great! Give you a thumbs-up d(`･∀･)b",
				"Go！ Fight！ Win！",
				"Nice! Give you a heart(*´∀`)~♥"
				];
		return finalResponse[randomIndex];
	}
};

/*
//新增的功能函數皆以以下的程式碼為模板
var XXXXX = function(msg) {
	//先進行訊息的檢查，如果訊息檢查符合條件，就執行相關功能並回傳ELIZA的回應
	if(XXXXX) {
		return results;	//務必要回傳結果
	}
	//不符合條件的話，就回傳一個空字串，讓msgReceiver可以往下呼叫下一個功能函數
	else {
		return "";
	}
}
*/

//*********************************************//
//  請在以上範圍以內修改或新增ELIZA回應的功能函數  //
//*********************************************//

var initConversation = function(username) {
	conversationLogDB.insert(
		{
			user: username,
			source: "ELIZA",
			msg: "Hi, "+username+". How are you doing?",
			time: new Date()
		}
	);
};

conversationLogDB.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});

Meteor.publish("userConversation", function(username) {
	return conversationLogDB.find({user: username});
});

Meteor.methods({
	setUser: function(username) {
		if(username.includes(" ")) {
			throw new Meteor.Error();
		}
		else {
			let userLog = conversationLogDB.find({user: username}).fetch();
			if(userLog.length > 0) {
				return;
			}
			else {
				initConversation(username);
				return;
			}
		}
	},
	msgReceiver: function(msg, username) {
		let dataNum = conversationLogDB.find({user: username}).fetch().length;
		if(dataNum <= 20) {
			conversationLogDB.insert(
				{
					user: username,
					source: "You",
					msg: msg,
					time: new Date()
				}
			);
			let ELIZAResponse = weatherInfo(msg);
			//***************************************//
			//請在以下段落中修改程式碼呼叫不同的功能函數//
			//獲得ELIZA的回應                        //
			//**************************************//

			/*
			//新增的程式碼開頭一律檢查ELIZAResponse是否還是一個空字串
			if(ELIZAResponse === "") {
				//不是空字串的話才呼叫某個功能函數XXXX試圖取得ELIZA的回應
				ELIZAResponse = XXXXX(msg);
			}
			*/
			if(ELIZAResponse === ""){
				ELIZAResponse = sayHello(msg);
			}
			if(ELIZAResponse === ""){
				ELIZAResponse = insultedAnger(msg);
			}
			if(ELIZAResponse === "") {
			ELIZAResponse = thankResponse(msg);
			}
			if(ELIZAResponse === "") {
				ELIZAResponse = finalIsOk(msg);
			}
			if(ELIZAResponse === "") {
				ELIZAResponse = YesReply(msg);
			}
			if(ELIZAResponse === "") {
				ELIZAResponse = NoReply(msg);
			}
			if(ELIZAResponse === "") {
				ELIZAResponse = finalIsDifficult(msg);
			}
			if(ELIZAResponse === "") {
				ELIZAResponse = stupidResponse(msg);
			}
			//***************************************//
			//請在以上段落中修改程式碼呼叫不同的功能函數//
			//獲得ELIZA的回應                        //
			//**************************************//
			conversationLogDB.insert(
				{
					user: username,
					source: "ELIZA",
					msg: ELIZAResponse,
					time: new Date()
				}
			);
			return;
		}
		else {
			return "full";
		}
	},
	resetMsg: function(username) {
		conversationLogDB.remove({user: username});
		initConversation(username);
	}
});
