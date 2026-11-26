// Chicago-style title case for headings and button labels.
const SMALL = new Set([
  "a", "an", "the", "and", "but", "or", "nor", "for", "so", "yet",
  "as", "at", "by", "in", "of", "off", "on", "per", "to", "up", "via", "vs", "with", "from", "into", "than",
]);

export function titleCase(text: string) {
  const words = text.split(" ");
  return words
    .map((word, i) => {
      // Keep acronyms, numbers and mixed-case brand words (WMS, SmartFlow, 360) as written.
      if (/[A-Z].*[A-Z]|\d/.test(word) || /[a-z][A-Z]/.test(word)) return word;
      const lower = word.toLowerCase();
      const first = i === 0 || /[.:?!]$/.test(words[i - 1] ?? "");
      const last = i === words.length - 1;
      if (!first && !last && SMALL.has(lower.replace(/[^a-z]/g, ""))) return lower;
      return lower.replace(/(^|[-“"(])([a-z])/g, (_m, pre: string, ch: string) => pre + ch.toUpperCase());
    })
    .join(" ");
}
