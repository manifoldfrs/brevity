interface AnalyticsEvent {
  eventName: string;
  properties: Record<string, unknown>;
  timestamp: number;
}

export const trackEvent = (
  eventName: string,
  properties: Record<string, unknown>
): void => {
  const event: AnalyticsEvent = {
    eventName,
    properties,
    timestamp: Date.now()
  };

  // Send to analytics service
  console.log('Analytics event:', event);
};