import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Chip,
  Box,
  Divider
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { parseISO, isFuture, differenceInCalendarDays, formatDistanceToNowStrict } from 'date-fns';

const getRelativeDue = (dueDate) => {
  const date = typeof dueDate === 'string' ? parseISO(dueDate) : new Date(dueDate);
  const diff = differenceInCalendarDays(date, new Date());

  if (diff === 0) return { label: 'Today', color: 'primary' };
  if (diff === 1) return { label: 'Tomorrow', color: 'info' };
  if (diff <= 7) return { label: `In ${diff} days`, color: 'warning' };
  return { label: formatDistanceToNowStrict(date, { addSuffix: true }), color: 'default' };
};

const UpcomingTasks = ({ tasks = [] }) => {
  const upcoming = useMemo(() => {
    return tasks
      .filter((task) => task.dueDate && isFuture(new Date(task.dueDate)))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);
  }, [tasks]);

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Upcoming Tasks"
        avatar={<CalendarTodayIcon color="action" />}
        titleTypographyProps={{ fontSize: 18, fontWeight: 600 }}
        sx={{ pb: 0 }}
      />
      <CardContent>
        {upcoming.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No upcoming tasks 🎉
          </Typography>
        ) : (
          <Stack spacing={2}>
            {upcoming.map((task, index) => {
              const { label, color } = getRelativeDue(task.dueDate);
              return (
                <Box key={task.id}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" fontWeight={500}>
                      {task.title}
                    </Typography>
                    <Chip label={label} size="small" color={color} />
                  </Box>
                  {index < upcoming.length - 1 && <Divider sx={{ mt: 1 }} />}
                </Box>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
