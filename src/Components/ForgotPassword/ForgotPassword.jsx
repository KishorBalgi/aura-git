import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../Utils/axios.config";
const PasswordEnter = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setconfPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password | !confPass) {
      setError("Please enter all fields");
      return;
    }
    if (password !== confPass) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    handleReset();
    setError("");
    setEmail("");
    setPassword("");
    setconfPassword("");
  };
  async function handleReset() {
    await api
      .post(`/tickets/verification/password?email=${email}`, {
        new_password: password,
      })
      .then((res) => {
        setMessage("Verification link sent to your mail.");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (
          error.response.status === 400 &&
          error.response.data.error === "400-emailAlreadySent"
        )
          setMessage("Email already sent. Please check your mail.");
        else setError("Something went wrong. Please try again later.");
      });
  }

  return (
    <div className="grid form-container bg-signin bg-signinc w-screen">
      <div className="glass align-middle lg:col-start-2 rounded-lg grid justify-items-stretch p-5 lg:w-4/6 md:w-5/6 w-11/12 shadow-xl">
        <h1 className="font-bold text-xl text-center m-2">Reset Password</h1>
        <p className="font-semibold text-md text-center m-2">
          Please enter your email and new password:
        </p>
        {error && <p className="msg-box text-red-500 text-center">{error}</p>}
        {message && (
          <p className="msg-box text-green-500 text-center">{message}</p>
        )}
        {loading && (
          <p className="msg-box text-green-500 text-center">
            Sending Verification link...
          </p>
        )}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 my-1">
              <label className="py-3 col-span-1" htmlFor="email">
                Email
              </label>
              <input
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your Email"
              />
            </div>
            <div className="grid grid-cols-1 my-1">
              <label className="py-3 col-span-1" htmlFor="email">
                Enter New Password
              </label>
              <input
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                required
                placeholder="New Password"
              />
            </div>
            <div className="grid grid-cols-1 my-1">
              <label className="py-3 col-span-1" htmlFor="email">
                Confirm Password
              </label>
              <input
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="password"
                name="password"
                id="password"
                value={confPass}
                onChange={(e) => setconfPassword(e.target.value)}
                minLength="8"
                required
                placeholder="Confirm Password"
              />
            </div>
            <div className="mt-8 mb-5">
              {/* <Link to="/user">Login</Link> */}
              <button
                className="btn btn-primary w-full"
                type="submit"
                onClick={handleSubmit}
              >
                Send Email Verification Link
              </button>
            </div>
          </form>
          <div className="grid grid-cols-2">
            <Link className="col-span-1 justify-self-start" to="/signup">
              Signup
            </Link>
            <Link className="col-span-1 justify-self-end" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PasswordEnter;
