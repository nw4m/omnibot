/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('send')
    .setDescription('send')
    .setDMPermission(true)
    .addStringOption(opt =>
      opt
        .setName('msg')
        .setDescription('send')
        .setRequired(true)
    )
    .setIntegrationTypes([1])
    .setContexts([0, 1, 2]),

  async execute(interaction) {
    const msg = interaction.options.getString('msg', true);

    await interaction.reply({
      content: 'Message sent successfully!',
      flags: 64
    });

    await interaction.followUp({ content: msg });
  }
};

/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/
