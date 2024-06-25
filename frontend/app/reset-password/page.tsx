"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const recaptchaRef: any = useRef();

  const onChange = (value: any) => {
    setIsVerified(true);
  };

  const asyncScriptOnLoad = () => {};

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!isVerified) {
      setError("Please verify the ReCAPTCHA.");
      return;
    }
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      setStatus("Password has been reset successfully.");
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your email to reset the password for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleEmailChange}
                />
              </div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your new password"
                required
                onChange={handlePasswordChange}
              />
            </div>
            <div className="p-5">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeT_vgpAAAAAMPj94VrX5CQv84wNB8Rz1GxOngM"
                onChange={onChange}
                asyncScriptOnLoad={asyncScriptOnLoad}
              />
            </div>

            <Button type="submit" className="w-full">
              Next
            </Button>

            {status && <p>{status}</p>}
            {error && <p>{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
