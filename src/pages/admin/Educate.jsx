import config from "../../config";

const Educate = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <iframe
          className="w-full h-screen"
          src={
            config.dev_env === "development"
              ? `http://localhost:3000/login/id?token=${token}`
              : `https://experimentlabs.in/login/id?token=${token}`
          }
        ></iframe>
      ) : (
        <div>Loading .....</div>
      )}
    </>
  );
};

export default Educate;
