
import { getSessionCookie } from 'better-auth/cookies'
import { NextResponse } from 'next/server'
 




export async function proxy(request) {

  const sessionCookie = getSessionCookie(request) 

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/signIn', request.url))
  }

  return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ['/myBookings','/addFacilities','/manageFacilities'],
}