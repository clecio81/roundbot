const Discord = require("discord.js"),
      { post } = require("node-superfetch");

const db = require("quick.db")
const translate = require('@vitalets/google-translate-api');
const config = require("../src/config.js")
const ms = require("format-ms")

module.exports.run = async (client, message, args) => {
  if (message.author.id == "557746795543789568"){
  
  const embed = new Discord.MessageEmbed()
  .addField("Input", "```js\n" + args.join(" ") + "```");
  
  try {
    const code = args.join(" ");
    if (!code) return message.channel.send("Por favor, digite o codigo!");
    let evaled;
    
    if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env")) {
      evaled = "Sem token amigo :3";
    } else {
      evaled = eval(code);
    }
    
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});
    
    let output = clean(evaled);
    if (output.length > 1024) {
      const {body} = await post("https://hastebin.com/documents").send(output);
      embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor(0x7289DA);
    } else {
      embed.addField("Output", "```js\n" + output + "```").setColor(0x7289DA)
    }
    
    message.channel.send(embed);
    
  } catch (error) {
    let err = clean(error);
    if (err.length > 1024) {
      const {body} = await post("https://hastebin.com/documents").send(err);
      embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor("RED");
    } else {
      embed.addField("Output", "```js\n" + err + "```").setColor("RED");
    }
    
    message.channel.send(embed);
  }
  async function returnGuilds(){
    const embed = new Discord.MessageEmbed()
    .setTitle("Guilds" + `(${client.guilds.cache.size})`)
    .addField("Names: \n", client.guilds.cache.map(g => { return g.name }), true)
    .addField("Ids: \n", client.guilds.cache.map(g => { return g.id }), true)
    .setColor("BLACK") 
    message.channel.send(embed)
  }

	async function restartClient(){
		message.channel.send("O client foi reiniciado.");
		client.destroy();
		client.login(config.token)
	}
}
}


function clean(string) {
  if (typeof text === "string") {
    return string.replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return string;
  }
}

module.exports.help = {
	aliases: ["e"],
	name: "eval"
}