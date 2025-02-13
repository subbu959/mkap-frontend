"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
export function AdminSignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [formData, setFormData] = useState({
      fname: "",
      lname: "",
      uname: "",
      email: "",
      phno: "",
      address: "",
      city: "",
      state: "",
      password: "",
      cpassword:"",
    });
  
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const validateForm = () => {
      let newErrors: Record<string, string> = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;
  
      if (!formData.fname || formData.fname.length < 2) newErrors.fname = "First Name must be at least 2 characters.";
      if (!formData.lname || formData.lname.length < 2) newErrors.lname = "Last Name must be at least 2 characters.";
      if (!formData.uname || formData.uname.length < 4) newErrors.uname = "Username must be at least 4 characters.";
      if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address.";
      if (!formData.phno || !phoneRegex.test(formData.phno)) newErrors.phno = "Phone Number must be 10 digits.";
      if (!formData.address || formData.address.length < 3) newErrors.address = "Address must be at least 3 characters.";
      if (!formData.city || formData.city.length < 3) newErrors.city = "City must be at least 3 characters.";
      if (!formData.state || formData.state.length < 2) newErrors.state = "State must be at least 2 characters.";
      if (!formData.password || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
      if (!formData.cpassword || formData.cpassword.length < 6) newErrors.cpassword = "Confirm Password must be at least 6 characters.";
      if (formData.password !== formData.cpassword) newErrors.cpassword = "Passwords do not match.";

  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {

        const formattedPayload = {
          firstName: formData.fname,
          lastName: formData.lname,
          email: formData.email,
          username: formData.uname,
          phone: formData.phno,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          password: formData.password,
          confirmPassword: formData.cpassword,
        }


      e.preventDefault();
      if (validateForm()) {
        console.log("User Data:", formattedPayload);
        dispatch(signUp({ formData:formattedPayload, router }));
      }
    };
    return (
      <div className={cn("flex flex-col space-y-2 p-3 bg-gray-100 rounded-lg", className)} {...props}>
        <Card className="shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="text-3xl">Admin Sign Up</CardTitle>
            <CardDescription>Fill out the form to create a new admin account.</CardDescription>  
          </CardHeader> 
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "First Name", id: "fname", placeholder: "John" },
                  { label: "Last Name", id: "lname", placeholder: "Doe" },
                  { label: "Username", id: "uname", placeholder: "johndoe" },
                  { label: "Email", id: "email", placeholder: "m@example.com", type: "email" },
                ].map(({ label, id, placeholder, type = "text" }) => (
                  <div key={id} className="flex flex-col space-y-2">
                    <Label htmlFor={id} className="text-gray-700 font-medium">{label}</Label>
                    <Input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={formData[id as keyof typeof formData]}
                      onChange={handleChange}
                      className={`rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 ${errors[id] ? "border-red-500" : ""}`}
                      required
                    />
                    {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Phone Number", id: "phno", placeholder: "1234567890", type: "tel" },
                  { label: "Address", id: "address", placeholder: "123 Main St" },
                  { label: "City", id: "city", placeholder: "New York" },
                  { label: "State", id: "state", placeholder: "NY" },
                ].map(({ label, id, placeholder, type = "text" }) => (
                  <div key={id} className="flex flex-col space-y-2">
                    <Label htmlFor={id} className="text-gray-700 font-medium">{label}</Label>
                    <Input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={formData[id as keyof typeof formData]}
                      onChange={handleChange}
                      className={`rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 ${errors[id] ? "border-red-500" : ""}`}
                      required
                    />
                    {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
                  </div>
                ))}
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : ""}`}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="cpassword" className="text-gray-700 font-medium">Confirm Password</Label>
                <Input
                  id="cpassword"
                  type="password"
                  value={formData.cpassword}
                  onChange={handleChange}
                  className={`rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 ${errors.cpassword ? "border-red-500" : ""}`}
                  required
                />
                {errors.cpassword && <p className="text-red-500 text-sm">{errors.cpassword}</p>}
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
    
}