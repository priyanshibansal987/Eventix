import { Link } from "react-router-dom"
import { Calendar, MoreVertical, PlusCircle, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Badge } from "../components/ui/Badge"

const MY_EVENTS = [
  { id: 1, title: "Neon Nights Music Festival", date: "Aug 15, 2026", status: "Published", attendees: 1240, capacity: 1500, sales: "$105,400" },
  { id: 2, title: "Tech Startup Pitch Night", date: "Sep 02, 2026", status: "Published", attendees: 210, capacity: 300, sales: "$12,500" },
  { id: 3, title: "Culinary Masterclass: Sushi", date: "Jul 22, 2026", status: "Draft", attendees: 0, capacity: 50, sales: "$0" },
  { id: 4, title: "Yoga & Mindfulness Retreat", date: "Oct 10, 2026", status: "Published", attendees: 12, capacity: 20, sales: "$2,400" },
  { id: 5, title: "Web3 Developer Summit", date: "Nov 05, 2026", status: "Published", attendees: 450, capacity: 500, sales: "$42,000" },
  { id: 6, title: "Indie Game Show", date: "Dec 01, 2026", status: "Unpublished", attendees: 0, capacity: 200, sales: "$0" },
]

export function OrganizerEventsPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your hosted events.</p>
        </div>
        <Button variant="gradient" className="gap-2 shrink-0" asChild>
          <Link to="/create-event">
            <PlusCircle className="h-4 w-4" /> Create Event
          </Link>
        </Button>
      </div>

      <Card className="bg-card mb-8">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-9 bg-muted/50" />
            </div>
            <Button variant="outline" className="shrink-0 gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">6</span> Total Events
          </div>
        </CardContent>
      </Card>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Event Name</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Attendees</th>
                <th className="px-6 py-4 font-medium text-right">Sales</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {MY_EVENTS.map((event) => (
                <tr key={event.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {event.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {event.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`
                      ${event.status === 'Published' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' : ''}
                      ${event.status === 'Draft' ? 'border-amber-500/30 text-amber-500 bg-amber-500/10' : ''}
                      ${event.status === 'Unpublished' ? 'border-brand-500/30 text-brand-500 bg-brand-500/10' : ''}
                    `}>
                      {event.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span>{event.attendees} / {event.capacity}</span>
                      <div className="w-24 h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full ${event.attendees/event.capacity > 0.8 ? 'bg-emerald-500' : 'bg-brand-500'}`} 
                          style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    {event.sales}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-blue-500">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
