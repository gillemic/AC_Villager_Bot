// Load up the discord.js library
const Discord = require('discord.js');

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require('./config.json');
const villagers = require('./villagers.json');
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on('ready', () => {
	// This event will run if the bot starts, and logs in, successfully.
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	// Example of changing the bot's playing game to something useful. `client.user` is what the
	// docs refer to as the "ClientUser".
	client.user.setPresence({ game: { name:'Animal Crossing', type: 'STREAMING' } })
		.then(console.log(`Activity set to ${client.user.presence.game.name}`))
		.catch(console.error);
});

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

client.on('message', async message => {
	// This event will run on every single message received, from any channel or DM.

	// It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    
	if(message.author.bot) return;

	// Here we separate our "command" name, and our "arguments" for the command.
	// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	// command = say
	// args = ["Is", "this", "the", "real", "life?"]
	const text = message.content.toLowerCase();
	const args = text.split(/ +/g);

	const channelID = message.channel.id;

	if (args[0] == 'villager') {
		// slice the names from the end of the string
		const names = args.slice(2);
		
		// switch statement for all command options
		switch(args[1]) {
			case 'birthday':
			case 'birthdays':
				if (names.length == 1) {
					const n = names[0].capitalize();
					if (villagers[n]["birthday"]) {
						const bd = villagers[n]["birthday"];
						message.channel.send(bd);
					}
					else {
						message.channel.send(`No villager named ${n}`);
					}
				}
				else if (names.length > 1) {
					let reply = "";
					const l = names.length;
					for (let i = 0; i < l; i++) {
						const n = names[i].capitalize();
						if (villagers[n]["birthday"]) {
							const bd = villagers[n]["birthday"];
							reply += `${n}: ${bd}\n`;
						}
						else {
							reply += `No villager named ${n}\n`;
						}
					}
					message.channel.send(reply.slice(0, -1));
				}
				else {
					message.channel.send(`Incorrect usage. Format is \`villager birthday [name(s)]\``);
				}
				break;
			case 'personality':
			case 'personalities':
			case 'personalitys':
				if (names.length == 1) {
					const n = names[0].capitalize();
					if (villagers[n]["personality"]) {
						const p = villagers[n]["personality"];
						message.channel.send(p);
					}
					else {
						message.channel.send(`No villager named ${n}`);
					}
				}
				else if (names.length > 1) {
					let reply = "";
					const l = names.length;
					for (let i = 0; i < l; i++) {
						const n = names[i].capitalize();
						if (villagers[n]["personality"]) {
							const p = villagers[n]["personality"];
							reply += `${n}: ${p}\n`;
						}
						else {
							reply += `No villager named ${n}\n`;
						}
					}
					message.channel.send(reply.slice(0, -1));
				}
				else {
					message.channel.send(`Incorrect usage. Format is \`villager personality [name(s)]\``);
				}
				break;
			case 'species':
				if (names.length == 1) {
					const n = names[0].capitalize();
					if (villagers[n]["species"]) {
						const s = villagers[n]["species"];
						message.channel.send(s);
					}
					else {
						message.channel.send(`No villager named ${n}`);
					}
				}
				else if (names.length > 1) {
					let reply = "";
					const l = names.length;
					for (let i = 0; i < l; i++) {
						const n = names[i].capitalize();
						if (villagers[n]["species"]) {
							const s = villagers[n]["species"];
							reply += `${n}: ${s}\n`;
						}
						else {
							reply += `No villager named ${n}\n`;
						}
					}
					message.channel.send(reply.slice(0, -1));
				}
				else {
					message.channel.send(`Incorrect usage. Format is \`villager species [name(s)]\``);
				}
				break;
			case 'catchphrase':
			case 'catch-phrase':
				if (names.length == 1) {
					const n = names[0].capitalize();
					if (villagers[n]["catchphrase"]) {
						const c = villagers[n]["catchphrase"];
						message.channel.send(c);
					}
					else {
						message.channel.send(`No villager named ${n}`);
					}
				}
				else if (names.length > 1) {
					let reply = "";
					const l = names.length;
					for (let i = 0; i < l; i++) {
						const n = names[i].capitalize();
						if (villagers[n]["catchphrase"]) {
							const c = villagers[n]["catchphrase"];
							reply += `${n}: ${c}\n`;
						}
						else {
							reply += `No villager named ${n}\n`;
						}
					}
					message.channel.send(reply.slice(0, -1));
				}
				else {
					message.channel.send(`Incorrect usage. Format is \`villager catchphrase [name(s)]\``);
				}
				break;
			case 'image':
			case 'picture':
				if (args.length < 3) {
					message.channel.send(`Incorrect usage. Format is \`villager image [name]\``);
				}
				const n = names[0].capitalize();
				const id = Object.keys(villagers).indexOf(n);
				if (id !== -1) {
					const url = `./img/${n}.png`;
					message.channel.send({ files: [url] });
				}
				else {
					message.channel.send(`No villager named ${n}\n`);
				}
				break;
			case 'bio':
				if (args.length < 3) {
					message.channel.send(`Incorrect usage. Format is \`villager bio [name]\``);
				}
				const m = names[0].capitalize();
				const index = Object.keys(villagers).indexOf(m);
				let reply = "";
				if (index !== -1) {
					console.log(villagers[m]);
					for (const prop in villagers[m]) {
						reply += `${prop}: ${villagers[m][prop]}\n`;
					}
					const url = `./img/${m}.png`;
					message.channel.send(reply.slice(0, -1), { files: [url] });
				}
				else {
					message.channel.send(`No villager named ${m}\n`);
				}
				break;
			default:
				message.channel.send(`Invalid command. Villager commands so far are: \`birthday, personality, species, catchphrase, image\` or \`bio\``);
		}
	}
});

client.login(config.AC_token);