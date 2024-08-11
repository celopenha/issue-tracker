"use client"
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data: {
    label: string;
    value: number;
  }[] = [
    { label: "Open issues", value: open },
    { label: "In-Progress issues", value: inProgress},
    { label: "Closed issues", value: closed },
  ];

  return (
    <Card className="w-full">
      <ResponsiveContainer width="95%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar barSize={60} dataKey="value" style={{fill: "var(--accent-9)"}} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
