import Badge from './Badge';

export type Message = {
  channel?: string;
  content?: string;
  username?: string;
  isSubscriber?: boolean;
  isMod?: boolean;
  isBroadcaster?: boolean;
  badges?: Badge[];
};
