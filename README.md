# plop-generators

Plop generators.

## Install

```shell
# npm
npm i -D plop @rhao/plop-generators

# yarn or pnpm
pnpm add -D plop @rhao/plop-generators
```

## Usage

### create a plopfile.js and configure generators

> If you use a `.cjs` configuration file, you must install `@esbuild-kit/cjs-loader` and require it.

```ts
// plopfile.cjs
require('@esbuild-kit/cjs-loader')
const { setupGenerators } = require('@rhao/plop-generators')

module.exports = function (plop) {
  setupGenerators(plop)
}
```

```ts
// plopfile.mjs
import { setupGenerators } from '@rhao/plop-generators'

export default function (plop) {
  setupGenerators(plop)
}
```

### add script

```jsonc
// package.json
{
  "scripts": {
    "plop": "plop"
  }
}
```

### run command

```shell
npm run plop
```
