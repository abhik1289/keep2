import { useState, useRef, useEffect } from 'react'
import Header from '../Header'
import ProfileInput from './ProfileInput';
import "./index.css";
import { GoPencil } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from '../../redux/features/AuthSlice';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {
  const imageButton = useRef(null);
  const [fileChange, setFileChange] = useState(false);
  const userInfo = useSelector(state => state);
  const dispatch = useDispatch();
  const info = userInfo?.user?.info;
  const data = userInfo?.user?.auth;
  const [image, setImage] = useState(info.profile_photo);
  const [file, setFile] = useState();

  const [first_name, setfirst_name] = useState(info?.first_name);
  const [last_name, setlast_name] = useState(info?.last_name);
  const userID = data?.id;

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (fileChange) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [fileChange]);



  const handleFileChange = (even) => {
    setFileChange(true);
    const fileUpload = even.target.files[0];
    setFile(even.target.files[0]);
    setImage(URL.createObjectURL(fileUpload))
  }
  const handleSave = async (e) => {
    if (first_name.length == 0 || first_name.length == 0) {
      alert("Name is required")
    }
    try {

      if (file) {
        let data = new FormData();
        data.append("first_name",first_name);
        data.append("last_name",last_name);
        data.append("photo",file);

console.log(file);
      axios({
        method:"put",
        url:`/updateProfile/${userID}`,
        data:data
      }).then(res=>{
        if(res.status===200){
          const data =res.data;
        Cookies.set("userInfo", JSON.stringify(data));

          const {  first_name, last_name,profile_photo}=data;
          dispatch(changeName({
            first_name, last_name,profile_photo
          }))
          toast.success("Updated profile");
          setFileChange(false);
        }else{
        toast.error(res.message);
        }
      }).catch((error)=>{
        toast.error(error.message);

      })
   ;
      }
      const res = await fetch(`/updateProfile/${userID}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name })
      })
      if (res.status === 200) {
        let data = {
          first_name, last_name,profile_photo:info?.profile_photo
        }
        Cookies.set("userInfo", JSON.stringify(data));
        dispatch(changeName({
          first_name, last_name
        }));
        toast.success("Updated profile");
        setFileChange(false);

      }else{
      toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);

    }
  }

  return (
    <>
      <Header />
      <div className="flex bg-slate-200 h-[88.5vh] justify-center main_wrapper">
        <div className="profile_header bg-white w-[500px] mt-2 p-3 rounded-md h-[200px]">
          <div className="first_row flex">
            <div className="profile_image w-[130px] h-[130px] relative rounded-xl overflow-hidden ">
            {image?  <img className='absolute w-full h-full' src={image
              } alt="profile_photo" />:<div className='relative w-full h-full bg-main-color flex justify-center items-center font-main text-4xl'>
                {first_name[0]+"."+last_name[0]}
                </div>}
              <input type="file"
                onChange={handleFileChange}
                name="image" hidden ref={imageButton} />
              <div
                onClick={() => imageButton.current.click()}
                className="icon absolute right-2 bottom-2 cursor-pointer w-[28px] h-[28px] bg-slate-300 rounded-full flex justify-center items-center">
                <GoPencil />
              </div>
            </div>
            <div className="describtion ml-4 w-10/12">
              <div className="name_field flex">
                <div className="input_field">
                  <label className='font-secondary'>
                    First Name
                  </label>
                  <ProfileInput value={first_name} setFileChange={setFileChange} setName={setfirst_name} readOnly={false} edit />
                </div>
                <div className="input_field mx-2">
                  <label className='font-secondary'>
                    Last Name
                  </label>
                  <ProfileInput value={last_name} setFileChange={setFileChange} setName={setlast_name} readOnly={false} edit />
                </div>
              </div>
              <div className="input_field">
                <label className='font-secondary'>
                  Email
                </label>
                <ProfileInput value={data.email} readOnly={true} edit={false} />
              </div>
            </div>
          </div>
          <div className="button_wrapper flex justify-center">
            {fileChange && <button onClick={handleSave} className='px-6 py-2 bg-main-color text-black rounded-lg font-main'>Save</button>}
          </div>
        </div>
      </div>
    </>
  )
}
