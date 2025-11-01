'use client';

import React from 'react'

const SubscriptionCancel = () => {
  return (
   <div className='flex min-h-screen items-center justify-center '>
      <div className='border shadow-lg max-w-lg mx-auto p-5 rounded-lg'>
          <h1 className='bg-red-100 py-5 px-7 mx-auto w-[max-content] rounded-md'>Error</h1>
          <p className='mt-4'>Some error occur while processing payment, pls try again</p>
    </div>
   </div>
  )
}

export default SubscriptionCancel