"use client";
import React from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      email:userData.email,
      password:userData.password,
    });

    if (error) {
      console.log(error);
    }
    if(data){
        redirect('/')
    }
  };
  return (
    <div className="max-w-330 mx-auto py-20">
      <Form
        className="flex w-96 flex-col gap-4 border p-8 border-gray-600 rounded-lg mx-auto py-10"
        onSubmit={onSubmit}
      >
      
        <TextField
          isRequired
          name="email"
          type="email"
        
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
          
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
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
  );
};

export default LoginPage;
