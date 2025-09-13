import { StatsCards } from "@/components/dashboard/StatsCards";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { GoalsProgress } from "@/components/dashboard/GoalsProgress";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your financial health and recent activity
        </p>
      </div>

      <StatsCards />
      
      <ExpenseChart />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentTransactions />
        <GoalsProgress />
      </div>
    </div>
  );
}