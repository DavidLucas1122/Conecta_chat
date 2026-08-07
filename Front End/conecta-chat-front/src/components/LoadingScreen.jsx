function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-16 h-16 border-[6px] border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingScreen;
