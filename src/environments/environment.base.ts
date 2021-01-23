const version = require('../../package.json').version;

export const base = {
  version,
  production: false,
};

type BaseEnvironmentType = typeof base;
export interface EnvironmentType extends BaseEnvironmentType {
  api: {
    tasks: string;
  };
}
