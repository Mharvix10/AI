import {useState, useEffect} from 'react'
import Logo from '../assets/unilagLogo.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function LoginPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email:'',
        password: '',
    })

    const {email, password} = form

    const onChange=(e)=>{
        e.preventDefault()
        setForm((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const login=async()=>{
        try {
            if(!email || !password){
                window.alert('Please fill all the required field')
            }
            const response = await axios.post('https://ai-v91l.onrender.com/login', form)
            if(response.data.token){
                localStorage.setItem('email', response.data.email)
                navigate('/homepage')
            }
        } catch (error) {
            
        }
    }
  return (
    <div className='page'>
        <header>
            <img className='logo' src={Logo} alt="" />
        </header>
        <div className="container mt-1">
            <input name='email' value={email} onChange={onChange} className='smallInput' type="text" placeholder='Enter your email' />
            <input name='password' value={password} onChange={onChange} className='smallInput' type="text" placeholder='Enter your password' />
            <button onClick={login} className='center'>Login</button>
            <p className='link textCenter' onClick={()=>{navigate('/register')}}>Create an account</p>
        </div>
    </div>
  )
}

export default LoginPage