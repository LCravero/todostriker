/* eslint-disable no-unused-vars */
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware (req) {
  const res = NextResponse.next()

  const supabase = createMiddlewareSupabaseClient({ req, res })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  return res
}

export const config = {
  // TODO: Check later if 'lists/(.*) would be one of these routes matcher
  matcher: ['/lists']
}
