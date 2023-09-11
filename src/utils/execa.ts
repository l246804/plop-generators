import { cwd } from 'node:process'
import type { Options, SyncOptions } from 'execa'

export const execaOpts: SyncOptions & Options = {
  cwd: cwd(),
  stdio: 'inherit',
}
