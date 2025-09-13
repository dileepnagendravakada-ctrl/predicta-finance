import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

const spendingTrend = [
  { month: "Jan", spending: 2400, budget: 3000, predicted: 2350 },
  { month: "Feb", spending: 2100, budget: 3000, predicted: 2200 },
  { month: "Mar", spending: 2800, budget: 3000, predicted: 2750 },
  { month: "Apr", spending: 3200, budget: 3000, predicted: 3100 },
  { month: "May", spending: 2900, budget: 3000, predicted: 2950 },
  { month: "Jun", spending: 3400, budget: 3000, predicted: 3350 },
  { month: "Jul", spending: 0, budget: 3000, predicted: 3200 },
  { month: "Aug", spending: 0, budget: 3000, predicted: 3000 },
];

const categoryTrends = {
  "Food & Dining": [
    { month: "Jan", amount: 800 }, { month: "Feb", amount: 750 }, { month: "Mar", amount: 900 },
    { month: "Apr", amount: 1100 }, { month: "May", amount: 950 }, { month: "Jun", amount: 1200 },
  ],
  "Transportation": [
    { month: "Jan", amount: 400 }, { month: "Feb", amount: 350 }, { month: "Mar", amount: 450 },
    { month: "Apr", amount: 500 }, { month: "May", amount: 420 }, { month: "Jun", amount: 550 },
  ],
  "Shopping": [
    { month: "Jan", amount: 600 }, { month: "Feb", amount: 400 }, { month: "Mar", amount: 700 },
    { month: "Apr", amount: 800 }, { month: "May", amount: 650 }, { month: "Jun", amount: 750 },
  ],
};

const insights = [
  {
    type: "warning",
    title: "Budget Alert",
    message: "You're projected to exceed your monthly budget by $400 this month.",
    action: "Reduce discretionary spending",
    icon: AlertTriangle,
  },
  {
    type: "success",
    title: "Savings Goal",
    message: "You're ahead of your Emergency Fund goal by 2 months!",
    action: "Consider increasing contribution",
    icon: CheckCircle,
  },
  {
    type: "trend",
    title: "Spending Pattern",
    message: "Your food expenses increase by 15% every weekend.",
    action: "Plan meals ahead",
    icon: TrendingUp,
  },
  {
    type: "prediction",
    title: "Next Month Forecast",
    message: "Based on trends, you'll likely spend $3,200 next month.",
    action: "Set budget alerts",
    icon: TrendingDown,
  },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          AI-powered insights and predictions for your finances
        </p>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
          <CardDescription>Personalized recommendations based on your spending patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              const iconColor = {
                warning: "text-warning",
                success: "text-success",
                trend: "text-primary",
                prediction: "text-muted-foreground",
              }[insight.type];

              return (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border">
                  <Icon className={`h-5 w-5 mt-0.5 ${iconColor}`} />
                  <div className="space-y-1">
                    <p className="font-medium">{insight.title}</p>
                    <p className="text-sm text-muted-foreground">{insight.message}</p>
                    <p className="text-xs text-primary font-medium">{insight.action}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending vs Budget</CardTitle>
              <CardDescription>Track your actual spending against your budget</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [`$${value}`, name === 'spending' ? 'Actual' : 'Budget']}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="budget" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="spending" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>Identify patterns in your spending behavior</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value}`, 'Spending']}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area type="monotone" dataKey="spending" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Predictions</CardTitle>
              <CardDescription>Machine learning forecasts based on your spending patterns</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [`$${value}`, name === 'spending' ? 'Actual' : 'Predicted']}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="spending" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="8 8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Category Analysis</h3>
            <Select defaultValue="Food & Dining">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Food & Dining Trends</CardTitle>
              <CardDescription>Monthly spending patterns in this category</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryTrends["Food & Dining"]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}