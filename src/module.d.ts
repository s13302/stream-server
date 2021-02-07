import { MyProcessEnv as EnvType } from './module';

declare global {

  namespace NodeJS {

    type ProcessEnv = EnvType;

  }

}
