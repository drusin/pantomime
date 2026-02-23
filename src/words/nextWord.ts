import allWords from "./allWords";

const used = [] as Array<string>;

function reset() {
  used.length = 0;
}

function nextWord() {
  const all = allWords();
  if (used.length === all.length) {
    return '';
  }
  let word = '';
  do {
    const i = Math.random() * all.length;
    word = all[i] || '';
  } while (!word && !used.find((w) => w === word));
  used.push(word);
  return word;
}

export {
  reset,
  nextWord
}
