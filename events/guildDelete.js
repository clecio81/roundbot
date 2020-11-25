const db = require("quick.db")
const Discord = require("discord.js")

module.exports = async (client, guild) => {
  console.log("[LOG] - Fui removido da guild "+ guild.name)
  const embed = new Discord.MessageEmbed()
  .addField("Guild Name", guild.name, true)
  .addField("Guild ID", guild.id, true)
  .setAuthor("Guild Remove ("+ client.guilds.cache.size +")", client.user.displayAvatarURL({size:32}))
  .setTimestamp()

  client.users.cache.get(client.owner).send(embed)
}