export const measurePerformance = async <T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> => {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    logger.info(`Performance: ${name}`, { duration });
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    logger.error(`Performance error: ${name}`, { duration, error });
    throw error;
  }
};