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

```ts
// plopfile.js
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
