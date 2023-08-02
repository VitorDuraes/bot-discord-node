const { REST } = require("discord.js");
const { Routes } = require("discord.js"); // Certifique-se de que o caminho está correto

//dotenv
const dotenv = require("dotenv");
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env; // Corrigido CLIENTE_ID para CLIENT_ID

//importação dos comandos
const fs = require("fs");
const path = require("path"); // Corrigido "node:path" para "path"

const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const commands = [];

for (const file of commandsFiles) {
  try {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  } catch (error) {
    console.error(`Erro ao carregar o comando ${file}:`, error);
  }
}

//instancia REST
const rest = new REST({ version: "9" }).setToken(TOKEN); // Corrigido para a versão 9

//deploy
(async () => {
  try {
    console.log(`Resetando ${commands.length} comandos...`);

    //PUT
    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log("Comandos registrados com sucesso!");
  } catch (error) {
    console.error(error);
  }
})();
