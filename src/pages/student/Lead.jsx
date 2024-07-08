import config from "../../config";

const Lead = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <iframe
          className="w-full h-screen"
          loading="lazy"
          src={
            config.dev_env === "dev"
              ? `http://localhost:5174/preDashboard?token=${token}`
              : // `https://experimentlabsinternshipportal.web.app/preDashboard?token=${token}`
                `https://experimentlabsinternshipportal.web.app/preDashboard?token=${token}`
          }
        ></iframe>
      ) : (
        <div>Loading .....</div>
      )}
    </>
  );
};

export default Lead;
