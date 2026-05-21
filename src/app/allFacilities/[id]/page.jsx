import FacilityDetails from "@/components/sections/FacilityDetails"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const FacilitiesDetailsPage = async ({ params }) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allFacilities/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
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