const { SlashCommandBuilder, ContainerBuilder, MediaGalleryBuilder, SeparatorBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Get information about the current server')
    .setIntegrationTypes([0])
    .setContexts([0]),

  async execute(interaction) {
    const guild = interaction.guild;
    if (!guild) {
      return interaction.reply({ content: 'This command only works in servers.', flags: 64 });
    }

    const fetchedGuild = await guild.fetch();

    const iconURL = fetchedGuild.iconURL({ size: 4096, extension: 'png' });
    const bannerURL = fetchedGuild.bannerURL({ size: 4096, extension: 'png' });

    const created = `<t:${Math.floor(fetchedGuild.createdTimestamp / 1000)}:F>`;

    const card = new ContainerBuilder()
      .setAccentColor(0x5865F2)
      .addTextDisplayComponents(
        (text) => text.setContent(`# ${fetchedGuild.name}`),
        (text) => fetchedGuild.description
          ? text.setContent(fetchedGuild.description)
          : text.setContent('')
      )
      .addSeparatorComponents(new SeparatorBuilder())
      .addTextDisplayComponents(
        (text) => text.setContent(`**Owner:** <@${fetchedGuild.ownerId}>`),
        (text) => text.setContent(`**Members:** ${fetchedGuild.memberCount.toLocaleString()}`),
        (text) => text.setContent(`**Boosts:** ${fetchedGuild.premiumSubscriptionCount ?? 0}`),
        (text) => text.setContent(`**Verification Level:** ${fetchedGuild.verificationLevel}`),
        (text) => text.setContent(`**Locale:** ${fetchedGuild.preferredLocale}`),
        (text) => text.setContent(`**Created:** ${created}`)
      )
      .addSeparatorComponents(new SeparatorBuilder())
      .addTextDisplayComponents(
        (text) => text.setContent(`ID: ${fetchedGuild.id}`)
      );

    if (iconURL) {
      card.addMediaGalleryComponents(
        new MediaGalleryBuilder().addItems({ url: iconURL, description: 'Server Icon' })
      );
    }

    await interaction.reply({ flags: MessageFlags.IsComponentsV2 | 64, components: [card] });

    if (bannerURL) {
      const bannerCard = new ContainerBuilder()
        .setAccentColor(0x5865F2)
        .addTextDisplayComponents(
          (text) => text.setContent(`# ${fetchedGuild.name} - Banner`)
        )
        .addMediaGalleryComponents(
          new MediaGalleryBuilder().addItems({ url: bannerURL })
        );

      await interaction.followUp({ flags: MessageFlags.IsComponentsV2 | 64, components: [bannerCard] });
    }
  }
};
