import FacilityDetails from "@/components/sections/FacilityDetails"

const FacilitiesDetailsPage = async ({ params }) => {
    const { id } = await params
    const res = await fetch(`http://localhost:5000/allFacilities/${id}`)
    const facility = await res.json()

    return (
        <div>
            <FacilityDetails facility={facility} />
        </div>
    )
}

export default FacilitiesDetailsPage