import { useNavigate, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import Input from './../../UI/Input/Index';
import { Form, Formik } from 'formik';
import Submit from '../../UI/Button/Submit';
import * as Yup from 'yup'
import  Cookies  from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast';

let info = {
  password: "",confirmpassword:"",
}

export default function ChangePassword() {
  const { email } = useParams();
  const navigate = useNavigate();
    useEffect(() => {
let loginInfo =Cookies.get("step") ? JSON.parse(Cookies.get("step")) : null;
      if (loginInfo?.step===2) {
        navigate(`/forgot/otpPage/${email}`)
      }
      if (loginInfo?.step!==3) {
        navigate(`/forgot`)
      }
    }, [])
  
  const [data, setData] = useState(info);
  const { password,confirmpassword } = data;
  const handleInput = (e) => {
    let { name, value } = e.target;
    console.log(name,value);
    setData({ ...data, [name]: value });
  }
  const validation = Yup.object({
    password: Yup.string().required().min(6).max(12),
    confirmpassword:Yup.string().oneOf([Yup.ref("password")],"Must be match on password")
  })
  const submitForm =async () => {
    const res = await fetch(`/changePassword/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email,password })
    });
    const data =await res.json()
    if(res.status===200){
toast.success(data.message);
setTimeout(()=>{
  Cookies.remove('step');
  navigate("/login");
},1000)
    }else{
toast.error(data.message);
    }
  }
  return (
    <div className='bg-back-bg w-screen h-screen flex justify-center items-center for_otp_wrapper'>
      <div className="main_wrapper wrapper w-[400px] h-[350px] bg-main-bg rounded-xl p-4">
        <div className="header_text">
          <div className="mainTXt font-main font-semibold text-2xl">
            Change Your Password
          </div>
          <div className="sub_txt text-slate-400 font-secondary">
            Change your password very carefully and access your account
          </div>
        </div>
        <div className="form_box">
          <Formik
            enableReinitialize
            initialValues={{ password,confirmpassword }}
            onSubmit={submitForm}
            validationSchema={validation}
          >
            <Form>
              <Input
                placeholder={"**125"}
                labelText={"Password"}
                type="text"
                onChange={handleInput}
                name="password"
              />
               <Input
                placeholder={"**125"}
                labelText={"Confirm Password"}
                type="text"
                onChange={handleInput}
                name="confirmpassword"
              />
              <Submit
              type={"submit"}
              buttonTxt="Submit"
              />
            </Form>
          </Formik>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </div>
      </div>
    </div>
  )
}
