export function transformMouseIntoCSSShadow (x,y) {
  x = (- (x - window.innerWidth/2)) / 20
  y = (- (y - window.innerHeight/2)) / 20
  const shadow = `${x}px ${y}px 2px 2px rgba(0,0,0,0.5)`
  return shadow
}