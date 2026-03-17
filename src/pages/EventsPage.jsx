import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, Filter, MapPin, Search, Tag, Users, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Select } from "../components/ui/Select"
import { Card, CardContent } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"

// Generate more dummy events for browsing
const ALL_EVENTS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: [
    "Neon Nights Music Festival", "Future of AI Conference", "Culinary Masterclass", 
    "Indie Game Developers", "Yoga & Mindfulness Retreat", "Startup Pitch Night",
    "Jazz in the Park", "Web3 Summit 2026", "Street Food Festival",
    "Digital Art Exhibition", "Marathon Prep Workshop", "Comedy Club Special"
  ][i],
  date: new Date(2026, 7 + (i % 3), 15 + i).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  location: ["Los Angeles", "San Francisco", "New York", "Seattle", "Austin", "Chicago"][i % 6] + ", USA",
  price: i % 4 === 0 ? "Free" : `$${(i * 15 + 45)}`,
  ticketsRemaining: Math.floor(Math.random() * 200) + 10,
  organizer: ["LiveNation", "TechWeb", "Chef Kenji", "IGDA", "Wellness Co", "Capital Ventures"][i % 6],
  image: [
    "https://images.unsplash.com/photo-1533174000220-db92842c161a",
    "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa",
    "https://images.unsplash.com/photo-1553621042-f6e147245754",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd"
  ][i % 6] + "?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  category: ["Concert", "Conference", "Workshop", "Meetup", "Health", "Business"][i % 6]
}))

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get("category")
  const initialLocation = searchParams.get("location")

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")
  const [location, setLocation] = useState(initialLocation || "")
  const [categories, setCategories] = useState(initialCategory ? [initialCategory] : [])
  const [date, setDate] = useState("")
  const [price, setPrice] = useState("any")

  useEffect(() => {
    if (initialCategory) {
      setCategories(prev => prev.includes(initialCategory) ? prev : [...prev, initialCategory])
    }
    if (initialLocation) {
      setLocation(initialLocation)
    }
  }, [initialCategory, initialLocation])

  const filteredEvents = ALL_EVENTS.filter((event) => {
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (location && !event.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (categories.length > 0 && !categories.includes(event.category)) return false;
    if (price === "free" && event.price !== "Free") return false;
    if (price === "paid" && event.price === "Free") return false;
    if (date) {
      const eventDate = new Date(event.date);
      const today = new Date();
      if (date === "today") {
          if (eventDate.toDateString() !== today.toDateString()) return false;
      } else if (date === "tomorrow") {
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          if (eventDate.toDateString() !== tomorrow.toDateString()) return false;
      } else if (date === "weekend") {
          const day = eventDate.getDay();
          if (day !== 0 && day !== 6) return false;
          const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
          if (diffDays > 7 || diffDays < 0) return false;
      } else if (date === "month") {
          if (eventDate.getMonth() !== today.getMonth() || eventDate.getFullYear() !== today.getFullYear()) return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sortOrder === "price_low") {
      const priceA = a.price === "Free" ? 0 : parseInt(a.price.replace('$', ''));
      const priceB = b.price === "Free" ? 0 : parseInt(b.price.replace('$', ''));
      return priceA - priceB;
    }
    if (sortOrder === "price_high") {
      const priceA = a.price === "Free" ? 0 : parseInt(a.price.replace('$', ''));
      const priceB = b.price === "Free" ? 0 : parseInt(b.price.replace('$', ''));
      return priceB - priceA;
    }
    if (sortOrder === "popular") {
      return a.ticketsRemaining - b.ticketsRemaining;
    }
    return b.id - a.id;
  });
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Events</h1>
          <p className="text-muted-foreground mt-1">Discover {filteredEvents.length} events matching your interests</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search events..." 
              className="pl-9 h-10 bg-card border-border/50" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden shrink-0"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <div className="hidden md:block w-40">
            <Select 
              className="h-10 bg-card border-border/50"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar Filters */}
        <aside className={`
          ${isMobileFiltersOpen ? 'fixed inset-0 z-50 bg-background/95 backdrop-blur-sm p-4 overflow-y-auto' : 'hidden'} 
          md:block w-full md:w-64 shrink-0 space-y-6
        `}>
          <div className="flex justify-between items-center md:hidden mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Location
              </h3>
              <Select 
                className="bg-card"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Any Location</option>
                <option value="new york">New York</option>
                <option value="los angeles">Los Angeles</option>
                <option value="san francisco">San Francisco</option>
                <option value="seattle">Seattle</option>
                <option value="austin">Austin</option>
                <option value="chicago">Chicago</option>
              </Select>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Tag className="h-4 w-4" /> Category
              </h3>
              <div className="space-y-2">
                {["Concert", "Conference", "Workshop", "Meetup", "Health", "Business"].map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-border text-brand-500 bg-card/50" 
                      checked={categories.includes(cat)}
                      onChange={(e) => {
                        if (e.target.checked) setCategories([...categories, cat]);
                        else setCategories(categories.filter(c => c !== cat));
                      }}
                    />
                    <span className="text-muted-foreground hover:text-foreground">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Date
              </h3>
              <Select 
                className="bg-card"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              >
                <option value="">Any Time</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="weekend">This Weekend</option>
                <option value="month">This Month</option>
              </Select>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Price</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="radio" 
                    name="price" 
                    value="any"
                    checked={price === "any"}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border-border text-brand-500 bg-card/50 focus:ring-brand-500" 
                  />
                  <span className="text-muted-foreground">Any Price</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="radio" 
                    name="price" 
                    value="free"
                    checked={price === "free"}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border-border text-brand-500 bg-card/50 focus:ring-brand-500" 
                  />
                  <span className="text-muted-foreground">Free</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="radio" 
                    name="price" 
                    value="paid"
                    checked={price === "paid"}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border-border text-brand-500 bg-card/50 focus:ring-brand-500" 
                  />
                  <span className="text-muted-foreground">Paid</span>
                </label>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full text-muted-foreground"
              onClick={() => {
                setSearchQuery("");
                setSortOrder("newest");
                setLocation("");
                setCategories([]);
                setDate("");
                setPrice("any");
                setSearchParams(new URLSearchParams());
              }}
            >
              Clear All Filters
            </Button>
            
            {/* Mobile apply button */}
            <Button 
              className="w-full md:hidden mt-4" 
              variant="gradient"
              onClick={() => setIsMobileFiltersOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </aside>

        {/* Main Event Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground text-lg">
                No events found matching your filters.
              </div>
            ) : filteredEvents.map((event, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={event.id}
              >
                <Card className="glass-card overflow-hidden h-full flex flex-col border-white/5 bg-card/60 group">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                      {event.price}
                    </div>
                    <Badge className="absolute top-3 left-3 bg-brand-500/90 hover:bg-brand-600 border-0 shadow-md backdrop-blur-sm">
                      {event.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col relative">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center text-brand-500 text-sm font-medium">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        {event.date}
                      </div>
                      <div className="text-xs font-medium text-orange-400 bg-orange-400/10 px-2 py-1 rounded-md">
                        {event.ticketsRemaining} left
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-xl mb-3 line-clamp-2 leading-tight group-hover:text-brand-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex flex-col gap-2.5 mt-auto text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                        <span className="truncate">By <span className="text-foreground/80 font-medium">{event.organizer}</span></span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-5 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-colors" asChild>
                      <Link to={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" disabled className="w-10 h-10 rounded-xl bg-card">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="gradient" className="w-10 h-10 rounded-xl p-0">1</Button>
            <Button variant="outline" className="w-10 h-10 rounded-xl bg-card">2</Button>
            <Button variant="outline" className="w-10 h-10 rounded-xl bg-card">3</Button>
            <span className="px-2 text-muted-foreground">...</span>
            <Button variant="outline" className="w-10 h-10 rounded-xl bg-card">12</Button>
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl bg-card">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
