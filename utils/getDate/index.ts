export const getDate = (timestamp: string): { created_date: string; created_at_time: number } => {
  const date = new Date(timestamp);
  if (isNaN(new Date(timestamp).valueOf())) return { created_date: '', created_at_time: -1 };

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return { created_date: `${day}.${month}.${year} (${hour}:${minutes})`, created_at_time: date.getTime() };
};
