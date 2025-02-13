"use client";
import { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UserProfile({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [userData, setUserData] = useState({
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      phone: "1234567890",
      address: "123 Main St",
      city: "New York",
      state: "NY",
    });
  
    const [passwordData, setPasswordData] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };
  
    const handleSave = () => {
      if (!userData.email.includes("@")) {
        alert("Please enter a valid email.");
        return;
      }
      if (userData.phone.length !== 10 || isNaN(Number(userData.phone))) {
        alert("Phone number must be 10 digits.");
        return;
      }
      setIsEditing(false);
      console.log("Updated User Data:", userData);
    };
  
    const handlePasswordSubmit = () => {
      if (passwordData.newPassword.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
      }
      console.log("Password updated:", passwordData);
      setIsPasswordModalOpen(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-100 p-6", className)} {...props}>
  <h1 className="text-4xl font-extrabold text-gray-900">Welcome, {userData.firstName}!</h1>

  <Card className="w-[500px] bg-white shadow-lg rounded-xl border border-gray-200 transition-all hover:shadow-xl">
    <CardHeader className="bg-gray-50 rounded-t-xl py-4">
      <CardTitle className="text-2xl text-center font-semibold text-gray-800">User Profile</CardTitle>
    </CardHeader>

    <CardContent className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <Label className="text-gray-700 font-medium">First Name</Label>
          <Input name="firstName" value={userData.firstName} disabled={!isEditing} onChange={handleChange} className="transition-all focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid gap-1.5">
          <Label className="text-gray-700 font-medium">Last Name</Label>
          <Input name="lastName" value={userData.lastName} disabled={!isEditing} onChange={handleChange} className="transition-all focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label className="text-gray-700 font-medium">Username</Label>
        <Input name="username" value={userData.username} disabled={!isEditing} onChange={handleChange} className="transition-all focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="grid gap-1.5">
        <Label className="text-gray-700 font-medium">Email</Label>
        <Input name="email" type="email" value={userData.email} disabled={!isEditing} onChange={handleChange} className="transition-all focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="grid gap-1.5">
        <Label className="text-gray-700 font-medium">Phone</Label>
        <Input name="phone" type="tel" value={userData.phone} disabled={!isEditing} onChange={handleChange} className="transition-all focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="grid gap-1.5">
        <Label className="text-gray-700 font-medium">Address</Label>
        <Input name="address" value={userData.address} disabled={!isEditing} onChange={handleChange} className="transition-all focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <Label className="text-gray-700 font-medium">City</Label>
          <Input name="city" value={userData.city} disabled={!isEditing} onChange={handleChange} className="transition-all focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid gap-1.5">
          <Label className="text-gray-700 font-medium">State</Label>
          <Input name="state" value={userData.state} disabled={!isEditing} onChange={handleChange} className="transition-all focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <Button
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
      >
        {isEditing ? "Save Changes" : "Edit Profile"}
      </Button>

      <Button
        variant="outline"
        onClick={() => setIsPasswordModalOpen(true)}
        className="w-full border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg transition-all hover:bg-gray-100"
      >
        Change Password
      </Button>
    </CardContent>
  </Card>

  {/* Password Change Modal */}
  <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
    <DialogContent className="bg-white shadow-lg rounded-lg p-6 transition-all">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-gray-900">Change Password</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-4">
        <div className="grid gap-1.5">
          <Label className="text-gray-700 font-medium">Current Password</Label>
          <Input name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} className="transition-all focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="grid gap-1.5">
          <Label className="text-gray-700 font-medium">New Password</Label>
          <Input name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} className="transition-all focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="grid gap-1.5">
          <Label className="text-gray-700 font-medium">Confirm New Password</Label>
          <Input name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="transition-all focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <DialogFooter>
        <Button
          onClick={handlePasswordSubmit}
          className="bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Save Password
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>

  )
}
