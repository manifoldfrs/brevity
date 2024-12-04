interface Config {
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    enableMindMap: boolean;
    enableCache: boolean;
  };
  limits: {
    maxContentLength: number;
    maxSummaryLength: number;
  };
}

export const getConfig = (): Config => {
  return {
    api: {
      baseUrl: import.meta.env.VITE_API_URL,
      timeout: 30000,
    },
    features: {
      enableMindMap: import.meta.env.VITE_ENABLE_MINDMAP === 'true',
      enableCache: import.meta.env.VITE_ENABLE_CACHE === 'true',
    },
    limits: {
      maxContentLength: 50000,
      maxSummaryLength: 5000,
    },
  };
};