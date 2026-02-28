"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Router from "next/router";
import React from "react";

const page = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    try {
      const response = await axios.post("/api/auth/reset-password", {
        password,
        email: localStorage.getItem("resetEmail"),
      });
      if (response.data.success) {
        Router.push("/signin");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

        <div>
            <Label htmlFor="password" className="text-sm font-medium mb-2">
          Enter new password
        </Label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="New Password"
        />
        </div>

        <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium mb-2">
          Confirm new password
        </Label>
        <Input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          id="confirmPassword"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          placeholder="Confirm Password"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Reset Password
        </Button>
      </Card>
    </div>
  );
};

export default page;

    