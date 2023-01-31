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

export function standardDeviation(values) {
  const avg = mean(values)
  const squareDiffs = values.map(value => {
    const diff = value - avg
    const sqrDiff = diff * diff
    return sqrDiff
  })
  const avgSquareDiff = mean(squareDiffs)
  const stdDev = Math.sqrt(avgSquareDiff)
  return stdDev
}

export function mean(values) {
  const sum = values.reduce((acc, value) => acc + value, 0)
  const avg = sum / values.length
  return avg
}

export function getPearsonCorrelation(dataset1, dataset2) {

  let arrLength = 0
  let final1 = []
  let final2 = []

  for(let i in dataset1) {
    if (dataset1[i] !== null && dataset2[i] !== null) {
      final1.push(dataset1[i])
      final2.push(dataset2[i])
    }
  }

  arrLength = final1.length
  let xy = []
  let x = []
  let y = []
  let x2 = []
  let y2 = []

  for (let i = 0; i < arrLength; i++) {
    x.push(final1[i])
    y.push(final2[i])
    xy.push(final1[i] * final2[i])
    x2.push(final1[i] * final1[i])
    y2.push(final2[i] * final2[i])
  }

  let sum_x = x.reduce((a, b) => a + b, 0)
  let sum_y = y.reduce((a, b) => a + b, 0)
  let sum_xy = xy.reduce((a, b) => a + b, 0)
  let sum_x2 = x2.reduce((a, b) => a + b, 0)
  let sum_y2 = y2.reduce((a, b) => a + b, 0)

  let step1 = (arrLength * sum_xy) - (sum_x * sum_y)
  let step2 = (arrLength * sum_x2) - (sum_x * sum_x)
  let step3 = (arrLength * sum_y2) - (sum_y * sum_y)
  let step4 = Math.sqrt(step2 * step3)
  let answer = step1 / step4

  return answer
}