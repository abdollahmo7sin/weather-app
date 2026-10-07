import type { CitiesType } from "../Types"
import { useEffect } from "react"
import { useFetch } from "../hooks/useFetch"
import { getWeatherInfo } from "../weather"

type WeatherData = {
    current_weather: {
        temperature: number
        windspeed: number
        weathercode: number
        is_day: number
        time: string
    }
    current_weather_units: {
        temperature: string
        windspeed: string
    }
}
type Props = {
    city: CitiesType,
    handleRemovecity: (id: number) => void
}
export default function SingleCity({ city, handleRemovecity }: Props) {
    const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`
    const { data: cityInfo, error, fetchData } = useFetch<WeatherData>(API_URL)

    useEffect(() => {
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 60000);

        return () => { clearInterval(interval) }
    }, [city])

    const current = cityInfo?.current_weather
    const info = current ? getWeatherInfo(current.weathercode, current.is_day === 1) : null

    return (
        <article className={`relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br ${info?.gradient ?? "from-white/10 to-white/5"} bg-slate-900/60 p-5 shadow-xl backdrop-blur transition-transform hover:-translate-y-1`}>
            <button
                type="button"
                onClick={() => handleRemovecity(city.id)}
                aria-label={`Remove ${city.name}`}
                className="absolute top-3 right-3 h-7 w-7 rounded-full bg-white/10 text-sm text-slate-300 cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
            >
                ✕
            </button>

            <h2 className="text-xl font-semibold pr-8">{city.name}</h2>
            <p className="text-sm text-slate-400">{[city.admin1, city.country].filter(Boolean).join(", ")}</p>

            {error && <p className="mt-6 text-sm text-red-300">Could not load the weather.</p>}

            {!current && !error && (
                <div className="mt-6 animate-pulse space-y-3" aria-label="Loading weather">
                    <div className="h-12 w-28 rounded bg-white/10" />
                    <div className="h-4 w-40 rounded bg-white/10" />
                </div>
            )}

            {current && info && cityInfo && (
                <>
                    <div className="mt-5 flex items-center justify-between">
                        <p className="text-5xl font-bold tracking-tight">
                            {Math.round(current.temperature)}{cityInfo.current_weather_units.temperature}
                        </p>
                        <span className="text-6xl" role="img" aria-label={info.label}>{info.icon}</span>
                    </div>
                    <p className="mt-1 text-slate-200">{info.label}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-400">
                        <span>💨 {current.windspeed} {cityInfo.current_weather_units.windspeed}</span>
                        <span>Updated {new Date(current.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                </>
            )}
        </article>
    )
}
