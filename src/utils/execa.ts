import { cwd } from 'node:process'
import type { Options } from 'execa'

export const execaOpts: Options<string> = {
  cwd: cwd(),
  stdio: 'inherit',
}
