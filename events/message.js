const config = require("../src/config")
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (client, message) => {
	client.color = await db.fetch(`embedColor`);//#2f3136

		var prefix = config.prefix;
		if (!message.guild || message.author.bot) return;
		if (!message.content.startsWith(prefix)) return;
		let args = message.content.slice(1).trim().split(" ");
		if (!args) return;
		let command = args.shift().toLowerCase();
		const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
		if (!cmd) return;
		const footer = client.footer.replace("{server}", message.guild.name);
		cmd.run(client, message, args, footer);
};