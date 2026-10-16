// Helpers for building the read-aloud text from what is on screen.

export const BLANK = 'blank';

// ['is', 'are'] -> "is, or are?"   [4, 5, 6] -> "4, 5, or 6?"
export function choicesText(choices) {
  const items = choices.map(String);
  if (items.length < 2) return `${items.join('')}?`;
  return `${items.slice(0, -1).join(', ')}, or ${items.at(-1)}?`;
}

// "I see three" + "blank" + "." -> "I see three, blank."
export function sentenceText(before, middle, after) {
  const tail = /^\W+$/.test(after) ? after : `, ${after}`;
  return `${before}, ${middle}${tail}`;
}

// Each part ends with a stop so the voice pauses between them ("Tell what Mochi does. Who? ...").
export function joinSpeech(...parts) {
  return parts
    .filter(Boolean)
    .map((part) => (/[.?!]$/.test(part) ? part : `${part}.`))
    .join(' ');
}
