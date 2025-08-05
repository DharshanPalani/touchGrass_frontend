function Sidebar() {
  return (
    <aside className="h-screen w-56 bg-green-700 text-white font-sans">
      <div className="flex h-full flex-col items-center justify-center space-y-6 text-base font-bold">
        <a href="/friends" className="hover:underline">
          My Friends
        </a>
        <a href="/settings" className="hover:underline">
          My Settings
        </a>
        <a href="/profile" className="hover:underline">
          My Profile
        </a>
        <a href="/logout" className="hover:underline">
          Logout
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
