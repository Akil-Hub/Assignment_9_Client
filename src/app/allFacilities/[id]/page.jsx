import FacilityDetails from "@/components/sections/FacilityDetails"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const FacilitiesDetailsPage = async ({ params }) => {
    const {token} = await auth.api.getToken({
      headers: await headers()
    })

    const { id } = await params
    const res = await fetch(`http://localhost:5000/allFacilities/${id}`,{
        headers:{
            authorizationi:`Bearer ${token}`
        }
    })
    const facility = await res.json()

    return (
        <div>
            <FacilityDetails facility={facility} />
        </div>
    )
}

export default FacilitiesDetailsPage