import {useState, useEffect} from 'react'
import Logo from '../assets/unilagLogo.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Spinner from '../assets/spinner.gif'

function SignupPage() {
    const [loading, setLoading] = useState(false)
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
            setLoading(true)
            if(!username || !email || !password){
                setLoading(false)
                window.alert('Please fill all the required field')
                return
            }
            const response = await axios.post('https://ai-v91l.onrender.com/signup', form)

            if(response.status===201){
                setLoading(false)
                window.alert('User registered successfully')
                navigate('/login')
            }
        } catch (error) {
            if(error.response.status===401){
                setLoading(false)
                window.alert('This email is already registered by a user')
            }
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
            <input name='password' value={password} onChange={onChange} className='smallInput' type="password" placeholder='Enter your password' />
            <button onClick={signUp} className='center mb-1'>Signup</button>

            <p className='textCenter'>Do you have an account already? <span className='link' onClick={()=>{navigate('/login')}}>Login</span></p>
        </div>



        {
            loading && (
                <div className='centeredSpinner'>
                    <img src={Spinner} width='50px' alt="" />
                </div>
            )
        }
    </div>
  )
}

export default SignupPage