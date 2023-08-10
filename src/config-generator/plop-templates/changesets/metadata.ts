import { cwd } from 'node:process'
import { execa } from 'execa'
import { defineMetadata } from '../../utils/template'

export default defineMetadata({
  name: 'changesets',
  description: 'Changesets configuration.',
  deps: ['@changesets/cli'],
  onInstalled: () => {
    return execa('changeset', ['init'], {
      cwd: cwd(),
      stdio: 'inherit',
    })
  },
})
