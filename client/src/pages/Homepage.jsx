import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Spinner from '../assets/spinner.gif'
import { AiFillAudio } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'
import { FaArrowDown } from "react-icons/fa";
import { MdDehaze } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5"; 
import Logo from '../assets/unilagLogo.png'


function Homepage() {
    const [file, setFile] = useState(null)
    const token = sessionStorage.getItem('token')
    const email = sessionStorage.getItem('email')
    const bottomRef = useRef(null)
    const navigate = useNavigate()
    const [profile, setProfile] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState('')
    const [prompt, setPrompt] = useState('')
    const [discussion, setDiscussion] = useState([])
    const onEdit=(e)=>{
    e.preventDefault()
    setPrompt(e.target.value)
    
  }


  const handleFile=async(e)=>{
    e.preventDefault()
    setFile(e.target.files[0])
    console.log('file:',file)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await axios.post('https://ai-v91l.onrender.com/upload', formData, {headers: {'Content-Type':'multipart/form-data'}})
      const message = response.data.message
      if(response.status===200){
          setLoading(false)
          setResponse(message)
          setDiscussion((prev) => {
              const updatedDiscussion = [...prev, { prompt: prompt, response: message }];
              sessionStorage.setItem('data', JSON.stringify(updatedDiscussion));
              return updatedDiscussion;
          });
          
      }
    } catch (error) {
      console.log(error)
      window.alert('Error while uploading file')
    }
  }

  const aiCall=async()=>{
    try {
        setLoading(true)
        const response = await axios.post('https://ai-v91l.onrender.com/',{prompt:prompt},{headers:{Authorization: token}})
        const message = response.data.message
        if(response.status===200){
            setLoading(false)
            setResponse(message)
            setDiscussion((prev) => {
                const updatedDiscussion = [...prev, { prompt: prompt, response: message }];
                sessionStorage.setItem('data', JSON.stringify(updatedDiscussion));
                return updatedDiscussion;
            });
            
        }

    } catch (error) {
        setLoading(false)
        console.log(error)
    }
  }


  const upload=()=>{
    aiCall()
    setPrompt('')
    
  }



  const chatBox = discussion.map((items)=>{ 
    return (
      <div className='mb-1'>
        <div className='promptField'>
          {items.prompt}
        </div>
        <div className='responseField'>
          {items.response}
        </div>
      </div>
    )
  })




  const scrollDown=()=>{
    if(bottomRef.current){
        bottomRef.current.scrollIntoView({behavior:'smooth'})
    }
  }




  useEffect(()=>{
    const storedData = JSON.parse(sessionStorage.getItem('data'))
    if (storedData) {
        setDiscussion(storedData);
    }
    
  },[])
  

  return (
    <>
    <div className='gridContainer'>
        {
            showNav && (
                <div className='mobileNav'>
                    <IoCloseSharp className='closeBtn' size={50} color='red' onClick={()=>{setShowNav((prev)=>!prev)}}/>
                    <h2 className='textCenter'>History</h2>
                    <ul>
                        {discussion.map((items, index)=>{
                            return(
                                <li key={index}>{items.prompt}</li>
                            )
                        })}
                    </ul>
            </div>
            )
        }


      <div className='navigation'>
        <h2 className='textCenter'>History</h2>
        <ul>
            {discussion.map((items, index)=>{
                return(
                    <li key={index}>{items.prompt}</li>
                )
            })}
        </ul>
      </div>
      



      <div className='mainPage'>
            <h1 className='textCenter'>Computer Science AI</h1>
            <header className='fixed'>
                <MdDehaze className='navigationBar' size={30} onClick={()=>{setShowNav((prev)=>!prev)}}/>
                <IoPersonCircleSharp onClick={()=>{setProfile((prev)=>!prev)}} className='profile' size={60}/>
            </header>
          


            <div className='container'>
              <p>
                This AI is designed to only provide solutions to problems relating to the field of Computer Science.
                This AI won't be able to provide the solution to problems outside this scope.
            </p>
              <h2 className='textCenter'>What can i help you with?</h2>
            </div>

            {chatBox}


            <div className="container wide">
              <textarea ref={bottomRef} className='textArea' type="text" placeholder='Ask anything' name='prompt' value={prompt} onChange={onEdit}  />
              <button onClick={upload} className='uploadButton'>Upload</button>
              <button className='audioButton' onClick={()=>{navigate('/audioPage')}}><AiFillAudio/></button>
            </div>


            <div className="container mt-0">
              <input type="file" name="file" id="file" onChange={handleFile} accept='.pdf .jpg .png .jpeg .heif .heic' />
            </div>
            






            {/* Fixed profile icon and scroll down button */}

            {
                loading && (
                    <div className='spinnerContainer'>
                        <img src={Spinner} width='50px' alt="" />
                    </div>
                )
            }




            <div>
                <FaArrowDown onClick={scrollDown} className='downBtn' size={45}/>
            </div>

            <div className='profileSection'>
                <p>{profile &&  (<span className='whiteBg'>{email}</span>)}</p>
            </div>

      </div>
    </div>
    </>


  )
}

export default Homepage
