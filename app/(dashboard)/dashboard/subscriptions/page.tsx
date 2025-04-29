import { getSubscribers } from '@/action/subscribe';
import { subscriptionInfo } from '@/types';
import PaginationUI from '../components/Paigination';
import { RiShieldUserLine, RiUserHeartLine } from "react-icons/ri";

const Page = async () => {
  const data = await getSubscribers();
  const items: subscriptionInfo[] =
    'data' in data ? (data.data as subscriptionInfo[]) : [];


  return (
    <div className="overflow-x-auto  overflow-y-auto max-h-[500px]">
      <table className="min-w-full border border-gray-400">
        <thead className="bg-gray-700 text-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-600">No</th>

            <th className="px-4 py-2 border border-gray-600">ID</th>
            <th className="px-4 py-2 border border-gray-600">Status</th>
            <th className="px-4 py-2 border border-gray-600">Email</th>
            <th className="px-4 py-2 border border-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.reverse().map((item: subscriptionInfo, i: number) => (
              <tr key={item.subacriberId || 0} className="text-center">
                <td className="px-4 py-2 border  border-gray-100 text-gray-700">
                  {i + 1}
                </td>
                <td className="px-4 py-2 border  border-gray-100 text-gray-700">
                  #{item.subacriberId && item.subacriberId.toString().slice(0, 6) || 55}
                </td>
                <td className="px-4 py-2 border border-gray-100 text-center">
                  <p className='w-fit mx-auto'>{Math.floor(Math.random()*10)%2==0?<RiShieldUserLine className='text-xl fill-pink-500'/>:<RiUserHeartLine className='text-xl fill-amber-500' />}</p>
                </td>
                <td className="px-4 py-2 border border-gray-100">
                  {item.email}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(item.createdAt).toLocaleDateString('en-us', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                
                
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className='my-3'>
        <PaginationUI totalPage={10} currentPage={3}/>
      </div>
    </div>
  );
};

export default Page;
