
export default function Loading() {
  return (
      <main id="main-content" tabIndex={-1} className="flex min-h-screen max-w-360 mx-auto flex-col bg-white">
          <section className="py-20 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
          Our Blog
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay informed with cutting-edge AI insights, wellness innovation, and
          inclusive tech-driven hiring – connecting diverse talent with
          forward-thinking employers
        </p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-64 bg-gray-100 animate-pulse rounded-xl"
                />
              ))}
            </div>
    </main>
  );
}
