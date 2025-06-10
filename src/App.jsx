import { useEffect, useState } from "react"
import { Search, Star, TrendingUp, Film, Calendar } from 'lucide-react'
import { Input } from "./components/ui/input"
import { Card, CardContent } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Button } from "./components/ui/button"
import { Skeleton } from "./components/ui/skeleton"
import { useDebounce } from "./hooks/useDebounce"

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [movieList, setMovieList] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("popular")

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const categories = [
    { id: "popular", label: "Popular", icon: TrendingUp },
    { id: "top_rated", label: "Top Rated", icon: Star },
    { id: "upcoming", label: "Upcoming", icon: Calendar },
    { id: "now_playing", label: "Now Playing", icon: Film },
  ]

  const fetchMovies = async (query = "", category = "popular") => {
    setIsLoading(true)
    setErrorMessage("")

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/movie/${category}`

      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error("Failed to fetch movies")
      }

      const data = await response.json()
      setMovieList(data.results || [])
    } catch (error) {
      console.error("Error fetching movies:", error)
      setErrorMessage("Error fetching movies. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/trending/movie/week`, API_OPTIONS)
      const data = await response.json()
      setTrendingMovies(data.results?.slice(0, 10) || [])
    } catch (error) {
      console.error("Error fetching trending movies:", error)
    }
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchMovies(debouncedSearchTerm)
    } else {
      fetchMovies("", selectedCategory)
    }
  }, [debouncedSearchTerm, selectedCategory])

  useEffect(() => {
    fetchTrendingMovies()
  }, [])

  const MovieCard = ({ movie }) => (
    <Card className="group overflow-hidden border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.svg?height=450&width=300"
            }
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white/90 line-clamp-3">{movie.overview}</p>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-white line-clamp-1 mb-2">{movie.title}</h3>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-medium">
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {movie.original_language.toUpperCase()}
              </Badge>
              <span className="text-slate-400">{movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const TrendingCard = ({ movie, index }) => (
    <div className="flex items-center gap-4 min-w-[280px] p-4 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10">
      <div className="text-4xl font-bold text-transparent bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text">
        #{index + 1}
      </div>
      <div className="relative w-16 h-20 rounded-lg overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : "/placeholder.svg?height=80&width=64"
          }
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-white line-clamp-1">{movie.title}</h4>
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-slate-300">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="mb-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-dneF1Rgxcoj0KSZ7xOfUHbbcBG5lCx.png"
                alt="Movie Discovery"
                className="mx-auto drop-shadow-2xl w-full max-w-md h-auto"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                Amazing
              </span>{" "}
              Movies
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Explore thousands of movies, find your next favorite, and discover what's trending
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>
          </div>

          {/* Category Filters */}
          {!searchTerm && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    } backdrop-blur-sm`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.label}
                  </Button>
                )
              })}
            </div>
          )}
        </header>

        <main className="container mx-auto px-4 pb-12">
          {/* Trending Section */}
          {!searchTerm && trendingMovies.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-6 w-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Trending This Week</h2>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {trendingMovies.map((movie, index) => (
                  <TrendingCard key={movie.id} movie={movie} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Movies Grid */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Film className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">
                {searchTerm
                  ? `Search Results for "${searchTerm}"`
                  : categories.find((c) => c.id === selectedCategory)?.label}
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[2/3] w-full bg-slate-800" />
                    <Skeleton className="h-4 w-3/4 bg-slate-800" />
                    <Skeleton className="h-3 w-1/2 bg-slate-800" />
                  </div>
                ))}
              </div>
            ) : errorMessage ? (
              <div className="text-center py-12">
                <p className="text-red-400 text-lg">{errorMessage}</p>
              </div>
            ) : movieList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No movies found. Try a different search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
