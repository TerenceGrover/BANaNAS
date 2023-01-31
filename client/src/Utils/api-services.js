const API = 'https://api.data-banana.com/'

export async function getSubCategories(selected) {
  const response = await fetch(`${API}/api/${selected}`)
  return response.json()
}

export async function getDescription(selectedCategory, selectedSubCategory) {
  const response = await fetch(`${API}/api/${selectedCategory}/${selectedSubCategory}`)
  console.log(response);
  
  return response.json()
}

export async function getMetrics(selectedCategory, selectedSubCategory, country) {
  const response = await fetch(`${API}/api/${selectedCategory}/${selectedSubCategory}/${country}/1000/2022`)
  console.log(response);
  
  return response.json()
}

export async function getBananaFact() {
  const response = await fetch(`${API}/bananaFact`)
  return response.json()
}