const Discord = require("discord.js");
const db = require("quick.db");

module.exports = async (client, guild, user) => {
	const channelId = await db.fetch(`logChannel_${guild.id}`);
	const authorId = await db.fetch(`banAuthor_${guild.id}`);
	if (authorId) {
		const author = client.users.cache.get(authorId);
		const authorBanCount = await db.fetch(`banAuthorCount_${author.id}`)
		const channel = client.channels.cache.get(channelId);

		const banEmbed = new Discord.MessageEmbed()
		.setAuthor(user.username, user.displayAvatarURL({dynamic:true}))
		.addField("Usuario Banido", `O usuario ${user.username} foi banido do servidor\n\n**Staff**: ${author.username}\n**Motivo**: nenhum`, true)
		.setThumbnail(user.displayAvatarURL({dynamic:true,format: "png",size: 1024}))
		.setColor(client.color)
		.setFooter("O staff " + author.username + ` ja baniu ${authorBanCount} pessoas`);
		channel.send(banEmbed);
	};
};