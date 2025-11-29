export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-200 dark:bg-gray-800 p-4 fixed top-0 left-0">
      <ul className="space-y-2">
        <li>
          <a
            href="#introduction"
            className="block px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            Introduction
          </a>
        </li>
      </ul>
    </div>
  );
}
