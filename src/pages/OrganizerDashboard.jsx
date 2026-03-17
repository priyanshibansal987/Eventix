import { Link } from "react-router-dom"
import { 
  Calendar, CreditCard, 
  Users, ArrowUpRight, Ticket, PlusCircle 
} from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"

export function OrganizerDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your events today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tickets Sold</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +180 since yesterday
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              4 events concluding this week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +19% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart Placeholder */}
        <Card className="bg-card lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Ticket sales over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full flex items-end justify-between px-6 pb-2">
              {/* Dummy Chart Bars */}
              {[40, 70, 45, 90, 65, 85, 120, 100, 80, 110].map((h, i) => (
                <div key={i} className="w-[8%] bg-brand-500/20 hover:bg-brand-500 transition-colors rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Events List */}
        <Card className="bg-card lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Your latest published events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { title: "Neon Nights Festival", date: "Aug 15", sales: "1,240/1,500", rev: "$105k" },
                { title: "Tech Startup Pitch", date: "Sep 02", sales: "210/300", rev: "$12.5k" },
                { title: "Culinary Workshop", date: "Jul 22", sales: "45/50", rev: "$5.4k" },
                { title: "Yoga Retreat", date: "Oct 10", sales: "12/20", rev: "$2.4k" },
              ].map((ev, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border/50 last:border-0 pb-4 last:pb-0">
                  <div>
                    <p className="text-sm font-medium leading-none mb-1">{ev.title}</p>
                    <p className="text-xs text-muted-foreground">{ev.date} • {ev.sales} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{ev.rev}</p>
                    <Badge variant="outline" className="mt-1 text-[10px] px-1.5 py-0 h-4">Active</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
