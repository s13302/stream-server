import axios from 'axios';
import { BadgesCollection, checkBadgesCollection } from '../model/BadgesCollection';

const connection = axios.create({
  baseURL: 'https://api.twitch.tv/kraken/',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': '86n305ljadl043alnuglzhbpzueo4g',
  },
  timeout: 10000,
});

export default async function getBadges(channelId: string): Promise<BadgesCollection> {
  const { data } = await connection.get(`chat/${channelId}/badges`);
  if (checkBadgesCollection(data)) {
    return data;
  }
  return {} as BadgesCollection;
}
