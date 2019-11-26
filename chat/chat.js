// console.log('Hello World !!!');
// console.warn('Hello World !!!');
// console.error('Hello World !!!');

// let data = {
// 	foo: "bar",
// 	a: 5
// };

// console.log('Hello World !!!');
// console.log(data);

var Chat = {
	init: function(){
		console.log('Initializing the chat app');

		document.querySelector('#message-form').addEventListener('submit',function(event){
			event.preventDefault();

			let formData = new FormData(event.target);
			// console.log(formData.get('username'));
			let data = {
				author_name: formData.get('username'),
				author_color: formData.get('color').replace('#',''),
				message: formData.get('message'),
			};

			Chat.sendMessage(data);
			// console.log('My form was sent');
		});

		document.querySelectorAll('.actions-bar button').forEach(function(btn){
			btn.addEventListener('click', function(event){
				Chat.performAction(event.target.dataset.action);
			});
		});

		Chat.pollMessages(); // as first attempt will be after the interval sec so we manually started at the begining.
		
		Chat._pollInterval = setInterval(Chat.pollMessages, 3000);
		
		// let interval = setInterval(Chat.pollMessages, 10000);
		// clearInterval(interval);
	},

	_actionHandler: {
		clearLog: function(){
			document.querySelector('.chat-log').innerHTML = '';
		},
		toggleTimestamps: function(){
			document.querySelector('.chat-log').classList.toggle('no-timestamps');
		},
	},

	performAction: function(actionName){
		console.log('action performed:', actionName);

		if (typeof Chat._actionHandler[actionName] === "function"){
			Chat._actionHandler[actionName]();
		} else {
			console.error('Unknown action', actionName);
		}

	},

	_API_ROOT: 'https://real-webclass.gmetz.fr/chat/',

	sendMessage: async function(messageData){

		// let body = new URLSearchParams(messageData).toString();

		console.log('Sending message', messageData);

		Chat._API_ROOT
		let response = await fetch(Chat._API_ROOT + 'send.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(messageData).toString()
		});

		Chat.pollMessages();



		// messageData.author_color = messageData.author_color.replace('#','');
		// console.log('Sending message', messageData);
	},

	_latestId:0,

	pollMessages: async function(){
		console.log('Polling message');


		let response = await fetch(Chat._API_ROOT + 'get_messages.php?after_id='+Chat._latestId);
		let data = await response.json();

		if (!data.messages || data.messages.length == 0)
			return;

		const chatLog = document.querySelector('.chat-log');

		data.messages.forEach(function(message){
			if (message.id <= Chat._latestId)
				return;

			chatLog.insertAdjacentHTML('beforeend', `
				<p class="message">
					<span class="timestamp">${message.timestamp}</span>
					<span class="author-name">${message.author_name}</span> <span class="verb">:</span>
					<span class="content">${message.message}</span>
				</p>

				`);
		});

		Chat._latestId = data.messages[data.messages.length - 1].id

		chatLog.scrollTop = chatLog.scrollHeight
		// console.log('got response', response);
	}

};

document.addEventListener('DOMContentLoaded', function(event){
	Chat.init();

	// document.querySelector('#toggleButton').addEventListener
});


