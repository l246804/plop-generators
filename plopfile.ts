import type { NodePlopAPI } from 'node-plop'
import { setupGenerator } from './src/index'

export default function (plop: NodePlopAPI) {
  setupGenerator(plop)
}
