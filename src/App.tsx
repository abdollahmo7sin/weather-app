import { useEffect, useState } from "react"
import Header from "./components/Header"
import SearchResultItem from "./components/SearchResultItem"

import type { CitiesType } from "./Types"
import SingleCity from "./components/SingleCity"
import { useFetch } from "./hooks/useFetch"
import { useLocalStorage } from "./hooks/useLocalStorage"


function App() {
  const [query, setQuery] = useState<string>("")
  const [selectedCities, setSelectedCities] = useLocalStorage<CitiesType[]>('selectedCities', [])
  const API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`

  const { data: cities, loading, error, fetchData } = useFetch<{ results?: CitiesType[] }>(API_URL)

  const handleAddCity = (city: CitiesType) => {
    setSelectedCities(prev =>
      prev.some(prevItem => prevItem.id === city.id) ? prev : [...prev, city]
    )
    setQuery("")
  }
  const handleRemovecity = (id: number) => {
    setSelectedCities(prev => prev.filter(city => city.id !== id))
  }

  //debouncing
  useEffect(() => {
    if (!query) return
    const timer = setTimeout(() => {
      fetchData()
    }, 500);

    return () => {
      clearTimeout(timer)
    }
  }, [query])

  const results = cities?.results ?? []

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-950 via-indigo-950 to-slate-900 px-4 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <Header />

        <form
          onSubmit={(e) => { e.preventDefault(); if (query) fetchData() }}
          className="mt-8 flex gap-3"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            aria-label="Search for a city"
            className="grow rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-500 backdrop-blur focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
          />
          <button
            type="submit"
            disabled={loading || !query}
            className="rounded-xl bg-sky-500 px-6 py-3 font-medium text-white cursor-pointer hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {query && (
          <div className="mt-3">
            {error && <p className="px-1 text-red-300">{error}</p>}
            {!loading && !error && results.length === 0 && cities && (
              <p className="px-1 text-slate-400">No cities found for "{query}".</p>
            )}
            {results.length > 0 && (
              <ul className="max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-slate-900/90 divide-y divide-white/5 shadow-2xl backdrop-blur">
                {results.map((city) => <SearchResultItem key={city.id} city={city} handleAddCity={handleAddCity} />)}
              </ul>
            )}
          </div>
        )}

        {selectedCities.length > 0 ? (
          <section className="mt-10 grid gap-5 sm:grid-cols-2" aria-label="Saved cities">
            {selectedCities.map(city => (
              <SingleCity key={city.id} city={city} handleRemovecity={handleRemovecity} />
            ))}
          </section>
        ) : (
          <div className="mt-16 text-center text-slate-500">
            <div className="text-5xl mb-3" aria-hidden="true">🌍</div>
            <p>No cities yet. Search above and add one to get started.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
