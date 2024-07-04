import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { signup } from '../../../redux/features/AuthSlice';
import Cookies from 'js-cookie';

export default function Active() {
  const navigate = useNavigate();
  const { token } = useParams();
  useEffect(() => {
    ActiveAccount()
  });
  const ActiveAccount = async () => {
  
    try {
      const res = await fetch(`/active/${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await res.json();
      console.log(data);

      const { first_name, last_name, isLogin,email } = data;
      // console.log(first_name, last_name, isLogin);
      if (res.status === 200) {
        Cookies.set("user", JSON.stringify(data))
        signup({ first_name, last_name, isLogin,email });
        window.location.reload();
        // console.log(res);
        
        // navigate("/", {
        //   state: { accountActivated: true }
        // })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>active</div>
  )
}
