import FacilityDetails from "@/components/sections/FacilityDetails"


const MyFacilityDetailsPage = async ({ params }) => {
    const { id } = await params


    const res = await fetch(`http://localhost:5000/manageFacilities/${id}`)
    const facility = await res.json()
    console.log(facility)
    return (
        <div className="mt-20">

                        <FacilityDetails facility={facility} />
            
            
        </div>
    )
}

export default MyFacilityDetailsPage