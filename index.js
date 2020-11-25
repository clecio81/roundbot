const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require("discord.js");
const client = new Discord.Client();
const Canvacord = require("canvacord");
const fs = require("fs");
const config = require("./src/config");
const db = require("quick.db");

client.db = require("quick.db");
client.canvas = Canvacord;
client.owner = '557746795543789568';
client.cto = '489820999164887050';
client.footer = config.footer;
client.commands = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = {
    TOKEN: config.token,
    prefix: config.prefix,
    cooldown: 15000
};

// Load Commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
		console.log(`[LOG] Carregando ${files.lenght} comandos [CARREGAMENTO]`);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        let command = require(`./commands/${f}`);
        client.commands.set(command.help.name, command);
				command.help.aliases.forEach(alias => {
					client.aliases.set(alias, command.help.name);
			});
    });
});

// Events handler
fs.readdir('./events/', (err, evtFiles) => {
  	console.log(`[LOG] Carregando ${evtFiles.length} eventos.[CARREGAMENTO]`);
  	evtFiles.forEach(file => {
			const eventName = file.split('.')[0];
			const event = require(`./events/${file}`);
  		client.on(eventName, event.bind(null, client));
	});
})

client.login(config.token);

setInterval(() => fetch(`https://pwbot.halokodein1.repl.co/`), 3 * 60 * 1000);