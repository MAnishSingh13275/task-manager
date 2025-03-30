import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Chip,
  Box,
  Divider,
  useTheme
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  parseISO,
  isFuture,
  isBefore,
  differenceInCalendarDays,
  formatDistanceToNowStrict
} from 'date-fns';

const getRelativeDue = (dueDate, theme) => {
  const date = typeof dueDate === 'string' ? parseISO(dueDate) : new Date(dueDate);
  const today = new Date();
  const diff = differenceInCalendarDays(date, today);

  switch (true) {
    case diff < 0:
      return {
        label: 'Overdue',
        sx: {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.contrastText
        }
      };
    case diff === 0:
      return {
        label: 'Today',
        sx: {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.contrastText
        }
      };
    case diff === 1:
      return {
        label: 'Tomorrow',
        sx: {
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.info.contrastText
        }
      };
    case diff <= 7:
      return {
        label: `In ${diff} days`,
        sx: {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.contrastText
        }
      };
    default:
      return {
        label: formatDistanceToNowStrict(date, { addSuffix: true }),
        sx: {
          backgroundColor: theme.palette.grey[100],
          color: theme.palette.grey[800]
        }
      };
  }
};

const UpcomingTasks = ({ tasks = [] }) => {
  const theme = useTheme();

  const { overdue, upcoming } = useMemo(() => {
    const overdueTasks = [];
    const upcomingTasks = [];

    tasks.forEach((task) => {
      if (!task.dueDate) return;
      const date = new Date(task.dueDate);

      if (isBefore(date, new Date())) {
        overdueTasks.push(task);
      } else {
        upcomingTasks.push(task);
      }
    });

    overdueTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    upcomingTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    return {
      overdue: overdueTasks.slice(0, 3),
      upcoming: upcomingTasks.slice(0, 5)
    };
  }, [tasks]);

  return (
    <Card
      sx={{
        height: 320,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',

      }}
    >
      <CardHeader
        title="Upcoming Tasks"
        avatar={<CalendarTodayIcon color="action" />}
        titleTypographyProps={{ fontSize: 18, fontWeight: 600 }}
        sx={{ pb: 0 }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        {overdue.length === 0 && upcoming.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No tasks due or overdue 🎉
          </Typography>
        ) : (
          <Stack spacing={3}>
            {overdue.length > 0 && (
              <Box>
                <Typography variant="subtitle2" fontWeight={600} mb={1}>
                  Overdue
                </Typography>
                <Stack spacing={1}>
                  {overdue.map((task, index) => {
                    const { label, sx } = getRelativeDue(task.dueDate, theme);
                    return (
                      <Box key={task.id}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography
                            variant="body1"
                            fontWeight={500}
                            title={task.title}
                            noWrap
                            sx={{ maxWidth: '75%' }}
                          >
                            {task.title}
                          </Typography>
                          <Chip label={label} size="small" sx={sx} />
                        </Box>
                        {index < overdue.length - 1 && <Divider sx={{ mt: 1 }} />}
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            )}

            {upcoming.length > 0 && (
              <Box>
                <Typography variant="subtitle2" fontWeight={600} mb={1}>
                  Upcoming
                </Typography>
                <Stack spacing={1}>
                  {upcoming.map((task, index) => {
                    const { label, sx } = getRelativeDue(task.dueDate, theme);
                    return (
                      <Box key={task.id}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography
                            variant="body1"
                            fontWeight={500}
                            title={task.title}
                            noWrap
                            sx={{ maxWidth: '75%' }}
                          >
                            {task.title}
                          </Typography>
                          <Chip label={label} size="small" sx={sx} />
                        </Box>
                        {index < upcoming.length - 1 && <Divider sx={{ mt: 1 }} />}
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
