const API = 'http://localhost:3000/api'

export async function getSubCategories(selected) {
  const response = await fetch(`${API}/${selected}`)
  return response.json()
}

export async function getMetrics(selectedCategory, selectedSubCategory, country) {
  const response = await fetch(`${API}/${selectedCategory}/${selectedSubCategory}/${country}/1000/2023`)
  console.log(response);
  
  return response.json()
}