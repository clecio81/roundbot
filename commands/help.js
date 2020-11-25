const Discord = require('discord.js');

module.exports.run = async (client, message, args, footer) => {
	if (!args[0]){
		const embed = new Discord.MessageEmbed()
		//.setAuthor(client.user.username + ' Ajuda', client.user.displayAvatarURL({dynamic:true}))
		.setDescription(`
		<:info2:739582712947671111> **Comandos**\n
		?ban @user - banir um usuario\n
		?kick @user - expulsar um usuario\n
		?register @user @cargos - registrar um usuario\n
		?registros @user - para ver quantos membros um usuario registrou\n
		?set [modulo] - para setar os modulos no servidor\n
		?config - para ver o painel de controle\n
		?edit [nome] - para editar modulos no servidor
		`)
		.setThumbnail(message.guild.iconURL({dynamic:true}))
		.setColor(client.color)
		.setFooter(footer)
		message.channel.send(embed).then(async msg => {
			msg.react('739582712947671111');

			const infoFilter = (r, u) => r.emoji.id === '739582712947671111' && u.id === message.author.id;
			const info = msg.createReactionCollector(infoFilter);

			info.on('collect', (r, u) => {
				msg.delete()
				const embedTwo = new Discord.MessageEmbed()
				//.setAuthor('Ajuda', client.user.displayAvatarURL({dynamic:true}))
				.setDescription(`
				<:info2:739582712947671111> **Info Avançado**\n
				Digite \`\`?help info [nome] \`\` para saber mais detalhes sobre o comando/command-exit
				\nImportante para usar o comando de registrar, o meu cargo tem que estar acima dos cargos desejados!
				\nDigite \`\`?botinfo\`\` para ver informações do bot.
				`)
				.setThumbnail(message.guild.iconURL({dynamic:true}))
				.setColor(client.color)
				.setFooter(footer)
				message.channel.send(embedTwo)
			})
		})
	}


	switch(args[0]){
		case "info": {
			const nameCommand = args[1];
			if (nameCommand == 'entrada.message'){
				const entradaMEmbed = new Discord.MessageEmbed()
				.setAuthor('Mensagem de entrada', message.guild.iconURL({dynamic:true}))
				.setDescription(`
				**Como usar**\n.edit entrada.message [sua mensagem]\n\n**Variaveis**
				\`\`{user}\`\`\ para mencionar á pessoas que entrou
				\`\`{guild}\`\`\ para falar o nome da guild
				\`\`{members}\`\`\ para falar á quantidade de membros no servidor
				\`\`{space}\`\`\ para pular uma linha
				\`\`{tab}\`\`\ para pular duas linhas\n\n**Exemplos**\n
				Ola \`\`{user}\`\` seja bem vindo ao \`\`{guild}\`\`
				\`\`{tab}\`\` agora estamos com \`\`{members}\`\`
				`)
				.setColor(client.color)
				.setThumbnail(message.guild.iconURL({dynamic:true}))
				.setFooter(footer)
				message.channel.send(entradaMEmbed)
			} else if (nameCommand == 'embed.color') {
				const embedColor = new Discord.MessageEmbed()
				.setAuthor('Cor da embed', message.guild.iconURL({dynamic:true}))
				.setDescription(`
				**Como usar**\n?edit embed.color [sua cor hex]\n\n**Exemplos**
				\n \`\`?edit embed.color\`\` #FFFFFF
				`)
				.setColor(client.color)
				.setThumbnail(message.guild.iconURL({dynamic:true}))
				.setFooter(footer)
				message.channel.send(embedColor)
			}
			break;
		}
	}
}

module.exports.help = {
	aliases: ['ajuda','hp'],
	name: 'help'
}