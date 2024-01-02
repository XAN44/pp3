"use client";
import { useState, ChangeEvent } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Register.css";
import axios from "axios";
import React from "react";

function Register() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setEmailError("");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailValue.match(emailPattern)) {
      setEmailError("รูปแบบ Email ไม่ถูกต้อง");
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const handleRegister = async () => {
    try {
      const formData = new FormData();

      // เพิ่มข้อมูลรูปภาพโปรไฟล์
      const selectedImage = document.getElementById(
        "profileImage"
      ) as HTMLInputElement;
      if (selectedImage?.files && selectedImage.files[0]) {
        formData.append("profileImage", selectedImage.files[0]);
      } else {
        setEmailError("กรุณาเลือกรูปโปรไฟล์");
        return;
      }

      // เพิ่มข้อมูลอื่นๆ
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      // ทำการส่งข้อมูล
      await axios.post("http://127.0.0.1:3000/register", formData);

      console.log("สมัครสมาชิกสำเร็จ");
    } catch (error: unknown) {
      console.error("เกิดข้อผิดพลาดในการสมัครสมาชิก", error);
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes("Email")) {
          setEmailError(errorMessage);
        } else if (errorMessage.includes("Username")) {
          setUsernameError(errorMessage);
        } else {
          setRegistrationError(errorMessage); // Set registration error message
        }
      }
    }
  };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      const imgCircle = document.querySelector(".ImgProfile-Cicrle");
      if (imgCircle instanceof HTMLElement) {
        imgCircle.style.backgroundImage = `url('${imageUrl}')`;
      }
      setProfileImage(imageUrl);
    }
  };

  return (
    <div
      className="
    min-h-screen 
    flex flex-col
    justify-center
    items-center
    "
    >
      <div
        className=" 
      w-full
      max-w-xs 
      p-4
      rounded-lg first-
      shadow-lg"
      >
        <h1
          className=" text-2xl
         text-center 
         font-bold 
         justify-center 
         items-center 
         mb-10"
        >
          AGRIC
        </h1>

        <div className=" relative flex items-center justify-center mb-10">
          <label className="ImgProfile-Cicrle" htmlFor="profileImage">
            {profileImage ? (
              <div
                className="uploaded-image"
                style={{ backgroundImage: `url('${profileImage}')` }}
              ></div>
            ) : (
              <span>เลือกรูปโปรไฟล์</span>
            )}
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
            name="profileImage"
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="Email" className=" block mb-3">
            Email:
          </label>
          <input
            type="text"
            id="Email"
            name="Email"
            onChange={handleEmailChange}
            value={email}
            className="text-black
            w-full
            border rounded-lg 
            py-1 px-2"
          />
          {emailError && (
            <p
              className="
          text-red-600
          "
            >
              {emailError}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="Username" className="block mb-3 ">
            Username:
          </label>
          <input
            type="text"
            id="Username"
            name="Username"
            onChange={handleUsernameChange}
            value={username}
            className="text-black
            w-full
            rounded-lg
            py-1 px-2"
          />
          {usernameError && <p className="text-red-600  ">{usernameError}</p>}
        </div>

        <div className="mb-4 relative ">
          <label htmlFor="Password" className=" block mb-3 ">
            Password:
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="Password"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
            className="text-black
            w-full 
            border
            rounded-lg
            py-1 px-2"
          />
          <div
            className="absolute
          text-gray-800
          inset-y-11
          right-2
           "
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>

        <div className=" mb-4">
          <label htmlFor="confirmPassword" className="block mb-3">
            Confirm Password:
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={handlePasswordConfirm}
            className="text-black
            w-full
            border
            rounded-lg
            py-1 px-2"
          />
        </div>

        {password !== confirmPassword && (
          <p className=" text-red-600">รหัสผ่านและยืนยันรหัสผ่านต้องตรงกัน</p>
        )}
        {registrationError && <p className=" ">{registrationError}</p>}

        <button
          onClick={handleRegister}
          disabled={
            !email ||
            !username ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword
          }
          className="text-green-500 "
        >
          สมัครสมาชิก
        </button>

        <div className=" block m-3"></div>
      </div>
    </div>
  );
}

export default Register;
