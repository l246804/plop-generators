export function requiredValidator(value) {
  return !value || !value.trim() ? 'Required field!' : true
}
