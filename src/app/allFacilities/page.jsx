"use client"

import FacilityCard from '@/components/common/FacilityCard'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const SPORT_TYPES = [
  "Football",
  "Cricket",
  "Basketball",
  "Badminton",
  "Tennis",
  "Swimming",
]

const AllFacilities = () => {
  const [facilities, setFacilities] = useState([])
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sport, setSport] = useState('')

  const fetchFacilities = (searchVal, sportVal) => {
    const params = new URLSearchParams()
    if (searchVal) params.set('search', searchVal)
    if (sportVal && sportVal !== 'all') params.set('sport', sportVal)

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allFacilities?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFacilities(data)
      })
      .catch(err => console.error('Fetch error:', err))
  }

  // initial load + sport filter change
  useEffect(() => {
    fetchFacilities(searchQuery, sport)
  }, [sport, searchQuery])

  const handleSearch = () => {
    setSearchQuery(search)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <section className='mt-20 wrapper'>
      <h1 className='text-center mt-5 text-4xl font-semibold italic'>
        Here is our <span className='text-green-500'>top class</span> facilities
      </h1>

      <div className='flex flex-col sm:flex-row gap-4 mt-8 px-4 max-w-2xl mx-auto'>
        <Input
          placeholder='Search by facility name...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className='flex-1'
        />
        <Button onClick={handleSearch}>Search</Button>

        <Select value={sport} onValueChange={setSport}>
          <SelectTrigger className='w-full sm:w-48'>
            <SelectValue placeholder='Filter by sport' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Sports</SelectItem>
            {SPORT_TYPES.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center items-center gap-5 wrapper'>
        {facilities.length > 0
          ? facilities.map(facility => <FacilityCard facility={facility} key={facility._id} />)
          : <p className='col-span-3 text-center text-gray-500'>No facilities found.</p>
        }
      </div>
    </section>
  )
}

export default AllFacilities