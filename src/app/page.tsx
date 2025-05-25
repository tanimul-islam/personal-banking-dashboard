// src/app/page.tsx

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Personal Banking Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Track your income and expenses, visualize your finances, and stay in
          control.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Register
          </a>
        </div>
      </div>
    </main>
  );
}
