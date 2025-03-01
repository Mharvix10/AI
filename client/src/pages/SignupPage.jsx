import {useState, useEffect} from 'react'
import Logo from '../assets/unilagLogo.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function SignupPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username:'',
        email:'',
        password: '',
    })

    const {username, email, password} = form

    const onChange=(e)=>{
        e.preventDefault()
        setForm((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const signUp=async()=>{
        try {
            if(!username || !email || !password){
                window.alert('Please fill all the required field')
                return
            }
            const response = await axios.post('https://ai-v91l.onrender.com/signup', form)
            if(response.status===401){
                window.alert('This email is already in use by another user')
            }
            else if(response.status===201){
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='page'>
        <header>
            <img className='logo' src={Logo} alt="" />
        </header>
        <div className="container mt-1">
            <input name='username' value={username} onChange={onChange} className='smallInput' type="text" placeholder='Enter your username' />
            <input name='email' value={email} onChange={onChange} className='smallInput' type="text" placeholder='Enter your email' />
            <input name='password' value={password} onChange={onChange} className='smallInput' type="text" placeholder='Enter your password' />
            <button onClick={signUp} className='center'>Signup</button>

            <p>Have an account? <span className='link' onClick={()=>{navigate('/login')}}>Login</span></p>
        </div>
    </div>
  )
}

export default SignupPage