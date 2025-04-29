import { getUsers } from '@/action/user';
import { userIfo } from '@/types/user';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import PaginationUI from '../components/Paigination';
type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const Page = async ({ searchParams }: Props) => {
  const currentPage = parseInt(
    typeof searchParams?.page === 'string' ? searchParams.page : '1',
    10
  );
  
  const limit = 10;

  const users = await getUsers(limit, currentPage);
  const items = 'items' in users ? users.items : [];
  const totalPage = 'totalpage' in users ? users.totalpage : 0;

  return (
    <div className="overflow-x-auto  overflow-y-auto max-h-[500px] max-w-[100%]">
      <table className="border border-gray-400">
        <thead className="bg-gray-800 text-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-500">ID</th>
            <th className="px-2 py-2 border border-gray-500">Orders</th>
            <th className="px-2 py-2 border border-gray-500">Name</th>
            <th className="px-2 py-2 border border-gray-500">Number</th>
            <th className="px-2 py-2 border border-gray-500">Email</th>
            <th className="px-2 py-2 border border-gray-500">Date</th>
            <th className="px-2 py-2 border border-gray-500">Address</th>
            <th className="px-2 py-2 border border-gray-500">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {items &&
            items.map((item: userIfo) => (
              <tr key={item._id} className="text-center">
                <td className="px-4 py-2 border font-medium  border-gray-100 text-gray-600">
                  <p className="bg-yellow-100 px-2  rounded-md">
                    #{item._id.toString().slice(0, 5)}
                  </p>
                </td>
                <td className="px-2 py-2 border border-gray-100 text-emerald-800 w-8 h-6 rounded-md text-center">
                  {Math.floor(Math.random() * 10)}
                </td>
                <td className="px-2 py-2 border border-gray-100">{item.name}</td>
                <td className="px-2 py-2 border border-gray-100">{item.number}</td>
                <td className="px-2 py-2 border border-gray-100">{item.email}</td>
                <td className="px-2 py-2 border border-gray-100">
                  {new Date(item.createdAt).toLocaleDateString('en-us', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-2 py-2 border border-gray-100">
                  {item.address?.slice(0, 20)}
                </td>
                <td className="px-4 py-2 border text-center border-gray-100">
                  <BsBookmarkCheckFill className="mx-auto text-green-500" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* pagination section */}
      <div className="my-3">
        <PaginationUI currentPage={currentPage} totalPage={totalPage} />
      </div>
    </div>
  );
};

export default Page;
