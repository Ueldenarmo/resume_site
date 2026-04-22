import * as migration_20260318_205712 from './20260318_205712';

export const migrations = [
  {
    up: migration_20260318_205712.up,
    down: migration_20260318_205712.down,
    name: '20260318_205712'
  },
];
