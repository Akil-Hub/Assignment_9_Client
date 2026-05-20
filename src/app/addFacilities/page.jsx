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
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import MainForm from "@/components/common/MainForm";

export function AddFacilityPage() {
    const { data: session  } = authClient.useSession();
  
  const router = useRouter()
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);


    const facilityData = Object.fromEntries(formData.entries())
    const facilityDataWithOwner = {
      ...facilityData,
      ownerId:session?.user?.id
    }


    // send the post req to the api for saving the faciliteis

    const res = await fetch('http://localhost:5000/allFacilities',
      {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(facilityDataWithOwner)
      }
    )
    const data = await res.json()
    console.log(data)

    router.push('/allFacilities')
    toast.success("Facility added successfully.")

  };

  const inputClass =
    "bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 " +
    "placeholder:text-gray-400 dark:placeholder:text-gray-500 " +
    "border border-gray-300 dark:border-zinc-700 " +
    "focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400";

  return (
    <section className="mt-20 wrapper px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">
          Add New Facility
        </h1>

        <p className="text-center mb-8 text-gray-600 dark:text-gray-400">
          Create and publish a new sports facility
        </p>

        <MainForm onSubmit={onSubmit} inputClass={inputClass}/>
      </div>
    </section>
  );
}

export default AddFacilityPage;