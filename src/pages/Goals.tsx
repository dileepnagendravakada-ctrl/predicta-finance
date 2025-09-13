import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, TrendingUp, Calendar, DollarSign } from "lucide-react";

const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    description: "Build a 6-month emergency fund",
    target: 10000,
    current: 6500,
    deadline: "2024-12-31",
    priority: "High",
    status: "On Track",
    monthlyContribution: 500,
  },
  {
    id: 2,
    name: "New Car",
    description: "Save for a reliable used car",
    target: 25000,
    current: 12000,
    deadline: "2025-06-30",
    priority: "Medium",
    status: "On Track",
    monthlyContribution: 800,
  },
  {
    id: 3,
    name: "House Down Payment",
    description: "20% down payment for first home",
    target: 50000,
    current: 18000,
    deadline: "2025-12-31",
    priority: "High",
    status: "Behind",
    monthlyContribution: 1200,
  },
  {
    id: 4,
    name: "Vacation to Europe",
    description: "2-week European vacation",
    target: 5000,
    current: 3200,
    deadline: "2024-09-01",
    priority: "Low",
    status: "Ahead",
    monthlyContribution: 300,
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "On Track": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Ahead": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Behind": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export default function Goals() {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
          <p className="text-muted-foreground">
            Set and track your financial objectives
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Goal
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSaved.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              of ${totalTarget.toLocaleString()} total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-xs text-muted-foreground">
              {goals.filter(g => g.status === "On Track").length} on track
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="grid gap-4">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;
          const monthsRemaining = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30));
          const requiredMonthly = remaining / monthsRemaining;
          
          return (
            <Card key={goal.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{goal.name}</CardTitle>
                    <CardDescription>{goal.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(goal.priority)} variant="secondary">
                      {goal.priority}
                    </Badge>
                    <Badge className={getStatusColor(goal.status)} variant="secondary">
                      {goal.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${goal.current.toLocaleString()}</span>
                      <span>${goal.target.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {monthsRemaining} months remaining
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">${remaining.toLocaleString()}</span> left to save
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Current contribution:</span>
                      <div className="font-medium">${goal.monthlyContribution}/month</div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Required:</span>
                      <div className={`font-medium ${requiredMonthly > goal.monthlyContribution ? 'text-destructive' : 'text-success'}`}>
                        ${Math.ceil(requiredMonthly)}/month
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    Edit Goal
                  </Button>
                  <Button variant="outline" size="sm">
                    Add Contribution
                  </Button>
                  {requiredMonthly > goal.monthlyContribution && (
                    <Button variant="destructive" size="sm">
                      Increase Contribution
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}