import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Input from './../../UI/Input/Index';
import { Form, Formik } from 'formik';
import Submit from '../../UI/Button/Submit';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

let info = {
  otp: ""
}
export default function OtpForm() {

  const { email } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState(info);
  const { otp } = data;
  const handleInput = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  useEffect(() => {
let loginInfo = Cookies.get("step") ? JSON.parse(Cookies.get("step")) : null;
    if (loginInfo?.step!==2) {
      navigate("/forgot")
    }
    if(loginInfo?.step===3){
      navigate(`/forgot/changePWd/${email}`);
    }
  }, [])
  const validation = Yup.object({
    otp: Yup.string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, 'Must be exactly 5 digits')
      .max(5, 'Must be exactly 5 digits')
  })
  const submitForm = async () => {
    const res = await fetch(`/verifyOtp/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ otp })
    });
    const data = await res.json();
    if (res.status === 200) {
      Cookies.set("step",JSON.stringify({step:3,email:email}))
setTimeout(() => {
  navigate(`/forgot/changePWd/${email}`);
 
}, 1000);
    }else{
      toast.error(data.message);
    }
  }
  const otpSendAgain = async () => {
    const res = await fetch("/validEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });
    const data = await res.json()
    if(res.status===200){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
  }
  return (
    <div className="bg-back-bg w-screen h-screen flex justify-center items-center for_otp_wrapper">
      <div className="main_wrapper wrapper w-[400px] h-[300px] bg-main-bg rounded-xl p-4">
        <div className="header_text">
          <div className="mainTXt font-main font-semibold text-2xl">
            Verify Your Account
          </div>
          <div className="sub_txt text-slate-400 font-secondary">
            A 5 digits otp send on your verfied email address {email}
          </div>
        </div>
        <div className="form_box">
          <Formik
            enableReinitialize
            initialValues={{ otp }}
            onSubmit={submitForm}
            validationSchema={validation}
          >
            <Form>
              <Input
                placeholder={"**125"}
                labelText={"Otp"}
                type="text"
                onChange={handleInput}
                name="otp"
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
          <div className="otp_sendAgain text-center font-main py-2 hover:underline cursor-pointer hover:text-button"
            onClick={otpSendAgain}
          >
            Otp send again
          </div>
        </div>
      </div>
    </div>
  )
}
