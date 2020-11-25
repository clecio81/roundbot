const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args, footer) => {
	const welcomeId = await db.fetch(`welcomeChannel_${message.guild.id}`);
	const byeId = await db.fetch(`byeChannel_${message.guild.id}`);
	const logsId = await db.fetch(`logChannel_${message.guild.id}`)

	if (!welcomeId || welcomeId == null){
		var welcome = "nenhum";
	} else {
	  welcome = client.channels.cache.get(welcomeId).name;
	};

	if (!byeId || byeId == null){
		var bye = "nenhum";
	} else {
	  bye = client.channels.cache.get(byeId).name;
	};

	if (!logsId || logsId == null){
		var logs = "nenhum";
	} else {
	  logs = client.channels.cache.get(logsId).name;
	};

	const configEmbed = new Discord.MessageEmbed()
	.setAuthor("Config", message.guild.iconURL({dynamic:true}))
	.setThumbnail(message.guild.iconURL({dynamic:true,size:1024}))
	.addField("Entrada", `${welcome}`, true)
	.addField("Saida", `${bye}`, true)
	.addField("Logs", `${logs}`, true)
	.setColor(client.color)
	.setFooter(footer)
	message.channel.send(configEmbed)
};

module.exports.help = {
	aliases: ["cfg","cf"],
	name: "config"
}