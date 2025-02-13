"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { User, columns } from "@/app/user-table/columns";
import { DataTable } from "@/app/user-table/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { AddUserForm } from "./adduser-form";
import { useDispatch } from "react-redux";
import { getUsers } from "@/redux/features/usersSlice";
import { AppDispatch } from "@/redux/store";


export function AdminHome({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [data, setData] = useState<User[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  async function getData(): Promise<User[]> {
    try {
      const response = await dispatch(getUsers()).unwrap(); // Dispatch and unwrap the result
      return response; // Return the fetched users
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return []; // Return empty array in case of error
    }
  }
  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  // Handle user edit
  const handleEdit = (user: User) => {
    console.log("Editing user:", user);
  };

  // Handle user delete
  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((user) => user.id !== id));
  };

  const userColumns = columns(handleEdit); // Call the function

  return (
    <div className={`flex flex-col min-h-screen ${className}`} {...props}>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-4 flex items-center justify-between z-50">
        <h2 className="text-xl font-bold text-gray-900">Welcome Admin</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="relative flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-400">
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add New User</DialogTitle>
            <AddUserForm />
          </DialogContent>
        </Dialog>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-[80px] px-4 md:px-6">
        <div className="max-w-6xl mx-auto py-6">
          <DataTable columns={userColumns} data={data} />
        </div>
      </main>
    </div>

  );
}