'use client'
import React, { useDebugValue } from 'react'
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
const router = useRouter()

  const inputClass =
    "bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 " +
    "placeholder:text-gray-400 dark:placeholder:text-gray-500 " +
    "border border-gray-300 dark:border-zinc-700 " +
    "focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400";

    const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Convert FormData to plain object
 const userData = Object.fromEntries(formData.entries());
 console.log(userData)

 const { data, error } = await authClient.signIn.email({
    email:userData.email, // required
    password:userData.password, // required
   
});
if (data) {
    router.push('/')
    
}if (error) {
    console.log(error)
    
}
  };
  return (
    <div className='wrapper'>
        

<h2 className='mt-20
 py-4 text-center text-2xl font-semibold'>Login first to access all pages</h2>

         <Form className="flex w-96 flex-col gap-4 border p-8  mx-auto" onSubmit={onSubmit}>



      <TextField
        isRequired
        name="email"
        type="email"
        // validate={(value) => {
        //   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        //     return "Please enter a valid email address";
        //   }
        //   return null;
        // }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        // validate={(value) => {
        //   if (value.length < 8) {
        //     return "Password must be at least 8 characters";
        //   }
        //   if (!/[A-Z]/.test(value)) {
        //     return "Password must contain at least one uppercase letter";
        //   }
        //   if (!/[0-9]/.test(value)) {
        //     return "Password must contain at least one number";
        //   }
        //   return null;
        // }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description >Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Login
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
    </div>
  )
}

export default SignInPage