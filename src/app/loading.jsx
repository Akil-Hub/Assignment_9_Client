const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />

        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;