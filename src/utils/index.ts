// Common utility functions

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};
