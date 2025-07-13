export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 flex-1">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 shadow-lg"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur animate-pulse"></div>
      </div>
      <div className="text-center">
        <p className="text-slate-700 dark:text-slate-200 text-lg font-medium animate-pulse">
          Loading secure message...
        </p>
      </div>
    </div>
  );
}
