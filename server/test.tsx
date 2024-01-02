import { useState, ChangeEvent } from "react";
import "./LoginPage.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

export default function Home() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inputerror, setInputerror] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      setInputerror("");
      setError("");

      if (!email || !password) {
        setInputerror("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }

      const response = await axios.post("http://127.0.0.1:3000/LoginPage", {
        email,
        password,
      });
      axios.defaults.withCredentials = true;

      if (
        response.data.message === "เข้าสู่ระบบสำเร็จ" &&
        response.data.userRole === "user"
      ) {
        console.log("เข้าสู่ระบบสำเร็จ");
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("loggedInUsername", response.data.username); // เก็บชื่อผู้ใช้ที่เข้าสู่ระบบไว้
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userRole", response.data.userRole);

        console.log("token:", response.data.token);
        console.log("userId", response.data.userId);
        console.log("Role", response.data.userRole);
        // localStorage.setItem("isLoggedIn", "true");
      } else {
        setError("Email / Password ไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", error);
      setError("Email / Password ไม่ถูกต้อง");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">AGRIC</h1>
        <h4 className="text-lg">LOGIN</h4>
      </div>
      <div className="mt-8 w-96">
        <div className="mb-4">
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="text"
            id="Email"
            name="Email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 p-2 w-full border rounded focus:outlzine-none focus:ring text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="Password"
              name="Password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring  text-black"
            />
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible className="text-gray-700" />
              ) : (
                <AiOutlineEye className="text-gray-700" />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogin}
          disabled={!email || !password}
          className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          Login
        </button>
        <div className="mt-4 text-red-600 text-sm">{error}</div>
        <div className="mt-4 text-red-600 text-sm">{inputerror}</div>
        <div className="mt-4 text-sm text-gray-800"></div>
      </div>
    </div>
  );
}
