const API = 'https://api.data-banana.com'

export async function getSubCategories(selected) {
  const response = await fetch(`${API}/api/${selected}`)
  return response.json()
}

export async function getDescription(selectedCategory, selectedSubCategory) {
  const response = await fetch(`${API}/api/${selectedCategory}/${selectedSubCategory}`)
  return response.json()
}

export async function getMetrics(selectedCategory, selectedSubCategory, country) {
  const response = await fetch(`${API}/api/${selectedCategory}/${selectedSubCategory}/${country}/1000/2022`)
  return response.json()
}

export async function getFilterCategories() {
  const response = await fetch(`${API}/api/Filters`)
  return response.json()
}

export async function getFilteredCategoryYears(category, param1) {
  const response = await fetch(`${API}/api/Filters/${category}/${param1}`)
  const data = await response.json()
  const yearStrings = Object.keys(data)
  const years = yearStrings.map(year => parseInt(year))
  return years;
}

export async function getBananaFact() {
  const response = await fetch(`${API}/bananaFact`)
  return response.json()
}

export async function getBananas() {
  const response = await fetch(`${API}/bananas`)
  return response.json()
}