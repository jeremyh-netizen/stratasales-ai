import { MetricCard } from "@/components/ui/metric-card";

export function OverviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Leads"
        value={1247}
        change={12.5}
        trend="up"
        description="New leads this month"
      />
      <MetricCard
        title="Conversion Rate"
        value={23.4}
        format="percentage"
        change={2.1}
        trend="up"
        description="Lead to opportunity"
      />
      <MetricCard
        title="Pipeline Value"
        value="847K"
        format="currency"
        change={8.3}
        trend="up"
        description="Total opportunity value"
      />
      <MetricCard
        title="Avg. Score"
        value={76.8}
        change={-1.2}
        trend="down"
        description="Predictive score average"
      />
    </div>
  );
}