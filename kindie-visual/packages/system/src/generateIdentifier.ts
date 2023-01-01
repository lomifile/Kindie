export default function generateIdentifier(length: number): string {
  return Math.random().toString(length).slice(2, 7);
}
