import type { CitiesType } from "../Types"
type SingleSearchProps = {
    city: CitiesType,
    handleAddCity: (city: CitiesType) => void
}

export default function SearchResultItem({ city, handleAddCity }: SingleSearchProps) {
    return (
        <li>
            <button
                type="button"
                onClick={() => handleAddCity(city)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer hover:bg-white/10 focus-visible:bg-white/10 focus:outline-none transition-colors"
            >
                <span>
                    <span className="font-medium">{city.name}</span>
                    <span className="block text-sm text-slate-400">
                        {[city.admin1, city.country].filter(Boolean).join(", ")}
                    </span>
                </span>
                <span className="text-sky-300 text-sm shrink-0">+ Add</span>
            </button>
        </li>
    )
}
