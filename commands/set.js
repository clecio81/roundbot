const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args, footer) => {
	const channel = message.mentions.channels.first() ||  client.channels.cache.get(args[1]) || message.channel;

	switch(args[0]){
		case "entrada": {
			const errorEmbed = new Discord.MessageEmbed().setAuthor("Set Error", message.author.displayAvatarURL({dynamic:true})).setColor(client.color).setDescription("Para adicionar um canal de entrada, eu preciso da seguinte permissão: **MANAGE_MESSAGES**");
			if (!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed);
			db.set(`welcomeChannel_${message.guild.id}`, channel.id.toString())
			const welcomeEmbed = new Discord.MessageEmbed()
			.setAuthor("Canal de Entrada", message.guild.iconURL({dynamic:true}))
			.setDescription("O canal " + `\`\`${channel.name}\`\` foi setado como o canal de entrada!`)
			.setFooter(footer)
			.setColor(client.color)
			message.channel.send(welcomeEmbed)
			break;
		};

		case "saida": {
			const errorEmbed = new Discord.MessageEmbed().setAuthor("Set Error", message.author.displayAvatarURL({dynamic:true})).setColor(client.color).setDescription("Para adicionar um canal de saida, eu preciso da seguinte permissão: **MANAGE_MESSAGES**");
			if (!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed);
			db.set(`byeChannel_${message.guild.id}`, channel.id.toString())
			const welcomeEmbed = new Discord.MessageEmbed()
			.setAuthor("Canal de saida", message.guild.iconURL({dynamic:true}))
			.setDescription("O canal " + `\`\`${channel.name}\`\` foi setado como o canal de saida!`)
			.setFooter(footer)
			.setColor(client.color)
			message.channel.send(welcomeEmbed)
			break;
		};

		case "logs": {
			const errorEmbed = new Discord.MessageEmbed().setAuthor("Set Error", message.author.displayAvatarURL({dynamic:true})).setColor(client.color).setDescription("Para adicionar um canal de log, eu preciso da seguinte permissão: **ADMINISTRATOR**");
			if (!message.guild.members.cache.get(client.user.id).hasPermission("ADMINISTRATOR")) return message.channel.send(errorEmbed);
			db.set(`logChannel_${message.guild.id}`, channel.id.toString())
			const welcomeEmbed = new Discord.MessageEmbed()
			.setAuthor("Canal de logs", message.guild.iconURL({dynamic:true}))
			.setDescription("O canal " + `\`\`${channel.name}\`\` foi setado como um canal de logs!`)
			.setFooter(footer)
			.setColor(client.color)
			message.channel.send(welcomeEmbed)
			break;
		}
	};
};

module.exports.help = {
	aliases: ["setar"],
	name: "set"
}