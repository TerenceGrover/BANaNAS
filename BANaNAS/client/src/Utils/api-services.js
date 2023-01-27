export async function APITest () {
  const response = await fetch('/api/test')
  const data = await response.json()
  return data
}