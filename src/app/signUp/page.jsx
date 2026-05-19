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
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter()
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries());

    console.log(userData)
    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      image: userData.imageURL,
      password: userData.password,
    });

    if (error) {
      console.log(error);
      toast.error('Registration is failed.')
      return
    }

    toast.success("Register successful");
    router.push('/signIn')



  };
  return (
    <div className="wrapper py-20">
      <Form
        className="flex w-96 flex-col gap-4 border p-8 border-gray-600 rounded-lg mx-auto my-10 "
        onSubmit={onSubmit}
      >
        <TextField isRequired name="name" type="text">
          <Label>Name</Label>
          <Input placeholder="Enter you name" />
          <FieldError />
        </TextField>
        <TextField isRequired name="email" type="email">
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>
        <TextField isRequired name="imageURL" type="url">
          <Label>Image Url : </Label>
          <Input placeholder="Enter your image url" />
          <FieldError />
        </TextField>

        <TextField isRequired minLength={8} name="password" type="password">
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
            Sign Up
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
