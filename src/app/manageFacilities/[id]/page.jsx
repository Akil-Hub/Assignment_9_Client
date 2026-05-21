import FacilityDetails from "@/components/sections/FacilityDetails"


const MyFacilityDetailsPage = async ({ params }) => {
    const { id } = await params


    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/manageFacilities/${id}`)
    const facility = await res.json()
    console.log(facility)
    return (
        <div className="mt-20">

                        <FacilityDetails facility={facility} />
            
            
        </div>
    )
}

export default MyFacilityDetailsPage