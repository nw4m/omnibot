/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/

const { MessageFlags } = require("discord.js");
const { buildRoleplayResponse } = require("../../../lib/roleplayHelper");

module.exports = {
  async execute(interaction) {
    const actor = interaction.user;

    await interaction.deferReply({ flags: MessageFlags.IsComponentsV2 });

    const container = await buildRoleplayResponse("wink", actor, null, false);
    if (!container) return interaction.editReply({ content: "Something went wrong." });

    await interaction.editReply({ components: [container], flags: MessageFlags.IsComponentsV2 });
  }
};

/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/
