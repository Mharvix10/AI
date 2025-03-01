import React from 'react'
import {useNavigate} from 'react-router-dom'
function WelcomePage() {
    const navigate = useNavigate()
  return (
    <div className='page'>
        <h2>Welcome to CSC-AI</h2>
        <p>
            This AI is a solution designed to help resolve any issues relating to the field of computer science. <br />
            Leveraging the power of Google Gemini Ai, this AI tool will help u provide solutions to difficult problems in the computer science field
        </p>
        <button onClick={()=>{navigate('/register')}} className='mt-1'>Get Started</button>
    </div>
  )
}

export default WelcomePage