const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args, footer) => {
	const user = message.mentions.users.first() || client.users.cache.get(args[0]);
	const member = message.mentions.members.first() ||  client.guilds.cache.get(message.guild.id).members.cache.get(args[0])
	const channelId = await db.fetch(`logChannel_${message.guild.id}`);
	const channel = client.channels.cache.get(channelId)

	const errorEmbed = new Discord.MessageEmbed()
	.setAuthor("Internal Error", message.author.displayAvatarURL({dynamic:true}))
	.setColor(client.color)
	.setDescription("Para expulsar um usuário, eu preciso da seguinte permissão: **KICK_MEMBERS**");
	if (!message.guild.members.cache.get(client.user.id).hasPermission("KICK_MEMBERS")) return message.channel.send(errorEmbed);

	if (!user || user == null){
		const errorkickEmbed = new Discord.MessageEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
		.addField("kickir", `Por favor, mencione ou diga o id do usuario!`, true)
		.setThumbnail(message.author.displayAvatarURL({dynamic:true}))
		.setColor(client.color)
		.setFooter(footer)
		return	message.channel.send(errorkickEmbed);
	};

	if (user.id == message.author.id){
		const isAuthorEmbed = new Discord.MessageEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
		.addField("kickir", `Você não pode kickir á si mesmo!`, true)
		.setThumbnail(user.displayAvatarURL({dynamic:true}))
		.setColor(client.color)
		.setFooter(footer)
		return message.channel.send(isAuthorEmbed);
	};

	const sucesskickEmbed = new Discord.MessageEmbed()
	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
	.addField("Expulsar", `Você realmente deseja expulsar ${user.username}?`, true)
	.setThumbnail(user.displayAvatarURL({dynamic:true}))
	.setColor(client.color)
	.setFooter(footer);

	message.channel.send(sucesskickEmbed).then(msg => {
		msg.react("739580049145200750");

		const yesFilter = (r, u) => r.emoji.id === "739580049145200750" && u.id === message.author.id;
		const yes = msg.createReactionCollector(yesFilter);

		const ownerGuild = client.guilds.cache.get(message.guild.id).owner.id;

		yes.on('collect', async (r, u) => {
			var isKicked = false;
			try {
				if (user.id == ownerGuild){
					msg.delete()
					const notPermsEmbed = new Discord.MessageEmbed()
					.setDescription("Eu não posso expulsar esse usuario!")
					.setColor(client.color)
					.setFooter(footer)
					return msg.channel.send(notPermsEmbed);
				} else if (message.member.hasPermission("KICK_MEMBERS")){
					isKicked = true;
					msg.delete();
					member.kick({ reasons: "Teste" })
					db.add(`kickAuthorCount_${message.author.id}`, 1);
					const sucessEmbed = new Discord.MessageEmbed()
					.setDescription("Usuário expulso com sucesso")
					.setColor(client.color)
					.setFooter(footer)
					msg.channel.send(sucessEmbed)
				} else {
					msg.delete();
					const errorEmbed = new Discord.MessageEmbed()
					.setDescription("Você não possue permissão para expulsar esse usuaio!")
					.setColor(client.color)
					.setFooter(footer)
					return msg.channel.send(errorEmbed)
				}
			} catch (err) {
				const errorEmbed = new Discord.MessageEmbed()
				.setAuthor("Internal Error", message.author.displayAvatarURL({dynamic:true}))
				.setColor(client.color)
				.setDescription(`Ocorreu um erro ao tentar expulsar o usuário: **${user.username}**`);
				message.channel.send()
			};

			if (isKicked == true){
				const authorkickCount = await db.fetch(`kickAuthorCount_${message.author.id}`);
				const kickEmbedFeed = new Discord.MessageEmbed()
				.setAuthor(user.username, user.displayAvatarURL({dynamic:true}))
				.addField("Usuario Expulso", `O usuario ${user.username} foi expulso do servidor\n\n**Staff**: ${message.author.username}\n**Motivo**: nenhum`, true)
				.setThumbnail(user.displayAvatarURL({dynamic:true,format: "png",size: 1024}))
				.setColor(client.color)
				.setFooter("O staff " + message.author.username + ` ja expulsou 3 pessoas`);
				return channel.send(kickEmbedFeed);
			}
		});
	})
};

module.exports.help = {
	aliases: ["expulsar"],
	name: "kick"
}