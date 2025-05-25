import { IoAddSharp } from "react-icons/io5";

export default async function Home() {
  return (
    <div className='w-full'>
      <h1 className="text-center text-blue-500 font-bold mb-1">Chủ đề của tôi</h1>
      <p className="text-center text-black font-semibold mb-8">Bạn có thể tạo các chủ đề từ vựng một cách đơn giản chỉ bằng vài cú click chuột.</p>
      <div className="!w-[200px] h-[200px] bg-blue-200 rounded-lg shadow-md flex items-center justify-center hover:cursor-pointer hover:shadow-lg hover:shadow-blue-200">
        <IoAddSharp className="w-10 h-10"/>
      </div>
    </div>
  )
}
