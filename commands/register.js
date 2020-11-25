const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
	if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Você não tem permissão para isso!");
	
	const errorEmbed = new Discord.MessageEmbed()
	.setAuthor("Internal Error", message.author.displayAvatarURL({dynamic:true}))
	.setColor(client.color)
	.setDescription("Para registrar um usuário, eu preciso da seguinte permissão: **MANAGE_GUILD**");
	if (!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_GUILD")) return message.channel.send(errorEmbed);

	const roles = message.mentions.roles;
	const member = message.mentions.members.first() || client.guilds.cache.get(message.guild.id).members.cache.get(args[0]);
	const user = message.mentions.users.first() || client.users.cache.get(args[0]);

	if (!user || user == undefined || user == null){
		return message.channel.send("Você não mencionou nenhum usuario!")
	} else {
		if (!roles || roles == undefined){
			return message.channel.send("Mencione o usuario e os cargos!");
		} else {
			roles.map(e => {
				member.roles.add(e.id)
			})
			db.add(`UsersRegister_${message.author.id}_${message.guild.id}`, 1);
			const embed = new Discord.MessageEmbed();
			embed.setAuthor(user.username, user.displayAvatarURL({dynamic:true,format:'png',size:1024}));
			embed.setThumbnail(message.guild.iconURL({dynamic:true,size:1024}));
			embed.setFooter(`Registrador: ${message.author.username}`);
			embed.setColor(client.color)
			embed.addField("Registrar " + user.username, `Cargos Adicionados:` + roles.map(e => { return e }), true)
			message.channel.send(embed)
		}
	}
};

module.exports.help = {
	aliases: ['rg','register'],
	name: "registrar"
}