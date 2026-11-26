/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/

const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { buildRoleplayResponse } = require("../../lib/roleplayHelper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("smile")
    .setDescription("Smile")
    .setIntegrationTypes([1])
    .setContexts([0, 1, 2]),

  async execute(interaction) {
    await interaction.deferReply();
    const container = await buildRoleplayResponse("smile", interaction.user, null, false);
    if (!container) return interaction.editReply({ content: "Something went wrong." });
    await interaction.editReply({ components: [container], flags: MessageFlags.IsComponentsV2 });
  }
};

/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/
