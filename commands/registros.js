const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args, footer) => {
	const user = message.mentions.users.first() || message.author || client.users.cache.get(args[0]);
	const size = await db.fetch(`UsersRegister_${user.id}_${message.guild.id}`)

	if (user.id == message.author.id){
		var msg = 'Você registrou {count} usuários nesse servidor';
	} else {
		msg = 'O usuário {user} registrou {count} usuarios nesse servidor';
	};

	if (!size || size <= 0 || size == null){
		var membercount = 0;
	} else {
		membercount = size;
	}

	const embed = new Discord.MessageEmbed()
	.setAuthor('Usuarios Registrados', user.displayAvatarURL({dynamic:true,size:1024}))
	.setDescription(msg.replace('{user}', user.username).replace('{count}', membercount))
	.setThumbnail(message.guild.iconURL({dynamic:true, size:1024}))
	.setFooter(footer)
	.setColor(client.color);
	message.channel.send(embed)
};

module.exports.help = {
	aliases: ["rgu", "registers"],
	name: "registros"
}