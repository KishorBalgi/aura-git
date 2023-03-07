import { useUser } from "../../Contexts/userContext";
import { useEffect, useState } from "react";
// import Razorpay from "razorpay";
import api from "../../Utils/axios.config";
import logo from "../../Assets/logo.png";

const TeamRegister = (props) => {
  const [team, setTeam] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isNull, setNull] = useState(true);
  const event_participated = {
    event_id: props.id,
    event_title: props.title,
  };
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useUser();
  const { paid, setPaid } = useState(false);

  useEffect(() => {
    // console.log(user);
    if (user !== null) {
      setNull(false);
    } else {
      setNull(true);
    }
  }, [team, user]);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handleInputChange = (index, event) => {
    const newInputs = [...team];
    newInputs[index] = event.target.value;
    setTeam(newInputs);
    // console.log(team);
  };

  const createOrder = async () => {
    try {
      const { data } = await api.get(`/payments/order?event_id=${props.id}`);
      return data.data.order;
    } catch (error) {
      console.log("Error creating order:", error);
      return null;
    }
  };

  const handlePaymentSuccess = async (orderId, paymentData) => {
    try {
      // orderCreationId: orderId,
      // razorpayOrderId: paymentData.razorpay_order_id,
      const data = {
        // orderCreationId: orderId,
        // razorpayPaymentId: paymentData.razorpay_payment_id,
        // razorpayOrderId: paymentData.razorpay_order_id,
        // razorpaySignature: paymentData.razorpay_signature,
        payment_id: paymentData.razorpay_payment_id,
        signature: paymentData.razorpay_signature,
      };
      await api.post(`/payments/order/${orderId}/receipt`, data);
      setPaid(true);
    } catch (error) {
      console.log("Error processing payment:", error);
      setPaid(false);
    }
  };

  const paymentModal = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const order = await createOrder();
    // console.log(process.env.REACT_APP_RZRKEY);
    if (!order) {
      setLoading(false);
      alert("Unable to create payment order. Please try again later.");
      return;
    }
    const amount = order.amount;
    const orderId = order.id;
    const currency = order.currency;
    const key = process.env.REACT_APP_RZRKEY;

    const options = {
      key: key,
      amount: amount.toString(),
      currency: currency,
      name: "KLS GIT, Belagavi",
      description: "Test Transaction",
      image: logo,
      order_id: orderId,
      handler: (response) => handlePaymentSuccess(orderId, response),
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      notes: {
        address: "KLSGIT of Belagavi",
      },
      theme: {
        color: "#ffffff",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    // handleSubmit();
    setLoading(false);
  };
  const registerTeam = async () => {
    // e.preventDefault();
    if (!name) {
      setError("Please enter team name");
      return;
    }
    if (team.length < props.min_size - 1) {
      setError(`Team size should be atleast ${props.min_size}`);
      return;
    }
    setLoading(true);
    const team_name = name;
    const team_members = team;
    const data = {
      event_participated,
      team_name,
      team_members,
    };
    console.log(data);
    await api
      .post("/teams/createteam", data)
      .then((res) => {
        setMessage("Team Registered Successfully!");
        setError("");
        setLoading(false);
        props.setRegistered(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (
          err.response.status === 403 &&
          err.response.data.error === "403-teamMemberEmailUnverified"
        ) {
          setError(
            "One or more team members have not verified their email address. Please ask them to verify their email address and try again."
          );
        } else {
          setError("Team Registration Failed!");
        }
      });
  };
  // eslint-disable-next-line no-unused-vars
  //   const { setUser } = useUser();
  const n = props.size;
  // console.log(n);
  // const times = [...Array(n).keys()];
  const renderInputForms = (x) => {
    const inputForms = [];

    for (let i = 0; i < x - 1; i++) {
      inputForms.push(
        <>
          <label className="py-3 col-span-1" htmlFor={`tm${i}`} key={i + 20}>
            Team Mate {i + 1}
          </label>
          <input
            className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
            id={`tm${i}`}
            key={i + 1}
            value={team[i] || ""}
            onChange={(e) => handleInputChange(i, e)}
            disabled={false}
            required
            placeholder="Enter Teammate's Aura ID"
          />
        </>
      );
    }

    return inputForms;
  };

  return (
    <div className="align-middle rounded-lg grid justify-items-stretch p-5 lg:w-4/6 md:w-5/6 w-11/12 shadow-xl bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20 border-black-100">
      {error && <p className="msg-box text-red-500 text-center">{error}</p>}
      {message && (
        <p className="msg-box text-green-500 text-center">{message}</p>
      )}
      {loading && (
        <p className="msg-box text-green-500 text-center">Processing...</p>
      )}
      {props.min_size > 1 && (
        <p className="text-center text-black">
          Team size should be atleast {props.min_size}
        </p>
      )}
      {!props.registered && (
        <>
          <h1 className="font-bold text-xl text-center m-2">
            {n > 1 ? "Register your team" : "Register yourself"}
          </h1>
          <label className="py-3 col-span-1">Team Name</label>
          <input
            className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={false}
            required
            placeholder="Enter Team Name"
          />
          <div>
            <form>
              <div className="grid grid-cols-1 my-1">{renderInputForms(n)}</div>
              {n > 0 && (
                <div className="grid justify-center my-8">
                  <button
                    className="btn btn-primary row-start-2 justify-self-center"
                    onClick={registerTeam}
                    disabled={loading}
                  >
                    Register
                  </button>
                </div>
              )}
              {/* {console.log(team, Mem)} */}
            </form>
          </div>
        </>
      )}
      {props.registered && !props.paid && (
        <>
          <h1 className="font-bold text-xl text-center m-2">
            Pay the registration fee
          </h1>
          <p className="text-center text-sm text-blue-600">
            Your team has been registerd. Pay to confirm your registration.
          </p>
          <div className="grid justify-center my-8">
            <button
              className="btn btn-primary row-start-2 justify-self-center"
              onClick={paymentModal}
              disabled={loading}
            >
              Pay
            </button>
          </div>
        </>
      )}
      {props.paid && (
        <>
          <h1 className="font-bold text-xl text-center m-2">
            You have Successfully Registered!
          </h1>
        </>
      )}
    </div>
  );
};
export default TeamRegister;
