/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/

require('dotenv').config();

const { Client, GatewayIntentBits, Routes, ActivityType, Collection } = require('discord.js');
const { REST } = require('discord.js');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const OWNERS = process.env.OWNERS ? process.env.OWNERS.split(',') : [];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ]
});

client.commands = new Collection();

function loadCommands(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      loadCommands(fullPath);
    } else if (entry.name.endsWith('.js') && !fullPath.includes('subcommands')) {
      const command = require(fullPath);
      if (command.data && command.execute && command.enabled !== false) {
        client.commands.set(command.data.name, command);
      }
    }
  }
}

loadCommands(path.join(__dirname, 'commands'));

const rest = new REST({ version: '10' }).setToken(TOKEN);

const registerCommands = async () => {
  try {
    console.log('Registering global commands...');
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: client.commands.map(cmd => cmd.data.toJSON()) }
    );
    console.log('Global commands registered');
  } catch (err) {
    console.error('Error registering commands:', err);
  }
};

client.once('ready', async () => {
  console.log(`Logged in as ${client.user?.tag}`);
  await registerCommands();
  client.user?.setPresence({
    activities: [{
      name: 'idk',
      type: ActivityType.Playing
    }],
    status: 'dnd'
  });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

  if (!OWNERS.includes(interaction.user.id)) {
    if (interaction.isRepliable()) {
      return interaction.reply({ content: 'Hmm, sorry, but I can\'t do that command in this version because the code hoster did not grant you permission . You can build your own version from the [source code](https://github.com/nw4m/omnibot) here.', flags: 64 });
    }
    return;
  }

  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
    }
  }

  if (interaction.isButton()) {
    for (const command of client.commands.values()) {
      if (command.handleButton) {
        try {
          await command.handleButton(interaction, client);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
});

client.login(TOKEN);

/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/
