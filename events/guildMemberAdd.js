const Discord = require("discord.js");
const db = require("quick.db");

module.exports = async (client, member) => {
	const welcomeChannelID = await db.fetch(`welcomeChannel_${member.guild.id}`);

	if (!welcomeChannelID || welcomeChannelID == null) return;

	console.log("[LOG]" + ` ${member.user.username} entrou no servidor ${member.guild.name}`);
	const channel = client.channels.cache.get(welcomeChannelID);

	const welMessage = await db.fetch(`welcomeMessage`)
	if (!welMessage || welMessage == null){
		let mensagem = `<@${member.id}> entrou no servidor!\nNão esqueça de ler as regras!\n\nAtualmente estamos com \`\`${member.guild.members.cache.size}\`\` membros`
	} else {
	  mensagem =	welMessage.replace("{user}", `<@${member.user.id}>`).replace("{guild}", member.guild.name).replace("{members}", member.guild.members.cache.size).replace("{space}","\n").replace("{tab}", "\n\n");
	}

	const welcomeEmbed = new Discord.MessageEmbed()
	.setAuthor(member.user.username, member.user.displayAvatarURL({dynamic:true}))
	.addField("Bem vindo", mensagem)
	.setThumbnail(member.user.displayAvatarURL({dynamic:true,size:1024}))
	.setColor(client.color)
	.setFooter(client.footer.replace("{server}", member.guild.name));
	channel.send(welcomeEmbed);
};