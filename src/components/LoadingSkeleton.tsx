interface LoadingSkeletonProps {
  rows?: number;
  height?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  rows = 3,
  height = '20px'
}) => {
  return (
    <div className="loading-skeleton">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="skeleton-row"
          style={{ height }}
        />
      ))}
    </div>
  );
};