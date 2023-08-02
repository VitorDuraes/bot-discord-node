// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

//dotenv
const dotenv = require("dotenv");
dotenv.config();
const { TOKEN, CLIENTE_ID, GUILD_ID } = process.env;

//importação dos comandos

const fs = require("node:fs");
const path = require("node:path");

const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `Esse comando em ${filePath} está com "data" ou "execute" ausentes`
    );
  }
}

//Login do Bot
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);

//Listener de interações com o bot

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];
    if (selected == "javascript") {
      await interaction.reply(
        "Documentação do Javascript:https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"
      );
    } else if (selected == "Python") {
      await interaction.reply(
        "Documentação do Python:https://docs.python.org/pt-br/3/"
      );
    } else if (selected == "Csharp") {
      await interaction.reply(
        "Documentação do C#:https://learn.microsoft.com/pt-br/dotnet/csharp/"
      );
    } else if (selected == "Discord") {
      await interaction.reply(
        "Documentação do Discord:https://discordjs.guide/#before-you-begin"
      );
    }
  }

  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error("Commando não encontrado");
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply("Houve um erro ao executar esse comando");
  }
});
