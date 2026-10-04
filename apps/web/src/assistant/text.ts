/** Words that carry no meaning for matching. "who" and "where" are kept: they are meaningful questions. */
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'at', 'by', 'from',
  'is', 'are', 'am', 'be', 'was', 'were', 'do', 'does', 'did', 'have', 'has', 'had',
  'i', 'me', 'my', 'you', 'your', 'yours', 'we', 'us', 'it', 'its', 'this', 'that',
  'what', 'which', 'how', 'can', 'could', 'would', 'will', 'please', 'about', 'tell',
  'some', 'any', 'there', 'so', 'if', 'as',
]);

/** A light, deterministic stemmer: enough to match "tests", "testing" and "tested" to one token. */
function stem(word: string): string {
  if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith('ed')) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

/**
 * Lower-cases, splits on anything that is not a letter or digit, drops stopwords and stems.
 * "CI/CD" becomes the two tokens "ci" and "cd", so a query and a keyword normalise the same way.
 */
export function tokenize(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((word) => word.length > 0);
  const meaningful = words.filter((word) => !STOPWORDS.has(word));
  // "What do you do?" is nothing but filler words, yet it is a real question: keep them all then.
  return (meaningful.length > 0 ? meaningful : words).map(stem);
}
