export const errorHasStatus = (error: unknown): error is Error & { status: number } => {
  if (!(error instanceof Error)) return false;
  if (!('status' in error) || typeof error.status !== 'number') return false;

  return true;
};
