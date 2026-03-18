import { useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, MapPin, Download, Ticket, QrCode, Bell, Info } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
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
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
  },
  {
    id: "TKT-4452",
    event: "Future of AI Conference",
    date: "Sep 22, 2026",
    time: "9:00 AM",
    location: "Moscone Center, SF",
    type: "General Admission",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa"
  },
  {
    id: "TKT-1189",
    event: "Culinary Masterclass: Sushi",
    date: "Jul 10, 2026",
    time: "6:00 PM",
    location: "The Epicurean Room, NYC",
    type: "Participating Chef",
    status: "history",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754"
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
    image: "https://images.unsplash.com/photo-1470229722913-7c090be5c520"
  }
]

export function MyTicketsPage() {
  const [filter, setFilter] = useState("all")

  const filteredTickets =
    filter === "all"
      ? MY_TICKETS
      : MY_TICKETS.filter((t) => t.status === filter)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 py-10">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Tickets</h1>
          <p className="text-muted-foreground">
            Manage your event registrations and download your passes.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-8 overflow-x-auto hide-scrollbar">
          {["all", "upcoming", "history", "notices"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 font-medium text-sm transition-colors relative whitespace-nowrap capitalize ${
                filter === tab
                  ? "text-brand-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setFilter(tab)}
            >
              {tab === "all" ? "All Tickets" : tab}
              {filter === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tickets */}
        <div className="space-y-6">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="overflow-hidden bg-card border-border hover:border-brand-500/30 transition-colors group"
              >
                {/* ✅ FIXED HEIGHT CONTAINER */}
                <div className="flex flex-col md:flex-row h-full min-h-[260px] items-stretch">

                  {/* LEFT */}
                  <div className="flex-1 flex flex-col sm:flex-row p-0 md:border-r border-border border-dashed">
                    
                    {/* Image */}
                    <div className="w-full md:w-48 h-[260px] md:h-auto min-w-[12rem] bg-muted overflow-hidden">
                      <img
                        src={ticket.image}
                        alt={ticket.event}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x300?text=Event"
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>

                        {/* BADGES ONLY IN ALL */}
                        {filter === "all" && (
                          <>
                            {ticket.status === "upcoming" && (
                              <Badge className="mb-3 bg-brand-500 text-white border-brand-500/30">
                                Upcoming
                              </Badge>
                            )}
                            {ticket.status === "history" && (
                              <Badge className="mb-3 bg-gray-500 text-white border-gray-500/30">
                                History
                              </Badge>
                            )}
                            {ticket.status === "notices" && (
                              <Badge className="mb-3 bg-indigo-500 text-white border-indigo-500/30">
                                Notice
                              </Badge>
                            )}
                          </>
                        )}

                        <h3 className="text-xl font-bold mb-2">
                          {ticket.event}
                        </h3>

                        {ticket.status === "notices" ? (
                          <p className="text-sm text-muted-foreground bg-muted/40 p-3 rounded-md border">
                            <Info className="inline w-4 h-4 mr-2" />
                            {ticket.message}
                          </p>
                        ) : (
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {ticket.date} at {ticket.time}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {ticket.location}
                            </div>
                            <div className="flex items-center gap-2 font-medium text-foreground">
                              <Ticket className="h-4 w-4 text-brand-500" />
                              {ticket.type}
                              <span className="text-xs text-muted-foreground ml-2">
                                (ID: {ticket.id})
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/events/1`}>
                            {ticket.status === "notices"
                              ? "View Updates"
                              : "Event Details"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="w-full md:w-64 p-6 flex flex-col items-center justify-center h-full">

                    {ticket.status === "upcoming" ? (
                      <>
                        <QrCode className="w-20 h-20 mb-4" />
                        <Button className="w-full gap-2">
                          <Download className="h-4 w-4" />
                          Download Pass
                        </Button>
                      </>
                    ) : ticket.status === "notices" ? (
                      <>
                        <Bell className="w-12 h-12 mb-3 text-brand-500" />
                        <Button variant="outline" size="sm">
                          Mark as Read
                        </Button>
                      </>
                    ) : (
                      <>
                        <Ticket className="w-12 h-12 mb-3 text-muted-foreground" />
                        <p className="text-sm mb-2">Event Concluded</p>
                        <Button variant="outline" size="sm">
                          Leave Review
                        </Button>
                      </>
                    )}
                  </div>

                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-20">
              <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">No tickets found</h3>
              <Button asChild>
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}