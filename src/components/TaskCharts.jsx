import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const TaskCharts = ({ tasks = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const pieData = useMemo(() => {
    const counts = { 'To Do': 0, 'In Progress': 0, Completed: 0 };
    tasks.forEach((task) => {
      counts[task.status]++;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color:
        name === 'To Do'
          ? theme.palette.info.main
          : name === 'In Progress'
            ? theme.palette.warning.main
            : theme.palette.success.main,
    }));
  }, [tasks, theme]);

  const priorityData = useMemo(() => {
    const counts = { High: 0, Medium: 0, Low: 0 };
    tasks.forEach((task) => {
      counts[task.priority]++;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color:
        name === 'High'
          ? theme.palette.error.main
          : name === 'Medium'
            ? theme.palette.warning.main
            : theme.palette.success.main,
    }));
  }, [tasks, theme]);

  const totalTasks = pieData.reduce((sum, entry) => sum + entry.value, 0);

  if (totalTasks === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            No tasks available to show analytics.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={2}
      width="100%"
      height="100%"
    >
      {/* Pie Chart Card */}
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Task Status Distribution
          </Typography>

          <Box
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            width="100%"
          >
            <Box flex={1} minWidth={180} height={isMobile ? '80%' : "100%"} width={isMobile ? '80%' : "100%"}>
              <ResponsiveContainer width="100%" height="100%" aspect={1}>
                <PieChart>
                  <RechartTooltip />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius="40%"
                    outerRadius="70%"
                    paddingAngle={2}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Box
              display="flex"
              flexWrap={isMobile ? 'wrap' : 'nowrap'}
              flexDirection={isMobile ? 'row' : 'column'}
              gap={2}
              width="100%"
              height="100%"

            >
              {pieData.map((entry) => (
                <Box key={entry.name} display="flex" alignItems="center" gap={1}>
                  <RadioButtonCheckedIcon sx={{ color: entry.color, fontSize: 18 }} />
                  <Typography variant="body2" fontWeight={500}>
                    {entry.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {entry.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Bar Chart Card */}
      <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Task Priority Overview
          </Typography>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={priorityData}
                margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={6}
                />
                <RechartTooltip />
                <Bar dataKey="value" barSize={30}>
                  {priorityData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>



    </Box>
  );
};

export default TaskCharts;
