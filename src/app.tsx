import { createLogger } from 'redux-logger';

const isEnvDevelopment = process.env.NODE_ENV !== 'production';

export const dva = {
  config: {
    onAction: isEnvDevelopment && createLogger(),
  }
}