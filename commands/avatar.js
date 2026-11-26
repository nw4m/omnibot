/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/

const { SlashCommandBuilder, ContainerBuilder, MediaGalleryBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get the avatar and banner of a user')
    .setDMPermission(true)
    .addUserOption(opt =>
      opt
        .setName('user')
        .setDescription('The user to get the avatar of')
        .setRequired(false)
    )
    .setIntegrationTypes([1])
    .setContexts([0, 1, 2]),

  async execute(interaction) {
    const targetUser = interaction.options.getUser('user') ?? interaction.user;
    const fetchedUser = await interaction.client.users.fetch(targetUser.id, { force: true });

    const avatarURL = fetchedUser.displayAvatarURL({ size: 4096, extension: 'png' });
    const bannerURL = fetchedUser.bannerURL({ size: 4096, extension: 'png' });

    const avatarCard = new ContainerBuilder()
      .setAccentColor(fetchedUser.accentColor ?? 0x5865F2)
      .addTextDisplayComponents(
        (text) => text.setContent(`# Avatar`),
        (text) => text.setContent(`**${fetchedUser.username}**`)
      )
      .addMediaGalleryComponents(
        new MediaGalleryBuilder().addItems([{ media: { url: avatarURL } }])
      )
      .addTextDisplayComponents(
        (text) => text.setContent(`ID: ${fetchedUser.id}`)
      );

    await interaction.reply({ flags: MessageFlags.IsComponentsV2 | 64, components: [avatarCard] });

    if (bannerURL) {
      const bannerCard = new ContainerBuilder()
        .setAccentColor(fetchedUser.accentColor ?? 0x5865F2)
        .addTextDisplayComponents(
          (text) => text.setContent(`# Banner`),
          (text) => text.setContent(`**${fetchedUser.username}**`)
        )
        .addMediaGalleryComponents(
          new MediaGalleryBuilder().addItems([{ media: { url: bannerURL } }])
        )
        .addTextDisplayComponents(
          (text) => text.setContent(`ID: ${fetchedUser.id}`)
        );

      await interaction.followUp({ flags: MessageFlags.IsComponentsV2 | 64, components: [bannerCard] });
    }
  }
};

/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/
