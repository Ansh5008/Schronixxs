export default function FlowingLines() {
  return (
    <div className="absolute inset-0 opacity-20" data-testid="flowing-lines-background">
      <svg className="absolute bottom-0 right-0 w-1/2 h-1/2" viewBox="0 0 400 300" fill="none">
        <path 
          d="M0 200C50 150 150 250 200 200C250 150 350 250 400 200V300H0V200Z" 
          fill="white" 
          fillOpacity="0.3"
        />
        <path 
          d="M0 220C60 170 140 270 200 220C260 170 340 270 400 220V300H0V220Z" 
          fill="white" 
          fillOpacity="0.2"
        />
        <path 
          d="M0 240C70 190 130 290 200 240C270 190 330 290 400 240V300H0V240Z" 
          fill="white" 
          fillOpacity="0.1"
        />
      </svg>
    </div>
  );
}
