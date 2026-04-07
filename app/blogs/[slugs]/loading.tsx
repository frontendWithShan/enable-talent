
export default function Loading() {
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col bg-white">
      <div className="grow flex items-center justify-center py-16">
        <div className="animate-pulse max-w-4xl w-full px-4">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-8" />
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-12" />
          <div className="h-64 bg-gray-200 rounded mb-8" />
          <div className="h-4 bg-gray-200 rounded w-full mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-8" />
          <div className="h-4 bg-gray-200 rounded w-full mb-4" />
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
        </div>
      </div>
    </main>
  );
}
