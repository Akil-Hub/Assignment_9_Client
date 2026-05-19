"use client";
import { Check } from "@gravity-ui/icons";

import {
 
  Description,
  FieldError,
  Form,
  TextArea,
} from "@heroui/react";
const SLOT_OPTIONS = [
  "8AM-10AM",
  "10AM-12PM",
  "2PM-4PM",
];
import MainForm from "@/components/common/MainForm";
import {Envelope} from "@gravity-ui/icons";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
  const inputClass =
    "bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 " +
    "placeholder:text-gray-400 dark:placeholder:text-gray-500 " +
    "border border-gray-300 dark:border-zinc-700 " +
    "focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400";

export function UpdateForm({facility}) {
    const {
    _id,
    id,
    facility_name,
    sports_type,
    name,
    facility_type,
    location,
    price_per_hour,
    capacity,
    available_slots,
    description,
    owner_email,
    booking_count,
    imageUrl,
  } = facility;
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
  
      const res = await fetch(`http://localhost:5000/manageFacilities/${_id}`,
        {
          method: "PATCH",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(facilityDataWithOwner)
        }
      )
      const data = await res.json()
      console.log(data)
  
      router.push('/manageFacilities')
      toast.success("Facility updated successfully.")
  
    };
  
  return (
    <Modal>
      <Button variant="secondary"  className={'w-full mt-4 h-16 text-2xl text-white bg-blue-600'}>Edit Facility</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-6xl w-full">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Contact Us</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below and we'll get back to you. The modal adapts automatically
                when the keyboard appears on mobile.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">


               
                       <Form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 p-8 border rounded-2xl shadow-sm bg-white dark:bg-zinc-950 dark:border-zinc-800">
              
                       
              
                        {/* Facility Name */}
                        <TextField required name="facility_name" defaultValue={facility_name}>
                          <Label className="text-gray-800 dark:text-gray-200">
                            Facility Name
                          </Label>
                          <Input className={inputClass} placeholder="Elite Football Arena" />
                          <FieldError />
                        </TextField>
              
               {/* Facility Image */}
                        <TextField required name="imageUrl"   defaultValue={imageUrl}>
                          <Label className="text-gray-800 dark:text-gray-200">
                            Facility Image URL
                          </Label>
                          <Input className={inputClass} placeholder="Enter facility  Image Url" />
                          <FieldError />
                        </TextField>
                        {/* Sports Type */}
                        <TextField required name="sports_type"  defaultValue={sports_type}>
                          <Label className="text-gray-800 dark:text-gray-200">
                            Sports Type
                          </Label>
                          <Input className={inputClass} placeholder="Football" />
                          <FieldError />
                        </TextField>
              
                        {/* Facility Type */}
                        <TextField required name="facility_type"  defaultValue={facility_type}>
                          <Label className="text-gray-800 dark:text-gray-200">
                            Facility Type
                          </Label>
                          <Input className={inputClass} placeholder="Football Turf" />
                          <FieldError />
                        </TextField>
              
                        {/* Turf Name */}
                        <TextField required name="name"   defaultValue={name}>
                          <Label className="text-gray-800 dark:text-gray-200">
                            Turf / Court Name
                          </Label>
                          <Input className={inputClass} placeholder="Elite Arena Turf 1" />
                          <FieldError />
                        </TextField>
              
                        {/* Location */}
                        <TextField required name="location"  defaultValue={location}>
                          <Label className="text-gray-800 dark:text-gray-200">
                            Location
                          </Label>
                          <Input className={inputClass} placeholder="Dhanmondi, Dhaka" />
                          <FieldError />
                        </TextField>
              
                        {/* Price */}
                        <TextField required name="price_per_hour" type="number"  defaultValue={price_per_hour}>
                          <Label className="text-gray-800 dark:text-gray-200">
                            Price Per Hour
                          </Label>
                          <Input className={inputClass} placeholder="120" />
                          <FieldError />
                        </TextField>
              
                        {/* Capacity */}
                        <TextField required name="capacity" type="number"  defaultValue={capacity}>
                          <Label className="text-gray-800 dark:text-gray-200">
                            Capacity
                          </Label>
                          <Input className={inputClass} placeholder="14 players" />
                          <FieldError />
                        </TextField>
              
                        {/* Booking Count */}
                        <TextField name="booking_count" type="number"   defaultValue={booking_count}>
                          <Label className="text-gray-800 dark:text-gray-200">
                            Booking Count
                          </Label>
                          <Input className={inputClass} placeholder="145" />
                          <FieldError />
                        </TextField>
              
                        {/* Owner Email */}
                        <TextField required name="owner_email" type="email"  defaultValue={owner_email}>
                          <Label className="text-gray-800 dark:text-gray-200">
                            Owner Email
                          </Label>
                          <Input className={inputClass} placeholder="elitearena@sportshub.com" />
                          <FieldError />
                        </TextField>
              
                        {/* Slots */}
                        <TextField required name="available_slots" className="md:col-span-2"  defaultValue={available_slots}>
                          <Label className="text-gray-800 dark:text-gray-200">
                            Available Slots
                          </Label>
              
                          <select
                            multiple
                            name="available_slots"
                            className="
                    w-full px-3 py-2 rounded-lg border
                    bg-white dark:bg-zinc-900
                    text-gray-900 dark:text-gray-100
                    border-gray-300 dark:border-zinc-700
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                  "
                          >
                            {SLOT_OPTIONS.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
              
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Hold Ctrl (Windows) or Cmd (Mac) to select multiple
                          </p>
              
                          <FieldError />
                        </TextField>
              
                        {/* Description */}
                        <div className="md:col-span-2 flex flex-col gap-2">
                          <Label className="text-gray-800 dark:text-gray-200">
                            Description
                          </Label>
              
                          <TextArea
                           defaultValue={description}
                            name="description"
                            required
                            className={
                              "min-h-32 px-4 py-3 rounded-xl " +
                              "bg-white dark:bg-zinc-900 " +
                              "text-gray-900 dark:text-gray-100 " +
                              "placeholder:text-gray-400 dark:placeholder:text-gray-500 " +
                              "border border-gray-300 dark:border-zinc-700 " +
                              "focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                            }
                            placeholder="Premium artificial grass football turf with floodlights and changing rooms..."
                          />
              
                          <Description className="text-gray-500 dark:text-gray-400">
                            Add facility details, features, and amenities
                          </Description>
                        </div>
              
                        {/* Buttons */}
                        <div className="flex gap-3 md:col-span-2 pt-4">
                          <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white">
                            <Check />
                            Update Facility
                          </Button>
              
                          <Button type="reset" variant="secondary">
                            Reset
                          </Button>
                        </div>
                      </Form>

               
              </Surface>
            </Modal.Body>
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}