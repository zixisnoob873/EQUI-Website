export default function Loading() {
  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center">
      <div className="text-center">
        {/* Animated EQUI text */}
        <p className="font-display text-4xl font-black tracking-[0.2em] text-cyber-gold text-glow-gold animate-pulse mb-4">
          EQUI
        </p>

        {/* Loading bar */}
        <div className="w-48 h-[2px] bg-cyber-gunmetal mx-auto relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-[30%] bg-cyber-yellow animate-[loading-bar_1.5s_ease-in-out_infinite]" />
        </div>

        <p className="font-mono text-[10px] text-cyber-ghost tracking-[0.4em] uppercase mt-4">
          Loading Systems...
        </p>
      </div>
    </div>
  );
}
