const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>

        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Page Not Found
        </p>

        <p className="mt-2 text-gray-500 max-w-md mx-auto">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6">
          <a
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
