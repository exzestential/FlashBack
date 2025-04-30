import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Loader } from "../../component/global";
import { SubHeader, Text } from "../../component/presets";

const EmailVerified = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.form;

  useEffect(() => {
    const sendUserInfo = async () => {
      try {
        // You can send full form data here
        await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        setTimeout(() => {
          navigate("/?isLoggingIn=true");
        }, 1000);
      } catch (error) {
        console.error("Error sending user data:", error);
        navigate("/?isLoggingIn=false");
      }
    };

    if (form) {
      sendUserInfo();
    } else {
      navigate("/"); // fallback
    }
  }, [form, navigate]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <SubHeader text="Email Verified!" />
      <Text text="Redirecting you to login page..." />
    </div>
  );
};

export default EmailVerified;
