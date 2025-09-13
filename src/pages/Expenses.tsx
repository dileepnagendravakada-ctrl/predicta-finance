import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Download, Upload } from "lucide-react";

const mockExpenses = [
  { id: 1, date: "2024-01-15", description: "Starbucks Coffee", amount: 12.50, category: "Food & Dining", paymentMethod: "Credit Card" },
  { id: 2, date: "2024-01-15", description: "Uber Ride", amount: 18.75, category: "Transportation", paymentMethod: "Debit Card" },
  { id: 3, date: "2024-01-14", description: "Amazon Purchase", amount: 89.99, category: "Shopping", paymentMethod: "Credit Card" },
  { id: 4, date: "2024-01-14", description: "Electricity Bill", amount: 125.00, category: "Bills & Utilities", paymentMethod: "Bank Transfer" },
  { id: 5, date: "2024-01-13", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", paymentMethod: "Credit Card" },
  { id: 6, date: "2024-01-12", description: "Grocery Shopping", amount: 156.43, category: "Food & Dining", paymentMethod: "Debit Card" },
  { id: 7, date: "2024-01-11", description: "Gas Station", amount: 45.20, category: "Transportation", paymentMethod: "Credit Card" },
  { id: 8, date: "2024-01-10", description: "Gym Membership", amount: 49.99, category: "Health & Fitness", paymentMethod: "Bank Transfer" },
];

const categories = ["All Categories", "Food & Dining", "Transportation", "Shopping", "Bills & Utilities", "Entertainment", "Health & Fitness"];

export default function Expenses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredExpenses = mockExpenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Food & Dining": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      "Transportation": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "Shopping": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      "Bills & Utilities": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "Entertainment": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      "Health & Fitness": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">
            Track and categorize your spending
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
          <CardDescription>Find specific expenses or filter by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
          <CardDescription>
            {filteredExpenses.length} expenses found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-medium">{expense.description}</p>
                    <Badge className={getCategoryColor(expense.category)} variant="secondary">
                      {expense.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{expense.date}</span>
                    <span>{expense.paymentMethod}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-destructive">
                    -${expense.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}