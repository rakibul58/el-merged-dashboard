import config from "../../config";

const Learn = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <iframe
          className="w-full h-screen"
          loading="lazy"
          src={
            config.dev_env === "dev"
              ? // ? `http://localhost:3000/preDashboard?token=${token}`
                `https://experiment-labs-masters.web.app/preDashboard?token=${token}`
              : `https://experimentlabs.in/preDashboard?token=${token}`
          }
        ></iframe>
      ) : (
        <div>Loading .....</div>
      )}
    </>
  );
};

export default Learn;
