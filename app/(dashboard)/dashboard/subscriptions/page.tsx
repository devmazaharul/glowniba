import { getSubscribers } from '@/action/subscribe';
import { subscriptionInfo } from '@/types';

const Page = async () => {
  const data = await getSubscribers();
  const items: subscriptionInfo[] =
    'data' in data ? (data.data as subscriptionInfo[]) : [];

  return (
    <div className="overflow-x-auto  overflow-y-auto max-h-[500px]">
      <table className="min-w-full border border-gray-400">
        <thead className="bg-gray-800 text-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-500">No</th>
            <th className="px-4 py-2 border border-gray-500">ID</th>
            <th className="px-4 py-2 border border-gray-500">Email</th>
            <th className="px-4 py-2 border border-gray-500">Date</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.reverse().map((item: subscriptionInfo, i: number) => (
              <tr key={item._id} className="text-center">
                <td className="px-4 py-2 border  border-gray-100 text-gray-700">
                  {i + 1}
                </td>
                <td className="px-4 py-2 border  border-gray-100 text-gray-700">
                  #{item._id.toString().slice(0, 6)}
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
                  -{' '}
                  {new Date(item.createdAt).toLocaleTimeString('en-us', {
                    timeStyle: 'short',
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
