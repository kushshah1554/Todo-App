import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Input from "./Input";
import { validate } from "./validate";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const SignupForm = () => {
const navigate=useNavigate();

  const [formData, setFormData] = useState({
    username : "",
    email : "",
    password : "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit,setIsSubmit]=useState(false);
  const [error,setError]=useState({});

  const handleChange = (e) => {
    setFormData((c) => ({ ...c, [e.target.name]: e.target.value }));
    setError({});
  };
  // console.log(formData);

  const signofResponce=async ()=>{

   return await axios.post("/api/user/signup",formData)
  }
  

  const handleSubmit=async ()=>{
    if(!validate(formData,setError))
    {
      return;
    }
   try {
     const {data} = await signofResponce()
    // console.log(data);
    
    if(!data.success)
    {
      return ;
    }
    

    setIsSubmit(true);
    
   } catch (error) {
    console.log(error)
    
   }
  // console.log(formData);
  }

    const completeSignup=()=>{
setIsSubmit(false);
navigate("/login",{replace:true});
    }


  if(isSubmit){
    return (<div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-6">Welcome, {formData.username}!</p>
          <button
            onClick={completeSignup }
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
          >
           Login to start
          </button>
        </div>
      </div>);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className=" bg-white rounded-2xl shadow-2xl  max-w-md flex-1 p-4 space-y-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Create Account
          </h1>
          <p className="text-gray-600 text-center">Sign up to get started</p>
        </div>

        <div className="space-y-4">
          <Input
            Icon={User}
            placeholder="Enter your username"
            label="Username"
            type="text"
            name="username"
            handleChange={handleChange}
            formData={formData}
            error={error}
          />
          <Input
            Icon={Mail}
            placeholder="Enter your email"
            label="Email"
            type="email"
            name="email"
            handleChange={handleChange}
            formData={formData}
            error={error}
          />
          <Input
            Icon={Lock}
            placeholder="Enter your password"
            label="Password"
            type="password"
            Eye={Eye}
            EyeOff={EyeOff}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            name="password"
            handleChange={handleChange}
            formData={formData}
            error={error}
          />
        </div>

        <div>
          <button onClick={handleSubmit} className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg w-full py-3 font-semibold transition-colors shadow-lg hover:shadow-xl cursor-pointer">
            Sing up
          </button>
        </div>

        <div>
          <p className="text-center">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-purple-500 hover:text-purple-600 font-semibold cursor-pointer"
            >
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
