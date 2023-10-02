import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from "@/assets/login.svg";
import { Button } from "@/components/Button";
import axios from "@/libs/axios";
import { useAppContext } from "@/providers/context";

export const Signin = () => {
  const { setUserData } = useAppContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        email: user.email,
        password: user.password,
      });
      setUserData(res.data.obj);
      navigate("/learn");
    } catch (error) {
      console.log(error);
    }
  };
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <section className="min-h-screen grid place-items-center">
      <article className="w-[70vw] max-w-[750px] bg-secondary-bg flex justify-between items-center py-5 px-4 rounded-md shadow-2xl">
        <img
          src={RegisterImage}
          alt="Create an account to start using the app"
          className="w-1/2 max-w-[350px] hidden md:block"
        />
        <main className="flex-1 md:grid md:place-items-center">
          <h1 className="text-2xl mb-4 md:text-1.5xl">Login</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col flex-1 gap-2">
              <input
                value={user.email}
                onChange={handleChange}
                required
                name="email"
                placeholder="Email"
                type="email"
                className="min-w-[20ch] text-1.1 p-1 px-2 m-0.3em w-full border focus:outline-secondary"
              />
              <input
                value={user.password}
                onChange={handleChange}
                required
                name="password"
                placeholder="Password"
                type="password"
                className="min-w-[20ch] text-1.1 p-1 px-2 m-0.3em w-full border focus:outline-secondary"
              />
            </div>
            <Button type="submit" className="mt-8">
              Login
            </Button>
            <Link
              to="/"
              className="bg-transparent text-secondary flex justify-center items-center mt-2"
            >
              Back to home page
            </Link>
            <h3 className="text-0.9rem font-normal text-center mt-0.3em">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#ff7e57] font-medium">
                Sign up
              </Link>
            </h3>
          </form>
        </main>
      </article>
    </section>
  );
};
