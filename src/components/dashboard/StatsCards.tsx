import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target, CreditCard, PiggyBank } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
}

function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend === "up" ? (
            <TrendingUp className="mr-1 h-3 w-3" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3" />
          )}
          <span className={trend === "up" ? "text-success" : "text-destructive"}>
            {change}
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const stats = [
    {
      title: "Total Spending",
      value: "$3,249.50",
      change: "+12.3%",
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      title: "Budget Remaining",
      value: "$1,750.50",
      change: "-5.2%",
      trend: "down" as const,
      icon: PiggyBank,
    },
    {
      title: "Transactions",
      value: "142",
      change: "+8.1%",
      trend: "up" as const,
      icon: CreditCard,
    },
    {
      title: "Goals on Track",
      value: "3/5",
      change: "+1",
      trend: "up" as const,
      icon: Target,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}