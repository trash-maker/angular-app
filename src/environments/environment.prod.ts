import { base, EnvironmentType } from './environment.base';

export const environment: EnvironmentType = {
  ...base,
  version: `v${base.version}`,
  api: {
    tasks: 'http://localhost:3000',
  },
  production: true,
};
