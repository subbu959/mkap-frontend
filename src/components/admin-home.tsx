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
async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
      city: "New York",
      state: "NY",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      username: "alicej",
      email: "alice.johnson@example.com",
      phone: "555-123-4567",
      address: "789 Oak St",
      city: "Chicago",
      state: "IL",
    },
    {
      id: 4,
      firstName: "Bob",
      lastName: "Brown",
      username: "bobbrown",
      email: "bob.brown@example.com",
      phone: "222-333-4444",
      address: "321 Pine St",
      city: "Houston",
      state: "TX",
    },
    {
      id: 5,
      firstName: "Emily",
      lastName: "Davis",
      username: "emilyd",
      email: "emily.davis@example.com",
      phone: "111-222-3333",
      address: "654 Maple St",
      city: "San Francisco",
      state: "CA",
    },
    {
      id: 6,
      firstName: "Michael",
      lastName: "Wilson",
      username: "michaelw",
      email: "michael.wilson@example.com",
      phone: "777-888-9999",
      address: "987 Birch St",
      city: "Seattle",
      state: "WA",
    },
    {
      id: 7,
      firstName: "Sophia",
      lastName: "Martinez",
      username: "sophiam",
      email: "sophia.martinez@example.com",
      phone: "333-444-5555",
      address: "123 Cedar St",
      city: "Miami",
      state: "FL",
    },
    {
      id: 8,
      firstName: "William",
      lastName: "Anderson",
      username: "williamand",
      email: "william.anderson@example.com",
      phone: "666-777-8888",
      address: "321 Walnut St",
      city: "Denver",
      state: "CO",
    },
    {
      id: 9,
      firstName: "Olivia",
      lastName: "Garcia",
      username: "oliviag",
      email: "olivia.garcia@example.com",
      phone: "999-000-1111",
      address: "654 Chestnut St",
      city: "Boston",
      state: "MA",
    },
    {
      id: 10,
      firstName: "James",
      lastName: "Harris",
      username: "jamesh",
      email: "james.harris@example.com",
      phone: "444-555-6666",
      address: "789 Spruce St",
      city: "Phoenix",
      state: "AZ",
    },
  ];
}

export function AdminHome({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [data, setData] = useState<User[]>([]);

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