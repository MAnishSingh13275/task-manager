import React, { useMemo } from 'react';
import {
  Grid, Card, CardContent, CardHeader, Button
} from '@mui/material';
import {
  Tooltip,
  PieChart, Pie, Cell
} from 'recharts';

// Colors for pie chart slices
const pieColors = {
  'To Do': '#8884d8',
  'In Progress': '#82ca9d',
  'Completed': '#ffc658'
};


const TaskCharts = ({ tasks = [] }) => {

  // Group tasks by status for pie chart
  const pieData = useMemo(() => {
    const statusCounts = {
      'To Do': 0,
      'In Progress': 0,
      'Completed': 0
    };

    tasks.forEach(task => {
      statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
    });

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
      color: pieColors[name]
    }));
  }, [tasks]);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Progress" action={<Button size="small">All Tasks</Button>} />
          <CardContent>
            <PieChart width={300} height={200}>
              <Tooltip />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskCharts;
