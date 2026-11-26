# omnibot

A personal Discord bot with roleplay and utility commands.


---

## Setup

**1. Clone the repo**
```bash
git clone https://github.com/nw4m/omnibot.git
cd omnibot
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure `.env`**

Copy `.env.example` to `.env` and fill in the values:
```bash
cp .env.example .env
```

**4. Run the bot**
```bash
node index.js
```

---

## Configuration

| Variable | Description |
|----------|-------------|
| `TOKEN` | Your Discord bot token |
| `CLIENT_ID` | Your bot's application ID |
| `OWNERS` | Comma-separated list of owner user IDs |
| `GIPHY_API_KEY` | Giphy API key for roleplay GIFs (get one free at [developers.giphy.com](https://developers.giphy.com)) |

---

## Commands

All commands are owner-only.

### Utility
| Command | Description |
|---------|-------------|
| `/avatar [user]` | Get the avatar and banner of a user |

### Roleplay
| Command | Description |
|---------|-------------|
| `/hug <user>` | Give someone a warm hug |
| `/kiss <user>` | Kiss someone |
| `/pat <user>` | Pat someone on the head |
| `/slap <user>` | Slap someone |
| `/poke <user>` | Poke someone |
| `/tickle <user>` | Tickle someone |
| `/lick <user>` | Lick someone |
| `/kill <user>` | Kill someone |
| `/deathstare <user>` | Give someone a death stare |
| `/dance` | Dance |
| `/cry` | Cry |
| `/laugh` | Laugh out loud |
| `/smile` | Smile |
| `/blush` | Blush |
| `/wink` | Wink |
| `/thumbsup` | Give a thumbs up |
| `/clap` | Clap |
| `/bow` | Take a bow |
| `/salute` | Salute |
| `/facepalm` | Facepalm |
| `/shrug` | Shrug |
| `/sleep` | Go to sleep |
| `/eat` | Eat something |
| `/run` | Run away |

---

## Project Structure

```
omnibot/
├── commands/
│   ├── avatar.js
│   └── roleplay/
│       └── ... (24 commands)
├── lib/
│   ├── nekoHelper.js
│   ├── gifHelper.js
│   └── roleplayHelper.js
├── index.js
├── .env
└── .env.example
```

---

## Disabling a Command

Set `enabled: false` at the top of any command file:

```js
module.exports = {
  enabled: false,
  data: new SlashCommandBuilder()
  ...
}
```

---

## License

This project is source-available. You may build your own version but you may not redistribute it as your own.
