import { useState } from "react"
import { BarChart3, LineChart, PieChart, TrendingUp, TrendingDown, Calendar, DollarSign, Users, MousePointerClick } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { Select } from "../components/ui/Select"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"

export function OrganizerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [eventFilter, setEventFilter] = useState("all")

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
          <p className="text-muted-foreground mt-1">Detailed performance metrics for your events.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Select 
            className="bg-card w-full md:w-48"
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="neon">Neon Nights Festival</option>
            <option value="tech">Tech Startup Pitch</option>
          </Select>
          <Select 
            className="bg-card w-full md:w-40"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 3 Months</option>
            <option value="1y">Last Year</option>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-brand-500/10 p-3 rounded-lg text-brand-500">
                <DollarSign className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <TrendingUp className="w-3 h-3 mr-1" /> +14.2%
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Revenue</p>
              <h3 className="text-3xl font-bold mt-1">$124,500.00</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-500/10 p-3 rounded-lg text-blue-500">
                <Users className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <TrendingUp className="w-3 h-3 mr-1" /> +8.4%
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Registrations</p>
              <h3 className="text-3xl font-bold mt-1">2,845</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-amber-500/10 p-3 rounded-lg text-amber-500">
                <MousePointerClick className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <TrendingUp className="w-3 h-3 mr-1" /> +2.1%
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Page Views</p>
              <h3 className="text-3xl font-bold mt-1">45.2k</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-rose-500/10 p-3 rounded-lg text-rose-500">
                <Calendar className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
                <TrendingDown className="w-3 h-3 mr-1" /> -1.2%
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Conversion Rate</p>
              <h3 className="text-3xl font-bold mt-1">6.2%</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Line Chart */}
        <Card className="bg-card lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Ticket Sales Trend</CardTitle>
                <CardDescription>Daily revenue over selected period</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">Download Report</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-end justify-between px-2 pb-2 relative border-b border-l border-border mt-4">
              {/* Fake Y Axis lines */}
              <div className="absolute w-full h-px bg-border top-0 left-0"></div>
              <div className="absolute w-full h-px bg-border top-[25%] left-0"></div>
              <div className="absolute w-full h-px bg-border top-[50%] left-0"></div>
              <div className="absolute w-full h-px bg-border top-[75%] left-0"></div>
              
              {/* Fake Y Axis labels */}
              <span className="absolute -left-12 top-0 text-xs text-muted-foreground">$10k</span>
              <span className="absolute -left-12 top-[25%] text-xs text-muted-foreground">$7.5k</span>
              <span className="absolute -left-12 top-[50%] text-xs text-muted-foreground">$5k</span>
              <span className="absolute -left-12 top-[75%] text-xs text-muted-foreground">$2.5k</span>
              <span className="absolute -left-12 bottom-0 text-xs text-muted-foreground">$0</span>

              {/* Data curve proxy (SVG path) */}
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <path 
                  d="M0,280 C50,250 100,150 150,180 C200,210 250,50 300,120 C350,190 400,90 450,150 C500,210 550,50 600,10" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  className="text-brand-500 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                  vectorEffect="non-scaling-stroke"
                />
                <path 
                  d="M0,280 C50,250 100,150 150,180 C200,210 250,50 300,120 C350,190 400,90 450,150 C500,210 550,50 600,10 L600,300 L0,300 Z" 
                  fill="currentColor" 
                  className="text-brand-500/10"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            {/* Fake X Axis labels */}
            <div className="flex justify-between px-2 mt-4 text-xs text-muted-foreground">
              <span>May 1</span>
              <span>May 8</span>
              <span>May 15</span>
              <span>May 22</span>
              <span>May 29</span>
            </div>
          </CardContent>
        </Card>

        {/* Small Bar/Pie Charts Side */}
        <div className="space-y-6 lg:col-span-1">
          
          <Card className="bg-card flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Sales by Ticket Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[140px] flex items-end justify-between px-2 pt-4">
                <div className="w-[20%] group relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">65%</div>
                  <div className="h-[65%] w-full bg-brand-500 rounded-t-sm"></div>
                  <div className="text-center text-xs mt-2 text-muted-foreground">GA</div>
                </div>
                <div className="w-[20%] group relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">25%</div>
                  <div className="h-[25%] w-full bg-blue-500 rounded-t-sm"></div>
                  <div className="text-center text-xs mt-2 text-muted-foreground">VIP</div>
                </div>
                <div className="w-[20%] group relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">8%</div>
                  <div className="h-[8%] w-full bg-amber-500 rounded-t-sm"></div>
                  <div className="text-center text-xs mt-2 text-muted-foreground">Early</div>
                </div>
                <div className="w-[20%] group relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">2%</div>
                  <div className="h-[2%] w-full bg-emerald-500 rounded-t-sm"></div>
                  <div className="text-center text-xs mt-2 text-muted-foreground">Promo</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="pt-2 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-500"></div> Direct
                  </span>
                  <span className="text-sm">45%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-brand-500 rounded-full" />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> Social
                  </span>
                  <span className="text-sm">30%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="w-[30%] h-full bg-blue-500 rounded-full" />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Organic
                  </span>
                  <span className="text-sm">15%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-emerald-500 rounded-full" />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div> Referral
                  </span>
                  <span className="text-sm">10%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="w-[10%] h-full bg-amber-500 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
