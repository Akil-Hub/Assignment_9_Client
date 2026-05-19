"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default DeleteBookingBtn;

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
import { authClient } from "@/lib/auth-client";

export function DeleteBookingBtn({ id, facilityName }) {


  const router = useRouter();

  const handleDelete = async () => {
    // getting the token
    const { data: tokenData, error } = await authClient.token()
    if (error) {
      console.log(error)
    }
    const token = tokenData.token
    const res = await fetch(`http://localhost:5000/myBookings/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`

      }
    });
    const data = await res.json();
    if (data) {
      router.refresh();
      toast.success("Booked facility is canceled.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Cancel</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {facilityName}
            your facility from booking list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white">
            Confirm Cancellation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
