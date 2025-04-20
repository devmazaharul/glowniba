import { getUsers } from "@/action/user";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { userIfo } from "@/types/user";

export default async function Page() {
  const responce = await getUsers();
  const users = 'data' in responce ? (responce.data as { users: userIfo[] }) : { users: [] };

  // make sure users are plain objects
  const safeUsers = JSON.parse(JSON.stringify(users));

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="w-fit mx-auto py-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-700">Users</h1>
        <p className="text-gray-500 text-sm">Manage your users and their information.</p>
      </div>
      <Table className="shadow-2xl shadow-gray-100 border border-gray-200 rounded-lg">
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead className="text-right">Email</TableHead>
            <TableHead className="text-right">Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeUsers.users && safeUsers.users.reverse().map((user: userIfo) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.number}</TableCell>
              <TableCell className="text-right">{user.email}</TableCell>
              <TableCell className="text-right">{user.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Users</TableCell>
            <TableCell className="text-right">{safeUsers.users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
