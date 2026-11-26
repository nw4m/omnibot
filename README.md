# omnibot Complete Guide

> Bot by **wisky** • Support Server: [discord.gg/JRkD2gRbzT](https://discord.gg/JRkD2gRbzT)

Omnibot is a personal Discord bot with **roleplay** and **utility** commands. It runs on discord.js v14, loads every command automatically from the `commands/` folder, and registers them as slash commands that work in servers, DMs, and group chats.

---

## How It Works

On startup, `index.js` walks the `commands/` folder, loads every file that exports `data` and `execute`, and registers them with Discord. You configure the bot with four values:

| Variable | Type | What It Sets |
|----------|------|-------------|
| `TOKEN` | `string` | Your Discord bot token |
| `CLIENT_ID` | `string` | Your bot's application ID |
| `OWNERS` | `string` | Comma-separated list of owner user IDs |
| `GIPHY_API_KEY` | `string` | Giphy API key for roleplay GIFs ([get one free](https://developers.giphy.com)) |

All commands are **owner-only** , only the IDs listed in `OWNERS` can use them.

---

## Quick Start

```bash
git clone https://github.com/nw4m/omnibot.git
cd omnibot
npm install
cp .env.example .env
node index.js
```

Fill in `.env` before running:

```env
TOKEN=your_bot_token
CLIENT_ID=your_application_id
OWNERS=123456789012345678,987654321098765432
GIPHY_API_KEY=your_giphy_key
```

---

## Table of Contents

| # | Section | Description |
|---|---------|-------------|
| 1 | [Utility Commands](#utility-commands) | Avatar lookup and send |
| 2 | [Roleplay Commands](#roleplay-commands) | All 24 roleplay actions |
| 3 | [Project Structure](#project-structure) | How the files are organized |
| 4 | [Important Rules](#important-rules) | Permissions, config, and limits |
| 5 | [License](#license) | What you can and can't do with the code |

---

## Utility Commands

| Command | Description |
|---------|-------------|
| `/avatar [user]` | Get the avatar and banner of a user |
| `/send <msg>` | Make the bot send your message (you get a private confirmation, the message itself is posted normally) |

---

## Roleplay Commands

Commands that take a `<user>` target someone; the rest are solo actions.

**Targeted**

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

**Solo**

| Command | Description |
|---------|-------------|
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
│   ├── send.js
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

## Important Rules

* Every command is **owner-only** — add your user ID to `OWNERS` or nothing will respond
* `.env` holds your secrets — **never commit it** (it's already in `.gitignore`)
* Roleplay GIFs need a valid `GIPHY_API_KEY`
* Commands are loaded recursively, so new files dropped into `commands/` are picked up automatically

---

## License

This project is source-available. You may build your own version but you may not redistribute it as your own.

---

 ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ © 2026 **wisky**. All rights reserved.