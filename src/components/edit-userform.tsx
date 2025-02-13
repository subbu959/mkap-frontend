"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EditUserForm({ user }: { user: any }) {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
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

    return (
        <Card className="max-w-lg bg-white shadow-md rounded-2xl border border-gray-300 transition-all hover:shadow-lg">
            <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label className="text-gray-800 font-medium">First Name</Label>
                        <Input name="firstName" value={userData.firstName} disabled={!isEditing} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-gray-800 font-medium">Last Name</Label>
                        <Input name="lastName" value={userData.lastName} disabled={!isEditing} onChange={handleChange} />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label className="text-gray-800 font-medium">Username</Label>
                    <Input name="username" value={userData.username} disabled={!isEditing} onChange={handleChange} />
                </div>

                <div className="grid gap-2">
                    <Label className="text-gray-800 font-medium">Email</Label>
                    <Input name="email" type="email" value={userData.email} disabled={!isEditing} onChange={handleChange} />
                </div>

                <div className="grid gap-2">
                    <Label className="text-gray-800 font-medium">Phone</Label>
                    <Input name="phone" type="tel" value={userData.phone} disabled={!isEditing} onChange={handleChange} />
                </div>

                <div className="grid gap-2">
                    <Label className="text-gray-800 font-medium">Address</Label>
                    <Input name="address" value={userData.address} disabled={!isEditing} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label className="text-gray-800 font-medium">City</Label>
                        <Input name="city" value={userData.city} disabled={!isEditing} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-gray-800 font-medium">State</Label>
                        <Input name="state" value={userData.state} disabled={!isEditing} onChange={handleChange} />
                    </div>
                </div>

                <Button
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
            </CardContent>
        </Card>

    );
}
