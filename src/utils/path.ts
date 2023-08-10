import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export function $dir(url: string) {
  return dirname(fileURLToPath(url))
}
