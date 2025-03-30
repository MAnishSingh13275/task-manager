export const filterTasksByOptions = (tasks, filters) => {
    let result = [...tasks];
  
    // Filter by priority
    if (filters.priority !== 'all') {
      result = result.filter((t) => t.priority === filters.priority);
    }
  
    // Filter by date
    if (filters.date !== 'all') {
      const today = new Date();
      let start = new Date();
      let end = new Date();
  
      if (filters.date === 'today') {
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
      } else if (filters.date === 'week') {
        start.setDate(today.getDate() - today.getDay());
        end.setDate(today.getDate() + (6 - today.getDay()));
      } else if (filters.date === 'month') {
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      }
  
      result = result.filter((t) => {
        const date = new Date(t.dueDate);
        return date >= start && date <= end;
      });
    }
  
    // Sort logic
    const { sortBy = 'date', sortOrder = 'asc' } = filters;
  
    result.sort((a, b) => {
      let valueA, valueB;
  
      if (sortBy === 'date') {
        valueA = new Date(a.dueDate);
        valueB = new Date(b.dueDate);
      } else if (sortBy === 'priority') {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        valueA = priorityOrder[a.priority] || 0;
        valueB = priorityOrder[b.priority] || 0;
      } else if (sortBy === 'title') {
        valueA = a.title.toLowerCase();
        valueB = b.title.toLowerCase();
      }
  
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  
    return result;
  };
  