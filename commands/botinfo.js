const discord = require("discord.js");

module.exports.run = async (client, message, args, footer) => {
	  let totalSeconds = process.uptime();
    let realTotalSecs = Math.floor(totalSeconds % 60);
    let days = Math.floor((totalSeconds % 31536000) / 86400);
    let hours = Math.floor((totalSeconds / 3600) % 24);
    let mins = Math.floor((totalSeconds / 60) % 60);
		let admin = client.users.cache.get('557746795543789568').username;

	const embed = new discord.MessageEmbed()
		.setAuthor('Round - Botinfo', client.user.displayAvatarURL({dynamic:true}))
		.setColor(client.color)
		.addField('<:timerz:734973074365218860> Tempo em que estou acordado', days + 'd ' + hours + 'h ' + mins + 'm ' + realTotalSecs +'s ', true)
		.addField('<:info2:739582712947671111> ' + '?' + 'help', ' para ver a lista completa de comandos que você tem acesso.')
		.addField('<:nodejs:739672396105121846> Linguagem', 'eu fui desenvolvido totalmente em Js')
		.addField('<a:upvote1:739580049056858223> Me adicione em seu Servidor', '[Clique Aqui](https://discordapp.com/api/oauth2/authorize?client_id='+ client.user.id +'&permissions=4700192718&scope=bot)', true)
		.addField('<:info2:739582712947671111> Servidor de Support', '[Clique Aqui](https://discord.gg/sXEt5Qt)', true)
		.addField('<:developer_rainbow:757028664826134628> Meu Desenvolvedor ', admin, true)
		.addField('<:policez:739580048796942346> Helper', `${admin} caso precise de ajuda.`, true)
		.setThumbnail(message.guild.iconURL({dynamic: true, format: 'png'}))
		.setFooter("Nekz Canary" + " ADM Version")
   message.channel.send(embed)
}

module.exports.help = {
	aliases: ["bti",'infobot'],
	name: "botinfo"
}