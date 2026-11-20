import tokens from "@/design/tokens.json";

/**
 * Raw light-theme token values, for places that cannot read CSS variables
 * (Open Graph image, favicon). Components use the CSS variables instead.
 */
export function lightToken(name: string): string {
  const token = tokens.color.tokens.find((t) => t.name === name);
  if (!token) throw new Error(`Unknown token: ${name}`);
  return token.value.light;
}
