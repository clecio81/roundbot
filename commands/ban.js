const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args, footer) => {
	const user = message.mentions.users.first() || client.users.cache.get(args[0]);
	const member = message.mentions.members.first() ||  client.guilds.cache.get(message.guild.id).members.cache.get(args[0])

	const errorEmbed = new Discord.MessageEmbed()
	.setAuthor("Internal Error", message.author.displayAvatarURL({dynamic:true}))
	.setColor(client.color)
	.setDescription("Para banir um usuário, eu preciso da seguinte permissão: **BAN_MEMBERS**");
	if (!message.guild.members.cache.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.channel.send(errorEmbed);

	if (!user || user == null){
		const errorBanEmbed = new Discord.MessageEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
		.addField("Banir", `Por favor, mencione ou diga o id do usuario!`, true)
		.setThumbnail(message.author.displayAvatarURL({dynamic:true}))
		.setColor(client.color)
		.setFooter(footer)
		return	message.channel.send(errorBanEmbed);
	};

	if (user.id == message.author.id){
		const isAuthorEmbed = new Discord.MessageEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
		.addField("Banir", `Você não pode banir á si mesmo!`, true)
		.setThumbnail(user.displayAvatarURL({dynamic:true}))
		.setColor(client.color)
		.setFooter(footer)
		return message.channel.send(isAuthorEmbed);
	};

	const sucessBanEmbed = new Discord.MessageEmbed()
	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
	.addField("Banir", `Você realmente deseja banir ${user.username}?`, true)
	.setThumbnail(user.displayAvatarURL({dynamic:true}))
	.setColor(client.color)
	.setFooter(footer);

	message.channel.send(sucessBanEmbed).then(msg => {
		msg.react("739580049145200750");

		const yesFilter = (r, u) => r.emoji.id === "739580049145200750" && u.id === message.author.id;
		const yes = msg.createReactionCollector(yesFilter);

		const ownerGuild = client.guilds.cache.get(message.guild.id).owner.id;

		yes.on('collect', (r, u) => {
			try {
				if (user.id == ownerGuild){
					msg.delete()
					const notPermsEmbed = new Discord.MessageEmbed()
					.setDescription("Eu não posso banir esse usuario!")
					.setColor(client.color)
					.setFooter(footer)
					return msg.channel.send(notPermsEmbed);
				} else if (message.member.hasPermission("BAN_MEMBERS")){
					db.set(`banAuthor_${message.guild.id}`, message.author.id);
					db.add(`banAuthorCount_${message.author.id}`, "1");
					msg.delete();
					member.ban({ reasons: "Teste" })
					const sucessEmbed = new Discord.MessageEmbed()
					.setDescription("Usuário banido com sucesso")
					.setColor(client.color)
					.setFooter(footer)
					return msg.channel.send(sucessEmbed)
				} else {
					msg.delete();
					const errorEmbed = new Discord.MessageEmbed()
					.setDescription("Você não possue permissão para banir esse usuaio!")
					.setColor(client.color)
					.setFooter(footer)
					return msg.channel.send(errorEmbed)
				}
			} catch (err) {
				const errorEmbed = new Discord.MessageEmbed()
				.setAuthor("Internal Error", message.author.displayAvatarURL({dynamic:true}))
				.setColor(client.color)
				.setDescription(`Ocorreu um erro ao tentar banir o usuário: **${user.username}**`);
				message.channel.send()
			}
		});
	})
};

module.exports.help = {
	aliases: ["banir"],
	name: "ban"
}