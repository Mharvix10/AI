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
            }
            const response = await axios.post('http://localhost:7000/signup', form)
            if(response.data.message ==='found'){
                window.alert('This email is already in use by another user')
            }
            else if(response.data.message==='successful'){
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