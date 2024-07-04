import {useEffect} from 'react';

import { Formik, Form } from "formik";
import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import Submit from "../../UI/Button/Submit";
import Input from "../../UI/Input/Index";
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

let info ={
    email:""
}
function Forgot() {
    const [data, setData] = useState(info);
    const {email} = data;
 const navigate = useNavigate();
 const loginInfo =Cookies.get("step")? JSON.parse(Cookies.get("step")):null;

 useEffect(()=>{
    
    
    if(loginInfo?.step===2){
  navigate(`/forgot/otpPage/${loginInfo?.email}`)
    }
    
    if(loginInfo?.step===3){
        navigate(`/forgot/changePWd/${loginInfo?.email}`);
      }
    },[])
    const handleFormSubmit =async () => {
       
        const res = await fetch("/validEmail",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        });
        const data = await res.json();
        if(res.status===200){
            toast.success(data.message);
            Cookies.set("step",JSON.stringify({step:2,email:email}))
            setTimeout(()=>{
navigate(`/forgot/otpPage/${email}`)
            },1000)
        }else{
            toast.error(data.message);
        }
        
    }
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const validationHandler = Yup.object({
        email: Yup.string().email().required(),
    })
    return (<section className="forgot_wrapper bg-back-bg w-screen h-screen flex justify-center items-center">
        <div className="main_wrapper bg-white w-[400px] h-[330px] rounded-lg p-4">
            <div className="headerPart">
                <div className="icon w-[60px] h-[60px] flex justify-center items-center bg-button rounded-full">
                    <RiLockPasswordFill
                        className="text-2xl text-main-color"
                    />
                </div>
                <div className="main_text text-xl font-semibold font-main">
                    Trouble Login
                </div>
                <div className="sub_text font-secondary text-slate-400">
                    Are you lost your password? Forgot now to access your account
                </div>
            </div>
            <div className="form_part">
                <Formik
                   enableReinitialize
                   validationSchema={validationHandler}
                   initialValues={{ email }}
                   onSubmit={handleFormSubmit}
                >
                    <Form>
                        <Input
                            type="text"
                            onChange={handleInput}
                            labelText="Email*"
                            name="email"
                        />
                        <Submit
                            type={"submit"}
                            buttonTxt={"Submit"}
                        />
                    </Form>
                </Formik>

         
                <Toaster
  position="top-center"
  reverseOrder={false}
/>

            </div>
        </div>
    </section>);
}

export default Forgot;