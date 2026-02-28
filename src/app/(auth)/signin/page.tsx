"use client";
import Navbar from "@/components/auth/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

type SingInProps = {
  email: string;
  password: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInProps>();
  const onSubmit = async (data: SingInProps) => {
    try {
      const res = await axios.post("/api/auth/signin", data);

      if (res.data.success) {
        toast.success(res.data.message);
        window.location.href = "/dashboard";
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while signing in. Please try again.");
    }
  };

  return (
    <div className="h-screen relative">
      <Navbar />

      <div>
        <div className="rose-gradient bg-background relative min-h-screen overflow-hidden">
          <div className="from-background absolute -top-10 left-0 h-1/2 w-full rounded-b-full bg-linear-to-b to-transparent blur"></div>
          <div className="from-primary/80 absolute -top-64 left-0 h-1/2 w-full rounded-full bg-linear-to-b to-transparent blur-3xl"></div>
          <div className="relative z-10 grid min-h-screen grid-cols-1 md:grid-cols-2">
            <motion.div
              className="hidden flex-1 items-center justify-center space-y-8 p-8 text-center md:flex"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  <p
                    id="crop-guard"
                    className="mx-auto h-auto w-full md:w-90 text-5xl bg font-extrabold italic  bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
                  >
                    CROP Guard
                  </p>
                </motion.div>
                <motion.h1
                  className="text-2xl md:text-4xl font-bold leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                >
                  Protect Your Crops with AI
                </motion.h1>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              className="flex flex-1 items-center justify-center p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <Card className="border-border/70 bg-card/20 w-full max-w-md shadow-[0_10px_26px_#e0e0e0a1] backdrop-blur-lg dark:shadow-none">
                  <CardContent className="space-y-6 p-8">
                    {/* Logo and Header */}
                    <motion.div
                      className="space-y-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl font-bold tracking-tight md:text-4xl">
                          Log In
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Sign in to access AI-powered rice leaf disease
                        detection and protect your harvest.
                      </p>
                    </motion.div>

                    {/* Email Input */}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-4"
                      action=""
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5,
                          ease: "easeOut",
                        }}
                      >
                        <Label htmlFor="email">Email</Label>
                        <Input
                          {...register("email", {
                            required: true,
                            maxLength: 255,
                          })}
                          id="email"
                          type="email"
                        />
                        {errors.email && errors.email.type === "required" && (
                          <span className="text-red-500 text-sm">
                            This is required
                          </span>
                        )}
                        {errors.email && errors.email.type === "maxLength" && (
                          <span className="text-red-500 text-sm">
                            Max length exceeded
                          </span>
                        )}
                      </motion.div>

                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          {...register("password", {
                            required: true,
                            maxLength: 50,
                            minLength: 4,
                          })}
                          id="password"
                          type="password"
                          className="border-border border"
                        />
                        {errors.password &&
                          errors.password.type === "required" && (
                            <span className="text-red-500 text-sm">
                              This is required
                            </span>
                          )}
                        {errors.password &&
                          errors.password.type === "maxLength" && (
                            <span className="text-red-500 text-sm">
                              Max length exceeded
                            </span>
                          )}
                        {errors.password &&
                          errors.password.type === "minLength" && (
                            <span className="text-red-500 text-sm">
                              Min length is 4 characters
                            </span>
                          )}
                      </div>

                      <div className="flex items-center justify-end">
                        <Link href="/forgot-password" className="text-sm  text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.7,
                          ease: "easeOut",
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button type="submit" className="w-full">
                          Continue
                        </Button>
                      </motion.div>
                    </form>

                    {/* Divider */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.8,
                        ease: "easeOut",
                      }}
                    >
                      <div className="absolute inset-0 flex items-center">
                        <div className="border-border w-full border-t"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-card text-muted-foreground px-2">
                          OR
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.9,
                        ease: "easeOut",
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link href="/signup">
                        <Button
                          variant="secondary"
                          className="bg-primary-foreground text-primary hover:bg-primary-foreground/95 w-full shadow-[0_4px_16px_var(--border)] duration-300 dark:shadow-[0_4px_14px_var(--muted-foreground)]"
                        >
                          <span className="ml-2">
                            Don't have an account? Sign Up
                          </span>
                        </Button>
                      </Link>
                    </motion.div>

                    {/* Terms */}
                    <motion.p
                      className="text-muted-foreground mt-2 text-center text-xs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 1.0,
                        ease: "easeOut",
                      }}
                    >
                      By signing in you agree to our terms of service and{" "}
                      privacy policy .
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
