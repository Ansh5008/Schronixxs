export default function FlowingLines() {
  return (
    <div className="absolute inset-0 overflow-hidden" data-testid="flowing-lines-background">
      <svg className="absolute bottom-0 right-0 w-full h-full" viewBox="0 0 800 600" fill="none">
        {/* Multiple flowing line paths to match the design */}
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M${600 + i * 8} ${400 + i * 15} Q${700 + i * 6} ${350 + i * 12} ${800} ${380 + i * 10}`}
            stroke="rgba(0, 0, 0, 0.1)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <path
            key={`curve-${i}`}
            d={`M${650 + i * 6} ${300 + i * 20} Q${750 + i * 4} ${250 + i * 15} ${800} ${280 + i * 12}`}
            stroke="rgba(0, 0, 0, 0.08)"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
}
