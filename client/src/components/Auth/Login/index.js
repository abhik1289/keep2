import { FaUserLock } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { HiUserPlus } from 'react-icons/hi2';
import IconButton from '../../UI/Button/IconButton';
import Submit from '../../UI/Button/Submit';
import Input from '../../UI/Input/Index';
import { useState } from 'react';
import * as Yup from 'yup'
import SignUp from '../Signup';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { changeName, login, setLables } from '../../../redux/features/AuthSlice';
var loginInfos = {
    email: "", password: ""
}
function Login() {


    const navigate = useNavigate();
    const location = useLocation();
    const [data, setdata] = useState(loginInfos);
    const [vissable, setVissable] = useState(false);
    const [signupVissable, setsignupVissable] = useState(false)
    const { email, password } = data;
    const dispatch = useDispatch();
    const user = useSelector((state) => ({ ...state }));

    const handleInput = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value })
    }
    const handleFormSubmit = async () => {
        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json();
            const { first_name, last_name } = data;
            console.log(data);
            if (res.status === 200) {

                Cookies.set("user", JSON.stringify(data));
                Cookies.set("labels", JSON.stringify(data.labels));

                toast.success("Login success");
                setTimeout(() => {
                    navigate("/");
                    dispatch(setLables(data.labels))
                    dispatch(login(data));
                    dispatch(changeName({ first_name, last_name, profile_photo: data.profile_photo }))
                }, 1500);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error);
        }

    }
    const validationHandler = Yup.object({
        email: Yup.string().email().required(), password: Yup.string().min(6).required()
    });
    if (location.state?.logout === true) {
        toast.success("Logout Successfully")
    }

    return (<section className="login-wrapper bg-back-bg w-screen h-screen flex justify-center items-center">
        <div className="wrapper w-[400px] h-[440px] bg-main-bg rounded-xl p-4">
            <div className="login_header ">
                <div className="mainbx flex gap-3 items-center">
                    <div className="icon bg-[#fed33059] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                        <FaUserLock className='text-slate-600' />
                    </div>
                    <div className="text font-main font-bold">
                        Login Now
                    </div>
                </div>
                <div className="lower font-secondary text-slate-400 mt-3">
                    Login to your account and enjoy exclusive features and many more
                </div>
            </div>
            <div className="login_box">
                <Formik
                    enableReinitialize
                    validationSchema={validationHandler}
                    initialValues={{ email, password }}
                    onSubmit={handleFormSubmit}
                >
                    <Form>
                        <Input
                            type="text"
                            onChange={handleInput}
                            labelText="Email*"
                            name="email"
                        />
                        <Input
                            type={vissable ? "text" : "password"}
                            name="password"
                            onChange={handleInput}
                            labelText="Password*"
                            passwordFiled
                            vissable={vissable}
                            setVissable={setVissable}
                        />
                        <div
                            onClick={() => navigate("/forgot")}
                            className="forgot_pwd cursor-pointer text-right my-2 text-slate-500 font-secondary">
                            Forgot Password ?
                        </div>
                        <Submit
                            type="submit"
                            buttonTxt={"Login"}
                        />
                    </Form>
                </Formik>
            </div>
            <div className="bottom_wrapper flex gap-3 justify-center h-[80px] items-center">

                <button
                    onClick={() => setsignupVissable(!signupVissable)}
                    className='bg-blue-600 font-main text-white w-full flex rounded-md py-2 gap-2 justify-center'>

                    <HiUserPlus className='text-2xl text-white' />

                    Create Account
                </button>
                {signupVissable && <SignUp
                    setsignupVissable={setsignupVissable}
                />}
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>
        </div>
    </section>);
}

export default Login;