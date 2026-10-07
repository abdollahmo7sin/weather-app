// Maps Open-Meteo weather codes to an emoji + label + card gradient
type WeatherInfo = { icon: string; label: string; gradient: string }

export const getWeatherInfo = (code: number, isDay: boolean): WeatherInfo => {
    if (code === 0) return isDay
        ? { icon: "☀️", label: "Clear sky", gradient: "from-amber-400/40 to-orange-500/30" }
        : { icon: "🌙", label: "Clear night", gradient: "from-indigo-500/40 to-slate-700/40" }
    if (code <= 2) return { icon: "⛅", label: "Partly cloudy", gradient: "from-sky-400/40 to-slate-500/30" }
    if (code === 3) return { icon: "☁️", label: "Overcast", gradient: "from-slate-400/40 to-slate-600/30" }
    if (code <= 48) return { icon: "🌫️", label: "Foggy", gradient: "from-slate-300/30 to-slate-500/30" }
    if (code <= 57) return { icon: "🌦️", label: "Drizzle", gradient: "from-sky-400/40 to-blue-600/30" }
    if (code <= 67) return { icon: "🌧️", label: "Rain", gradient: "from-blue-500/40 to-indigo-700/40" }
    if (code <= 77) return { icon: "❄️", label: "Snow", gradient: "from-cyan-200/40 to-sky-500/30" }
    if (code <= 82) return { icon: "🌧️", label: "Rain showers", gradient: "from-blue-500/40 to-indigo-700/40" }
    if (code <= 86) return { icon: "🌨️", label: "Snow showers", gradient: "from-cyan-200/40 to-sky-500/30" }
    return { icon: "⛈️", label: "Thunderstorm", gradient: "from-violet-500/40 to-slate-800/50" }
}
