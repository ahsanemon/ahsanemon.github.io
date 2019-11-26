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
	},

	sendMessage: function(messageData){
		console.log('Sending message', messageData);
		// messageData.author_color = messageData.author_color.replace('#','');
		console.log('Sending message', messageData);
	},
};

document.addEventListener('DOMContentLoaded', Chat.init);

function toggleTimestamp() {
	var x = document.getElementsByClassName('timestamp');
	var element;
	for (element = 0; element < x.length; element++) {

		if (x[element].style.display === "none") {
			x[element].style.display = "block";
		} else {
			x[element].style.display = "none";
		}
	}
}