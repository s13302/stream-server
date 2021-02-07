import { Server } from 'socket.io';
import dotenv from 'dotenv';
import tmi from 'tmi.js';
import escape from 'escape-html';

import { assertProcessEnv } from './module';

import getBadges from './api/twitch.api';
import app from './app';
import { Message } from './model/Message';
import { Badge } from './model/Badge';
import { BadgesCollection, BadgeType } from './model/BadgesCollection';

dotenv.config({
  debug: true,
});

assertProcessEnv(process.env);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

let badgesCollection: BadgesCollection;
getBadges(process.env.TWITCH_CHANNEL_ID).then((value) => {
  badgesCollection = value;
});
const io = new Server(server);

const client = new tmi.Client({
  connection: {
    reconnect: true,
    secure: true,
  },
  channels: [
    'programmingexperience',
  ],
});
client.connect().catch(console.error);
client.on('message', (channel, userstate, message, self) => {
  if (!self) {
    const badges: Badge[] = [];

    const userbadges = userstate.badges;
    if (userbadges && badgesCollection !== undefined) {
      Object.keys(userbadges).forEach((element) => {
        const badgeElement = element as BadgeType;
        const selectedBadge = badgesCollection[badgeElement];
        if (selectedBadge) {
          badges.push({
            type: element,
            url: selectedBadge.image,
          });
        }
      });
    }

    const msg: Message = {
      channel,
      content: escape(message),
      username: userstate['display-name'],
      isSubscriber: userstate.subscriber,
      isMod: userstate.mod,
      isBroadcaster: userstate.badges?.broadcaster === '1',
      badges,
    };
    io.emit('message', msg);
  }
});
