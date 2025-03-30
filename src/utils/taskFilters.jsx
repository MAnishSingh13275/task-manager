const PRIORITY_ORDER = { High: 3, Medium: 2, Low: 1 };

export const filterTasksByOptions = (tasks, filters) => {
  if (!Array.isArray(tasks) || tasks.length === 0) return [];

  let filtered = [...tasks];

  // 1. Filter by Priority
  if (filters.priority && filters.priority !== 'all') {
    filtered = filtered.filter(task => task.priority === filters.priority);
  }

  // 2. Filter by Due Date
  if (filters.date && filters.date !== 'all') {
    const now = new Date();
    let start = new Date(now);
    let end = new Date(now);

    switch (filters.date) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case 'week':
        const day = now.getDay();
        start.setDate(now.getDate() - day);
        start.setHours(0, 0, 0, 0);
        end.setDate(now.getDate() + (6 - day));
        end.setHours(23, 59, 59, 999);
        break;
      case 'month':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        break;
      default:
        break;
    }

    filtered = filtered.filter(task => {
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      return due >= start && due <= end;
    });
  }

  // 3. Sorting
  const sortBy = filters.sortBy || 'date';
  const sortOrder = filters.sortOrder || 'asc';

  const sorters = {
    date: (a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0),
    title: (a, b) => a.title.localeCompare(b.title),
    priority: (a, b) => (PRIORITY_ORDER[a.priority] || 0) - (PRIORITY_ORDER[b.priority] || 0),
  };

  const sorter = sorters[sortBy];

  if (sorter) {
    filtered.sort((a, b) => sortOrder === 'asc' ? sorter(a, b) : sorter(b, a));
  }

  return filtered;
};
