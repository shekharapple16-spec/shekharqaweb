export default function Layout({ children }) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-primary text-secondary">
      <div className="flex-1 overflow-y-auto w-full">
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
