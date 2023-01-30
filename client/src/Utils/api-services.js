const API = 'http://localhost:3000/api'

export async function getSubCategories(selected) {
  const response = await fetch(`${API}/${selected}`)
  return response.json()
}

