const rp = require('request-promise');
var tokens = ["xxx", "xxx"]; //all of the accounts you want to get inside the invite 
var success_messages = ["I'm totally not a bot!", "I'm a real manual user!", "I typed this message on my own!"]; //the bots will post this to the discord in random intervals to look like real users
var intervals = [1000, 3000, 6000, 10000]; //random intervals so the messages dont come all at once and seem sus
var l = ["https://discord.gg/", "http://discord.gg/", "discord.gg/", "https://discordapp.com/invite/", "http://discordapp.com/invite/", "discordapp.com/invite/"];

function timestamp() {
	var d = new Date();
	return `${d.getDate()}-${(d.getMonth()+1)}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
}

function randomFromArray(array) {
	var random_index = Math.floor(Math.random() * array.length);
	return array[random_index];
}

//twitter monitor code here
//variable inv for the final text you got
if (somethingsomething()) {
	console.log(`[${timestamp()}] Found a Discord Invite: ${inv} | Joining with all tokens`);
	var invite = !inv.includes("discord") ? inv : (inv.includes(l[0]) ? inv.replace(l[0]) : (inv.includes(l[1]) ? inv.replace(l[1]) : (inv.includes(l[2]) ? inv.replace(l[2]) : (inv.includes(l[3]) ? inv.replace(l[3]) : (inv.includes(l[4]) ? inv.replace(l[4]) : (inv.includes(l[5]) ? inv.replace(l[5]) : inv))))));
	var success_tokens = [];
	var success_channel = "";
	tokens.forEach(token => {
		var options = {
			method: 'POST',
			uri: `https://discordapp.com/api/v6/invite/${invite}`,
			headers: {
				"Connection": "keep-alive",
				"Authorization": token,
				"Accept-Language": "en-US",
				"User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36",
				"Origin": "https://discordapp.com",
				"Accept": "*/*"
			}
		};
		rp(options)
			.then(response => {
				var json = JSON.parse(response);
				if (json.guild) {
					success_channel = json.channel.id;
					console.log(`[${timestamp()}] Joined server "${json.guild.name}" using token "${token}"`);
					success_tokens.push(token);
				} else {
					console.log(`[${timestamp()}] Failed to join server using token "${token}"`);
				}
			})
			.catch(err => {
				console.log(err)
			});
	});
	console.log(`[${timestamp()}] Sending message "${message}" using token "${success_tokens[i]}"`);
	setTimeout(function () {
		for (var i = 0; i < success_tokens.length; i++) {
			setTimeout(i => {
				var message = randomFromArray(success_messages);
				var options = {
					method: 'POST',
					uri: `https://discordapp.com/api/v6/channels/${success_channel}/messages`,
					headers: {
						"Connection": "keep-alive",
						"Authorization": success_tokens[i],
						"Accept-Language": "en-US",
						"User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36",
						"Origin": "https://discordapp.com",
						"Content-Type": "application/json",
					},
					body: {
						'content': message
					},
					json: true
				};
				rp(options)
					.then(response => {
						if (response.attachment) {
							console.log(`[${timestamp()}] Successfully sent message "${message}" using token "${success_tokens[i]}"`);
							success_messages = success_messages.filter(v => v !== message);
						} else {
							console.log(`[${timestamp()}] Failed to send message "${message}" using token "${success_tokens[i]}"`);
						}
					})
					.catch(err => {
						console.log(err)
					});
			}, randomFromArray(intervals) * i, i);
		}
	}, 3000);
}

//optional code if the accounts are premade and not from real people (will make them seem online/busy/idle)
// const Discord = require('discord.js');
// const client = new Discord.Client();
// var tokens = ["token1", "2"];
// client.on('ready', () => {
// 	console.log(`Logged in as ${client.user.tag}!`);
// 	client.user.setStatus('idle').then(console.log).catch(console.error);
// 	client.user.setPresence({status: 'idle'}).then(console.log).catch(console.error);
// 	const client2 = new Discord.Client();
// 	client2.on('ready', () => {
// 		console.log(`Logged in as ${client2.user.tag}!`);
// 		client2.user.setStatus('dnd').then(console.log).catch(console.error);
// 		client2.user.setPresence({status: 'dnd'}).then(console.log).catch(console.error);
// 	});
// 	client2.login(tokens[1]);
// });
//
// client.login(tokens[0]);