import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Car, Coffee, Zap, Gamepad2, Plane } from "lucide-react";

const transactions = [
  {
    id: 1,
    description: "Starbucks Coffee",
    category: "Food & Dining",
    amount: -12.50,
    date: "Today",
    icon: Coffee,
    predicted: false,
  },
  {
    id: 2,
    description: "Uber Ride",
    category: "Transportation",
    amount: -18.75,
    date: "Today",
    icon: Car,
    predicted: false,
  },
  {
    id: 3,
    description: "Amazon Purchase",
    category: "Shopping",
    amount: -89.99,
    date: "Yesterday",
    icon: ShoppingCart,
    predicted: false,
  },
  {
    id: 4,
    description: "Electricity Bill",
    category: "Bills & Utilities",
    amount: -125.00,
    date: "2 days ago",
    icon: Zap,
    predicted: true,
  },
  {
    id: 5,
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99,
    date: "3 days ago",
    icon: Gamepad2,
    predicted: true,
  },
  {
    id: 6,
    description: "Flight Booking",
    category: "Travel",
    amount: -450.00,
    date: "1 week ago",
    icon: Plane,
    predicted: false,
  },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Food & Dining": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    "Transportation": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Shopping": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "Bills & Utilities": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Entertainment": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    "Travel": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  };
  return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
};

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest expenses and categorizations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-muted">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{transaction.description}</p>
                      {transaction.predicted && (
                        <Badge variant="secondary" className="text-xs">
                          AI Categorized
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getCategoryColor(transaction.category)} variant="secondary">
                        {transaction.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.amount < 0 ? "text-destructive" : "text-success"}`}>
                    {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}