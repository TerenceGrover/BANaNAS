const API = 'https://api.data-banana.com'
import type {ISubCategory, IDescription, IMetric, IFilterCategory, IBananaFact, IBanana } from '../interfaces'

export async function getSubCategories(selected: string): Promise<ISubCategory[]> {
  const response = await fetch(`${API}/api/${selected}`)
  return response.json()
}

export async function getDescription(selectedCategory: string, selectedSubCategory: string): Promise<IDescription> {
  const response = await fetch(`${API}/api/${selectedCategory}/${selectedSubCategory}`)
  return response.json()
}

export async function getMetrics(selectedCategory: string, selectedSubCategory: string, country: string): Promise<IMetric[]> {
  const response = await fetch(`${API}/api/${selectedCategory}/${selectedSubCategory}/${country}/1000/2022`)
  return response.json()
}

export async function getFilterCategories(): Promise<IFilterCategory[]> {
  const response = await fetch(`${API}/api/Filters`)
  return response.json()
}

export async function getFilteredCategoryYears(category: string, param1: string): Promise<number[]> {
  const response = await fetch(`${API}/api/Filters/${category}/${param1}`)
  const data = await response.json()
  const yearStrings = Object.keys(data)
  const years = yearStrings.map(year => parseInt(year))
  return years;
}

export async function getBananaFact(): Promise<IBananaFact> {
  const response = await fetch(`${API}/bananaFact`)
  return response.json()
}

export async function getBananas(): Promise<IBanana[]> {
  const response = await fetch(`${API}/bananas`)
  return response.json()
}