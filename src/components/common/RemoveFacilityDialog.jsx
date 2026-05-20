"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

export function RemoveFacilityDialog({ id, facilityName }) {
  const router = useRouter();




  const handleRemoveFacility = async () => {
    const res = await fetch(`http://localhost:5000/allFacilities/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data) {
      router.push('/allFacilities');
      toast.success("Facility removed successfully.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full h-[60px] mt-5 bg-red-700 text-white font-bold text-lg flex items-center justify-center gap-2 rounded-md" ><FaTrash/> Remove Facility</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {facilityName}
            your facility from All Facility list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveFacility}
            className="bg-red-500 text-white">
            Confirm Cancellation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
