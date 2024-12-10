export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  context?: Record<string, unknown>;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];

  trackMetric(name: string, fn: () => Promise<unknown>): Promise<unknown> {
    const start = performance.now();
    return fn().finally(() => {
      const duration = performance.now() - start;
      this.metrics.push({
        name,
        duration,
        timestamp: Date.now()
      });
    });
  }

  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }
}