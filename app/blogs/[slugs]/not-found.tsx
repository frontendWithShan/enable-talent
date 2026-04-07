export default function BlogNotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col bg-white">
      <div className="grow flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <p className="text-gray-600 mb-8">
          The blog post you are looking for does not exist or has been removed.
        </p>
      </div>
    </main>
  );
}
