export function requireModule(id: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const module = require(id)
  return module?.__esModule ? module.default : module
}
