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
  const response = await fetch(`${API}/api/${selectedCategory}/${selectedSubCategory}/${country}/1970/2022`)
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

export async function getGlobalData(category, subCategory) {
  const response = await fetch(`${API}/global/${category}}/${subCategory}`)
  return response.json()
}
export async function BananoGram(m1, m2, p1, p2, r) {
  fetch(`http://bananogram.local/on?metricOne=${m1}&metricTwo=${m2}&placeOne=${p1}&placeTwo=${p2}&r${r}`)
}

export async function getConclusion(data1what, data1where, data2what, data2where, rIndex){

  const prompt = {
    data1what,
    data1where,
    data2what,
    data2where,
    rIndex,
  }


console.log(prompt);
  const response = await fetch(`${API}/gpt`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(prompt),
  });

  
  let data = await response.json();
  console.log(data);

  return data.conclusion;
}

export async function tapoLogin(credentials) {

  const response = await fetch(`${API}/tapoLogin`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(credentials),
  })
  console.log(response);
  
}

