import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target, Plus, Car, Home, Plane, GraduationCap } from "lucide-react";

const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 10000,
    current: 6500,
    deadline: "Dec 2024",
    icon: Target,
    color: "text-green-600",
  },
  {
    id: 2,
    name: "New Car",
    target: 25000,
    current: 12000,
    deadline: "Jun 2025",
    icon: Car,
    color: "text-blue-600",
  },
  {
    id: 3,
    name: "House Down Payment",
    target: 50000,
    current: 18000,
    deadline: "Dec 2025",
    icon: Home,
    color: "text-purple-600",
  },
  {
    id: 4,
    name: "Vacation to Europe",
    target: 5000,
    current: 3200,
    deadline: "Sep 2024",
    icon: Plane,
    color: "text-orange-600",
  },
  {
    id: 5,
    name: "MBA Program",
    target: 80000,
    current: 8000,
    deadline: "Aug 2026",
    icon: GraduationCap,
    color: "text-indigo-600",
  },
];

export function GoalsProgress() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Financial Goals</CardTitle>
          <CardDescription>Track your progress towards your financial objectives</CardDescription>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const progress = (goal.current / goal.target) * 100;
            const remaining = goal.target - goal.current;
            
            return (
              <div key={goal.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full bg-muted ${goal.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{goal.name}</p>
                      <p className="text-sm text-muted-foreground">Target by {goal.deadline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${goal.current.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">of ${goal.target.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{progress.toFixed(1)}% complete</span>
                    <span>${remaining.toLocaleString()} remaining</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}