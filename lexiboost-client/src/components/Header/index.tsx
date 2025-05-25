export default function Header() {
  return (
    <header className="bg-white text-black p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">LexiBoost</h1>
      <nav className="mt-2">
        <ul className="flex space-x-4">
          <li className="hover:cursor-pointer hover:text-blue-500">Trang chủ</li>
          <li className="hover:cursor-pointer hover:text-blue-500">Thẻ của tôi</li>
          <li className="hover:cursor-pointer hover:text-blue-500">Kiểm tra</li>
          <li className="hover:cursor-pointer hover:text-blue-500">Đăng nhập</li>
        </ul>
      </nav>
    </header>
  );
}
