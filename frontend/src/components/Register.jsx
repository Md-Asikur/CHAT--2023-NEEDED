import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/actions/authAction";
import { useAlert } from "react-alert";
import axios from "axios"
import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from "../store/types/authType";
const Register = ({ history }) => {
  const alert = useAlert();
  const { loading, successMessage, error, authenticate, myInfo } = useSelector(
    (state) => state.auth
  );

  console.log(myInfo);

  const dispatch = useDispatch();

//   const [state, setstate] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
    
//   });

  const [loadImage, setLoadImage] = useState("");
  const [image, setPic] = useState();
    const [picloading, setPicLoading] = useState(false);
    const [userName, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    
    //console.log(pic)
//   const inputHendle = (e) => {
//     setstate({
//       ...state,
//       [e.target.name]: e.target.value,
//     });
//   };
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      alert.error("Plese Select an Image");
      return;
    }

    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chat__app2023_success");
      data.append("cloud_name", "asikur");
      fetch("https://api.cloudinary.com/v1_1/asikur/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
         
            setLoadImage(data.url.toString());
             setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      alert.error("Plese Select an Image");
      setPicLoading(false);
      return;
    }
  };
  // const fileHendle = e =>{
  //     if(e.target.files.length !==0){
  //         setstate({
  //             ...state,
  //             [e.target.name] : e.target.files[0]
  //         })
  //     }

  //     const reader = new FileReader();

  //     reader.onload = () =>{
  //         setLoadImage(reader.result);
  //     }
  //     reader.readAsDataURL(e.target.files[0]);
  // }

  const register = async(e) => {
    // const { userName, email, password,  confirmPassword } = state;
    setPicLoading(true);
    if (!userName || !email || !password || !confirmpassword) {
      alert.error("Please Fill all the Feilds");
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
     alert.error("doesn't match password")
      return;
    }
    console.log(userName, email, password, image);
     e.preventDefault();

    // const formData = new FormData();

    // formData.append("userName", name);
    // formData.append("email", email);
    // formData.append("password", password);
    // formData.append("confirmPassword", confirmpassword);
    // formData.append("image", pic);

    // dispatch(userRegister(formData));
       try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/messenger/user-register",
        {
          userName,
          email,
            password,
          image
        },
        config
      );
      console.log(data);
      alert.success("Registration Successful")
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/");
    } catch (error) {
     alert.error("Error Occured!")
      setPicLoading(false);
    }
  
  };

  // useEffect(() => {
  //   if (authenticate) {
  //     history.push("/");
  //   }
  //   if (successMessage) {
  //     alert.success(successMessage);
  //     dispatch({ type: SUCCESS_MESSAGE_CLEAR });
  //   }
  //   if (error) {
  //     error.map((err) => alert.error(err));
  //     dispatch({ type: ERROR_CLEAR });
  //   }
  // }, [successMessage, error]);

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>
        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                name="userName"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="user name"
                id="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="email"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="password"
                id="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={(e) => setConfirmpassword(e.target.value)}
              
                className="form-control"
                placeholder="confirm password"
                id="confirmPassword"
              />
            </div>
            <div className="form-group">
              <div className="file-image">
                <div className="image">{loadImage ? <img src={loadImage} /> : ""}</div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                    name="image"
                    className="form-control"
                    id="image"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to="/messenger/login">Login Your Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
