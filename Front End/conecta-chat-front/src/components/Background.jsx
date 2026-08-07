function Background({ children }) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-linear-to-b from-blue-0 to-blue-500">
      {children}
    </div>
  );
}

export default Background;
