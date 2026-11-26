/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/

const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { buildRoleplayResponse } = require("../../lib/roleplayHelper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("Kiss someone")
    .addUserOption(option =>
      option.setName("user").setDescription("The user to kiss").setRequired(true)
    )
    .setIntegrationTypes([1])
    .setContexts([0, 1, 2]),

  async execute(interaction) {
    const target = interaction.options.getUser("user");
    const actor = interaction.user;

    await interaction.deferReply();

    const container = await buildRoleplayResponse("kiss", actor, target);
    if (!container) return interaction.editReply({ content: "Something went wrong." });

    await interaction.editReply({ components: [container], flags: MessageFlags.IsComponentsV2 });
  }
};

/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/
