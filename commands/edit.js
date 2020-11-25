const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args, footer) => {
	if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Você não tem permissões para isso");

	if (!args[0]){
		const embed = new Discord.MessageEmbed()
		.setDescription("Use ``?edit info <categoria-edição>``\nExemplo: ``?edit info entrada.message``")
		.setColor(client.color)
		.setFooter(footer)
		message.channel.send(embed)
	}

	const color = args[1];
	const messa = args.join(" ").replace('entrada.message',"")
	switch(args[0]){
		case "embed.color": {
			if (!color) return message.channel.send("Escolha um cor hex, exemplo: #31241s");
			db.set(`embedColor`, color.toString())
			const colorEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
			.setThumbnail(message.author.displayAvatarURL({dynamic:true}))
			.setDescription(`A cor das embeds foram alteradas para ${color}\n\nRecomendado usar cores que combine com o icone`)
			.setColor(client.color)
			.setFooter(footer)
			message.channel.send(colorEmbed)
			break;
		};

		case "entrada.message": {
			if (!messa) return message.channel.send("Escolha uma mensagem!");
			db.set(`welcomeMessage`, messa.toString())
			const messageEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
			.setThumbnail(message.author.displayAvatarURL({dynamic:true}))
			.setDescription(`A mensagem de entrada foi alterada para\n\n${messa}`)
			.setColor(client.color)
			.setFooter(footer)
			message.channel.send(messageEmbed)
			break;
		};
	};

};

module.exports.help = {
	aliases: ["edt"],
	name: "edit"
}