/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spx')
    .setDescription('spx')
    .setDMPermission(true)
    .addStringOption(opt =>
      opt
        .setName('msg')
        .setDescription('Message to send')
        .setRequired(true)
    )
    .setIntegrationTypes([1])
    .setContexts([0, 1, 2]),

  async execute(interaction) {
    const msg = interaction.options.getString('msg', true);

    const button = new ButtonBuilder()
      .setCustomId(`send_4_${Date.now()}`)
      .setLabel('send 4 times')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      content: `Hidden preview: ${msg}`,
      flags: 64,
      components: [row]
    });
  },

  async handleButton(interaction, client) {
    if (interaction.customId.startsWith('send_4_')) {
      await interaction.deferUpdate().catch(console.error);

      const originalContent = interaction.message.content;
      const msg = originalContent.replace('Hidden preview: ', '');

      const channel = await client.channels.fetch(interaction.channelId).catch(() => null);

      if (channel && 'send' in channel) {
        const promises = [];
        for (let k = 0; k < 4; k++) {
          promises.push(channel.send({ content: msg }).catch(err => {
            console.error("Direct channel send failed:", err.message);
          }));
        }
        await Promise.all(promises);
      } else {
        for (let k = 0; k < 4; k++) {
          await interaction.followUp({ content: msg }).catch(console.error);
        }
      }
    }
  }
};

/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/
