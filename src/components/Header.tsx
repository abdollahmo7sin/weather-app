export default function Header() {
    return (
        <header className="text-center">
            <div className="text-5xl mb-3" aria-hidden="true">🌤️</div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-linear-to-r from-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Weather App
            </h1>
            <p className="mt-2 text-slate-400">Search a city and track its live weather</p>
        </header>
    )
}
