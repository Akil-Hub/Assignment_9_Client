
import FacilityCard from '@/components/common/FacilityCard'

const allFacilities = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allFacilities`)
  const facilities = await res.json()
  console.log(facilities)


  return (
    <section className='mt-20 wrapper'>
      <h1 className='text-center mt-5 text-4xl font-semibold italic'>Here is our <span className='text-green-500'>top class</span> facilities</h1>
      <div className='py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center items-center gap-5 wrapper'>

        {
          facilities.map(facility => <FacilityCard facility={facility} key={facility._id} />)
        }


      </div>
    </section>
  )
}

export default allFacilities