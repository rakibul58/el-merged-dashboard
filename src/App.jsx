import { Toaster } from "react-hot-toast";
import MainLayout from "./components/layouts/MainLayout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthProvider";

const App = () => {
  const { userInfo } = useContext(AuthContext);
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(userInfo?.role === 'user' ? 'student' : userInfo?.role);
  }, [userInfo]);

  return (
    <>
      <MainLayout role={role} />
      <Toaster />
    </>
  );
};

export default App;
