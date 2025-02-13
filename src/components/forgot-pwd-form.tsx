"use client"
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
import { useState } from "react";

export function ForgotPwdForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (email.includes("@")) {
      setIsOtpSent(true);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleValidateOtp = () => {
    if (otp.length === 6) {
      alert("OTP validated successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password ?</CardTitle>
        <CardDescription>Enter your email below to receive an OTP</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="button" onClick={handleSendOtp} className="w-full">
              {isOtpSent ? "Resend OTP" : "Send OTP"}
            </Button>
            {isOtpSent && (
              <div className="grid gap-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <Button type="button" onClick={handleValidateOtp} className="w-full">
                  Validate
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
  )
}
