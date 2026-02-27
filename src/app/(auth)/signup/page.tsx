"use client";
import Navbar from "@/components/auth/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SignupProps = {
  email: string;
  password: string;
  confirmPassword?: string;
};

const Signup = () => {
  const formRef = React.useRef<HTMLFormElement | null>(null);

  function checkForm() {
    if (formRef.current) {
      formRef.current?.requestSubmit();
    }
  }
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupProps>();
  const onSubmit = (data: SignupProps) => {
    delete data.confirmPassword;
    console.log(data);
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
                  The make money app
                </motion.h1>
              </div>
            </motion.div>

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
                          Sign Up
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Create an account or log in to discover Purgions and
                        find ways to make money.
                      </p>
                    </motion.div>

                    <form
                      ref={formRef}
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-3"
                      action=""
                    >
                      <motion.div
                        className="space-y-2"
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

                      <motion.div
                        className="space-y-2 flex gap-2.5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.6,
                          ease: "easeOut",
                        }}
                      >
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            className="border-border border"
                            {...register("password", {
                              required: true,
                              maxLength: 50,
                              minLength: 4,
                            })}
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
                        <div>
                          <Label htmlFor="confirm-password">Confirm</Label>
                          <Input
                            {...register("confirmPassword", {
                              validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                            })}
                            id="confirm-password"
                            type="password"
                            className="border-border border"
                          />
                          {errors.confirmPassword?.type === "validate" && (
                            <span className="text-red-500 text-sm">
                              Passwords do not match
                            </span>
                          )}
                        </div>
                      </motion.div>
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
                      ></motion.div>

                      <Dialog>
                        <DialogTrigger>
                          <p
                            id="signup"
                            onClick={checkForm}
                            className="w-full bg-primary text-black py-1.5 rounded-sm"
                          >
                            Continue
                          </p>
                        </DialogTrigger>

                        {isValid && (
                          <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                              <DialogTitle>Select A Question</DialogTitle>
                              <DialogDescription>
                                Make a question to use it if you forget your
                                password.
                              </DialogDescription>
                            </DialogHeader>
                            <Label>Question</Label>
                            <Select>
                              <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Select a question" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Questions</SelectLabel>
                                  <SelectItem value="fruit">
                                    What is your favorite fruit?
                                  </SelectItem>
                                  <SelectItem value="color">
                                    What is your favorite color?
                                  </SelectItem>
                                  <SelectItem value="pet">
                                    What is your favorite pet?
                                  </SelectItem>
                                  <SelectItem value="city">
                                    In Which city you were born?
                                  </SelectItem>
                                  <SelectItem value="movie">
                                    What is your oldest cousin name?
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <Label htmlFor="answer">Answer</Label>
                            <Input id="answer" name="answer" defaultValue="" />
                            <DialogFooter>
                              <Button form="signup" type="submit">
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>
                    </form>

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
                      <Link href="/signin">
                        <Button
                          variant="secondary"
                          className="bg-primary-foreground text-primary hover:bg-primary-foreground/95 w-full shadow-[0_4px_16px_var(--border)] duration-300 dark:shadow-[0_4px_14px_var(--muted-foreground)]"
                        >
                          <span className="ml-2">
                            Already have an account? Sign in
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

function Message() {
  alert("Signup successful!");
  return (
    <div>
      <p>Signup successful!</p>
    </div>
  );
}
export default Signup;
