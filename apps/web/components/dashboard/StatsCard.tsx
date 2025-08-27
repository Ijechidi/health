import React from "react";
import { Card } from "@repo/ui/components/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, subtitle, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">{subtitle}</p>
            {trend && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                trend.isPositive 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}
              </span>
            )}
          </div>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
