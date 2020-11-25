const Discord = require("discord.js");
const db = require("quick.db");

module.exports = async (client, member) => {
	const byeChannelId = await db.fetch(`byeChannel_${member.guild.id}`);

	if (!byeChannelId || byeChannelId == null) return;

	console.log("[LOG]" + ` ${member.user.username} saiu no servidor ${member.guild.name}`);
	const channel = client.channels.cache.get(byeChannelId);

	const welcomeEmbed = new Discord.MessageEmbed()
	.setAuthor(member.user.username, member.user.displayAvatarURL({dynamic:true}))
	.addField("Tchau", `<@${member.id}> saiu do servidor!\n\nAgora estamos com \`\`${member.guild.members.cache.size}\`\` membros`)
	.setThumbnail(member.user.displayAvatarURL({dynamic:true,size:1024}))
	.setColor(client.color)
	.setFooter(client.footer.replace("{server}", member.guild.name));
	channel.send(welcomeEmbed);
};