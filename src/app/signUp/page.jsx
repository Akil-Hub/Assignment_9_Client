'use client'
import React, { useDebugValue } from 'react'
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { error } from 'better-auth/api';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {

    const router = useRouter()


  const inputClass =
    "bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 " +
    "placeholder:text-gray-400 dark:placeholder:text-gray-500 " +
    "border border-gray-300 dark:border-zinc-700 " +
    "focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400";

    const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Convert FormData to plain object
 const userData = Object.fromEntries(formData.entries());
 console.log(userData)

 const { data, error } = await authClient.signUp.email({
    name: userData.name,
    email: userData.email, 
    password:userData.password, 
    image:userData.imageUrl,
});
if (error) {
   console.log(error.message)

    
}
console.log(data)
router.push('/signIn')
  };
  return (
    <div className='wrapper'>
        



         <Form className="flex w-96 flex-col gap-4 border p-8 mt-20 mx-auto" onSubmit={onSubmit}>
{/* name */}
             <TextField
        isRequired
        name="name"
        type="text"
      
      >
        <Label>Name</Label>
        <Input placeholder="Enter your name" className={inputClass}/>
        <FieldError />
      </TextField>


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
        
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="imageUrl"
        type="text"
       
      >
        <Label>Image URL</Label>
        <Input placeholder="Enter you image url" className={inputClass} />
        <Description >Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Sign Up
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
    </div>
  )
}

export default SignUpPage