# Telegram Bot for Administrators

Web-service for administrate and moderate Trip Trip by Telegram bot

## Development

1. Start Redis
2. copy `.env.dist` to `.env`
3. Fill config to `.env` file
   - `DB_HOST`, `DB_PASSWORD`, `DB_PORT`=5432`,`DB_USER`,`DB_NAME` — config for PostgreSQL
   - `REDIS_HOST`, `REDIS_PORT`, `REDIS_USER`, `REDIS_PASSWORD` — config for Redis
   - `TELEGRAM_TOKEN` — token of Telegram bot
     — `TEAM_CHAT_ID` — chat ID of group-chat with Trip-Trip team
   - `CORE_USER_URL`, `CORE_EAT_URL`, `CORE_COLLABORATION_URL` — URL of Trip Trip backed
4. Start dev-server by `yarn dev`
5. Server runs on [localhost:3000](http://localhost:3000/docs)

## Production

### Release to Trip-Trip infrastructure

1. Push all code for release to `master`
2. Create release by `yarn release`
3. Push code and tag by `git push --follow-tags`
4. CircleCI roll out release
