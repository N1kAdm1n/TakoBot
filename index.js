const fs = require('fs');
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();

client.on('message', message => {
	if((message.channel.id =="718451613575938068")||(message.channel.id =="713101698150957136")) {
		console.log('Author: ' + message.author.username); console.log('Message: ' + message.content); message.react('➕'); message.react('➖');
	}
    	if (!message.author.bot){
        	let pun = message.content;
        	if ((pun.indexOf("Я ") == 0) || (pun.indexOf("я ") == 0)){
            	pun = pun.slice(2);
            	if ((pun.indexOf("Я ") == 0) || (pun.indexOf("я ") == 0)){
                	message.channel.send(`Привет, ${pun}!`)
            	} else {
                	message.channel.send(`Привет ${pun}!`);
            	}
        }
    }
});

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

client.login(client.config.discord.token);