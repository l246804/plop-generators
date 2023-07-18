# plop-generators

Plop generators.

## Install

```shell
# npm
npm i -D plop @rh/plop-generators

# yarn or pnpm
pnpm add -D plop @rh/plop-generators
```

## Usage

### create a plopfile.js and configure generators.

```ts
// plopfile.js
import { setupConfigGenerator } from '@rh/plop-generators'

export default function (plop) {
  setupConfigGenerator(plop)
}
```

### add scripts

```jsonc
// package.json
{
  "scripts": {
    "plop": "plop"
  }
}
```

### run shell

```shell
npm run plop
```
