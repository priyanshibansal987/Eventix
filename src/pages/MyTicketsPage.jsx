import { useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, Clock, MapPin, Download, Ticket, ChevronRight, QrCode, Bell, Info } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"

const MY_TICKETS = [
  {
    id: "TKT-8921",
    event: "Neon Nights Music Festival",
    date: "Aug 15, 2026",
    time: "4:00 PM",
    location: "Downtown Arena, LA",
    type: "VIP Access",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1533174000220-db92842c161a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "TKT-4452",
    event: "Future of AI Conference",
    date: "Sep 22, 2026",
    time: "9:00 AM",
    location: "Moscone Center, SF",
    type: "General Admission",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "TKT-1189",
    event: "Culinary Masterclass: Sushi",
    date: "Jul 10, 2026",
    time: "6:00 PM",
    location: "The Epicurean Room, NYC",
    type: "Participating Chef",
    status: "past",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "TKT-5591",
    event: "Web3 Developer Summit",
    date: "Nov 05, 2026",
    time: "10:00 AM",
    location: "Virtual",
    type: "Waitlisted",
    status: "waitlist",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "NOT-0012",
    event: "Neon Nights Music Festival",
    date: "Update",
    time: "Just now",
    location: "System Notice",
    type: "Announcement",
    status: "notices",
    message: "The main stage schedule has been updated! Check the app for the new lineup times.",
    image: "https://images.unsplash.com/photo-1470229722913-7c090be5c520?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
]

export function MyTicketsPage() {
  const [filter, setFilter] = useState("all")
  
  const filteredTickets = filter === "all" 
    ? MY_TICKETS 
    : MY_TICKETS.filter(t => t.status === filter)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Tickets</h1>
          <p className="text-muted-foreground">Manage your event registrations and download your passes.</p>
        </div>

        {/* Filters/Tabs */}
        <div className="flex border-b border-border mb-8 overflow-x-auto hide-scrollbar">
          {['all', 'upcoming', 'past', 'waitlist', 'notices'].map((tab) => (
            <button 
              key={tab}
              className={`px-6 py-3 font-medium text-sm transition-colors relative whitespace-nowrap capitalize ${filter === tab ? 'text-brand-500' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setFilter(tab)}
            >
              {tab === 'all' ? 'All Tickets' : tab}
              {filter === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-t-full"></div>}
            </button>
          ))}
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="overflow-hidden bg-card border-border hover:border-brand-500/30 transition-colors group">
                <div className="flex flex-col md:flex-row h-full">
                  
                  {/* Left: Event Details */}
                  <div className="flex-1 flex flex-col sm:flex-row p-0 md:border-r border-border border-dashed">
                    <div className="sm:w-48 h-48 sm:h-full relative shrink-0">
                      <img src={ticket.image} alt={ticket.event} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:hidden" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between relative sm:static -mt-16 sm:mt-0 z-10 bg-gradient-to-t from-card via-card to-transparent sm:bg-none">
                      <div>
                        {ticket.status === 'upcoming' && (
                          <Badge variant="outline" className="mb-3 bg-card border-brand-500/30 text-brand-500 hidden sm:inline-flex">
                            Upcoming
                          </Badge>
                        )}
                        {ticket.status === 'waitlist' && (
                          <Badge variant="outline" className="mb-3 bg-card border-amber-500/30 text-amber-500 hidden sm:inline-flex">
                            Waitlisted
                          </Badge>
                        )}
                        {ticket.status === 'notices' && (
                          <Badge variant="outline" className="mb-3 bg-card border-indigo-500/30 text-indigo-500 hidden sm:inline-flex">
                            Important Notice
                          </Badge>
                        )}
                        <h3 className="text-xl font-bold mb-3 sm:mb-2">{ticket.event}</h3>
                        
                        {ticket.status === 'notices' ? (
                          <p className="text-sm text-muted-foreground bg-muted/40 p-3 rounded-md border border-border mt-3">
                            <Info className="inline-block w-4 h-4 mr-2 text-brand-400" />
                            {ticket.message}
                          </p>
                        ) : (
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{ticket.date} at {ticket.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{ticket.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-foreground font-medium pt-2">
                              <Ticket className="h-4 w-4 text-brand-500" />
                              <span>{ticket.type}</span>
                              <span className="text-muted-foreground font-normal ml-2 text-xs">(ID: {ticket.id})</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-6 sm:mt-auto pt-4 flex gap-3">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/events/1`}>{ticket.status === 'notices' ? 'View Event Updates' : 'Event Details'}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Right: QR / Action */}
                  <div className="w-full md:w-64 bg-muted/20 p-6 flex flex-col items-center justify-center relative border-t md:border-t-0 border-border border-dashed">
                    {/* Circle cutouts for ticket effect */}
                    <div className="hidden md:block absolute -left-3 top-[-10px] w-6 h-6 rounded-full bg-muted/30 border-b border-border shadow-inner"></div>
                    <div className="hidden md:block absolute -left-3 bottom-[-10px] w-6 h-6 rounded-full bg-muted/30 border-t border-border shadow-inner"></div>
                    
                    {ticket.status === 'upcoming' ? (
                      <>
                        <div className="bg-white p-2 rounded-xl border mb-4 shadow-sm">
                          <QrCode className="w-24 h-24 text-black" />
                        </div>
                        <Button variant="gradient" className="w-full gap-2">
                          <Download className="h-4 w-4" />
                          Download VIP Pass
                        </Button>
                      </>
                    ) : ticket.status === 'waitlist' ? (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-500/20 text-amber-500">
                          <Clock className="h-8 w-8" />
                        </div>
                        <p className="text-muted-foreground text-sm font-medium">Position: #14</p>
                        <Button variant="outline" className="w-full mt-4 border-amber-500/20 text-amber-500 hover:bg-amber-500/10" size="sm">
                          Leave Waitlist
                        </Button>
                      </div>
                    ) : ticket.status === 'notices' ? (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-brand-500/20 text-brand-500">
                          <Bell className="h-8 w-8" />
                        </div>
                        <p className="text-muted-foreground text-sm font-medium">Unread</p>
                        <Button variant="outline" className="w-full mt-4" size="sm">
                          Mark as Read
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                          <Ticket className="h-8 w-8 text-muted-foreground opacity-50" />
                        </div>
                        <p className="text-muted-foreground text-sm font-medium">Event Concluded</p>
                        <Button variant="outline" className="w-full mt-4" size="sm">
                          Leave Review
                        </Button>
                      </div>
                    )}
                  </div>

                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 bg-card border rounded-2xl">
              <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">No tickets found</h3>
              <p className="text-muted-foreground mb-6">Looks like you don't have any {filter} events.</p>
              <Button asChild variant="gradient">
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
