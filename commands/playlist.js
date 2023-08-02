const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playlist")
    .setDescription("Ouça a melhor playlist de estudos"),

  async execute(interaction) {
    await interaction.reply(
      "https://open.spotify.com/playlist/6OVJz0qVkxyforDM6rNQeB?si=4c292ccd2d2d488e"
    );
  },
};
