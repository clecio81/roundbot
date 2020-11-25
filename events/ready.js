const config = require("../src/config.js");
const db = require("quick.db");
const log = require('modern-logger');
const ntlapi = require("ntlapi.js");

module.exports = async (client) => {
	const ntl = new ntlapi("lbS5Zk1wc-TMUo-YcF", client);
	ntl.updateStats({ refresh_time: 120000, warn: false }, () => {
		log.info(`Stats atualizados`);
	});

 	log.info(`Iniciado em ${client.user.username}`)
  if (config.activity == '1'){
   const acti = [
    ['Round para presidente',"STREAMING"],
    ['Moderação á todos',"STREAMING"],
  ];
    setInterval(async () => {
    let i = Math.floor(Math.random() * acti.length + 1) - 1;
    await client.user.setActivity(acti[i][0], {  type: acti[i][1], url: "https://twitch.tv/user/slatext"  });
    }, 8000)
  }
}