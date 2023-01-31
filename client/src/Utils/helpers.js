export function transformMouseIntoCSSShadow (x,y) {
  x = (- (x - window.innerWidth/2)) / 15
  y = (- (y - window.innerHeight/2)) / 15
  const shadow = `${x}px ${y}px 0px 2px rgba(0,0,0,0.6)`
  return shadow
}

export function splitWordsOnCapitalLetters(word) {
  if (word === 'GDP') return word
  return word.replace(/([A-Z])/g, " $1");
}