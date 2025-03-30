import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  useTheme
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
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
            : theme.palette.success.main
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
            : theme.palette.success.main
    }));
  }, [tasks, theme]);

  const totalTasks = pieData.reduce((sum, entry) => sum + entry.value, 0);

  if (totalTasks === 0) {
    return (
      <Card sx={{ my: 3 }}>
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
      gap={3}
      height="100%"
    >
      {/* Pie Chart Card */}
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={600}
            color="text.primary"
            gutterBottom
          >
            Task Status Distribution
          </Typography>

          <Box sx={{
            width: '100%',
            height: 240,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                  cx="50%"
                  cy="50%"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <Stack spacing={1}>
              {pieData.map((entry) => (
                <Box
                  key={entry.name}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <RadioButtonCheckedIcon
                    sx={{ color: entry.color, fontSize: 18 }}
                  />
                  <Typography variant="body2" fontWeight={500}>
                    {entry.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {entry.value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Bar Chart Card */}
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={600}
            color="text.primary"
            gutterBottom
          >
            Task Priority Overview
          </Typography>
          <Box width="100%" height={240}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value">
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
