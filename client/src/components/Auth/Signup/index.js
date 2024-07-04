import React, { useState } from 'react'
import { HiUserAdd } from 'react-icons/hi'
import { MdOutlineClose } from 'react-icons/md'
import * as Yup from 'yup'
import { Formik, Form } from 'formik';
import Input from './../../UI/Input/Index';
import Submit from './../../UI/Button/Submit';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {  changeName, signup } from '../../../redux/features/AuthSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const info = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
}


export default function SignUp({ setsignupVissable }) {
    const dispatch = useDispatch();
    const [data, setdata] = useState(info);
    const [vissable, setVissable] = useState(false);
    console.log(vissable)
    const handleInput = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value })
    }
   
    const signupSubmit =async () => {
        const res = await fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({first_name,last_name,email,password})
        });
        const data = await res.json();
        if(res.status===200){
            Cookies.set("user", JSON.stringify(data));
            dispatch(signup(data));
            toast.success('Verify Your Account');

        }
    }
    const { first_name, last_name, email, password } = data;
    var validation = Yup.object({
        first_name: Yup.string().min(3).max(10).matches(/^[aA-zZ]+$/).required(),
        last_name: Yup.string().min(2).max(10).matches(/^[aA-zZ]+$/).required(),
        email: Yup.string().email().required(), password: Yup.string().min(6).required()
    })
    return (
        <div className='w-screen h-screen fixed top-0 left-0 bg-blur-background flex justify-center items-center'>
            <div
                className="signupPage bg-white w-[430px] min-h-[450px] rounded-lg p-4"
            >
                <div className="signup_header relative">
                    <div className="login_header">
                        <div className="mainbx flex gap-3 items-center relative">
                            <div className="icon bg-[#fed33059] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                                <HiUserAdd className='text-slate-500 text-2xl' />
                            </div>
                            <div className="text font-main font-bold">
                                Sign Up Now 😍
                            </div>
                            <div className="close_btn absolute right-2 w-[30px] h-[30px] bg-slate-400 rounded-full flex justify-center items-center cursor-pointer"
                                onClick={() =>
                                    setsignupVissable(false)
                                }
                            >
                                <MdOutlineClose />
                            </div>
                        </div>
                        <div className="lower font-secondary text-slate-400 mt-3">
                            Login to your account and enjoy exclusive features and many more
                        </div>
                    </div>

                </div>
                <div className="login_form">
                    <Formik
                        onSubmit={signupSubmit}
                        enableReinitialize
                     validationSchema={validation}
                        initialValues={{ first_name, last_name, email, password }}
                    >
                        <Form>
                            <div className="first_row flex">
                                <div className="w-6/12">
                                    <Input
                                        type="text"
                                        onChange={handleInput}
                                        labelText="First Name"
                                        name="first_name"
                                    />
                                </div>
                                <div className="w-6/12 px-2">

                                    <Input
                                        type="text"
                                        onChange={handleInput}
                                        labelText="Last Name"
                                        name="last_name"
                                    />
                                </div>

                            </div>
                            <Input
                                type="text"
                                onChange={handleInput}
                                labelText="Email"
                                name="email"
                            />
                            <Input
                                type={vissable ? "text" : "password"}

                                onChange={handleInput}
                                labelText="Password"
                                name="password"
                                passwordFiled
                            vissable={vissable}

                                setVissable={setVissable}
                            />
                            <div className="spacer mt-4"></div>
                            <Submit
                                buttonTxt={"Sign Up"}
                                type="submit"
                                 />
                                 <Toaster
  position="top-center"
  reverseOrder={false}
/>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}
