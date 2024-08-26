import React from 'react'

export function LoadingScreen() {
  return <> 
  <div className='flex items-center justify-center min-h-screen'>
    <button className='bg-purple-400 rounded-lg text-white font-bold hover:bg-purple-300 hover:cursor-not-allowed disabled'>

        <div className="flex items-center justify-center mx-4 my-2" >
            <div><i className='fas fa-spinner fa-spin me-2'></i></div>
            <div> Loading </div>
        </div>

    </button>

  </div>
  
  </>
    
}
