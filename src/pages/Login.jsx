import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";
import config from "../config";

const Login = () => {
  const { user, userInfo, signIn, providerLogin, logOut } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [redirectUser, setRedirectUser] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user?.email && redirectUser) {
      if (userInfo?.email && redirectUser) {
        if (userInfo?.role === "admin") navigate("/admin/engage");
        else if (userInfo?.role === "user") navigate("/student/leverage");
        else navigate("/dashboard");
      }
    }
  }, [user, userInfo]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const form = e?.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      signIn(email, password).then(() => {
        saveUser(email);
      });
    } catch (error) {
      toast.error("Please enter correct password.");
    }
  };

  const saveUser = async (email) => {
    try {
      fetch(`${config.serverless_api}/api/v1/users?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("role", data?.role);
          if (data?.role === "admin") navigate("/admin/engage");
          else if (data?.role === "user") navigate("/student/leverage");
          else navigate("/dashboard");
        });
    } catch (error) {
      throw Error(error);
    }
  };

  const handleLogout = () => {
    logOut()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error(error));
  };

  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    providerLogin(googleProvider)
      .then(async (result) => {
        console.log({ result });
        setRedirectUser(false);
        const email = result?.user?.email;
        const userDetails = await axios.get(
          `${config.serverless_api}/api/v1/users?email=${email}`
        );
        if (userDetails?.data?.isUser === false) {
          toast.error("Your Are Not Registered User");
          return handleLogout();
        } else {
          try {
            const userAgent = window.navigator.userAgent;
            const userDevice = await axios.put(
              `${config.serverless_api}/api/v1/users/addDevice/${email}`,
              {
                device: userAgent,
              }
            );

            console.log(userDevice);

            // Assuming your server returns a specific status code for device limit reached
            if (userDevice?.status === 200) {
              try {
                saveUser(email);
              } catch (error) {
                toast.error("Please enter correct email and password.");
              }
            } else {
              toast.error("Device limit crossed.");
              return handleLogout();
            }
          } catch (error) {
            // Handle any other errors that may occur during the Axios request
            console.log(error?.response?.status);

            if (error?.response?.status === 400) {
              toast.error("Device limit crossed.");
            } else {
              toast.error("Your Are Not Registered User");
            }
            return handleLogout();
          }
        }
      })
      .catch((error) => {
        console.error(error);
        return handleLogout();
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-slate-50">
      <div className="flex flex-col items-center min-h-screen w-full max-w-7xl mx-auto gap-10 justify-center">
        <div className="flex flex-col justify-center space-y-5 w-full max-w-md bg-slate-200 py-7 px-8 rounded-xl shadow-2xl">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Login to your account
            </h2>
          </div>
          <div className="flex flex-col max-w-md space-y-5">
            <form
              onSubmit={handleLoginSubmit}
              noValidate=""
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-3 text-sm">
                <label htmlFor="email" className="block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue=""
                  placeholder="Email"
                  className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                  required
                />
              </div>
              <div className="space-y-3 text-sm">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    defaultValue=""
                    placeholder="Password"
                    className="border w-full px-4 py-3 rounded-xl border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-4 py-3"
                  >
                    <p className="text-xl">{showPassword ? "👁️" : "🔒"}</p>
                  </button>
                </div>
              </div>
              <input
                type="submit"
                value="Login"
                className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan-400  hover:bg-cyan-700 cursor-pointer font-bold hover:transition-all hover:delay-200 hover:ease-out"
              />
            </form>
            <p className="font-semibold text-lg text-center">Or</p>
            <button
              onClick={handleGoogleSignIn}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-3 space-x-4 border rounded-xl hover:transition-all hover:delay-200 hover:ease-out hover:bg-blue-800 bg-blue-400 text-white mb-[25px]"
            >
              <p className="text-[20px]">Continue with Google</p>
            </button>
            <div className="text-center text-blue-400">
              <button className="text-blue border-b border-slate-200 mb-[1px] hover:border-blue-400">
                Forgot password?
              </button>
            </div>
            <div className="flex justify-center">
              <p className="font-medium text-lg">
                {`Don't have an account?` + " "}
                <Link to={`/register`} className="text-blue cursor-pointer">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <div className="">
          <p className="font-bold mb-1">
            Built by{" "}
            <a href="https://experimentlabs.in/" className="underline">
              Experiment Labs
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
