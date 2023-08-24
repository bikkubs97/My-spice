import  { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";


interface RegisterState {
  username: string;
  password: string;
  message: string;
}

export default function SignIn(): JSX.Element {
  const [state, setState] = useState<RegisterState>({
    username: "",
    password: "",
    message: "",
  });
  const navigate = useNavigate();

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();
    setMessage('Please Wait...')
    try {
      const response = await fetch(
        "https://foofiesta-server-j46h.onrender.com/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: state.username,
            password: state.password,
          }),
        }
      );

      if (response.status === 202) {
        console.log("success");
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setMessage("Login Successful!");

        // Now that you have the token, fetch additional data and save it in local storage
        await fetchAndSaveAdditionalData(data.token);

        setTimeout(() => {
          navigate("/products");
        }, 1000);
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Incorrect username or password!");
    }
  }

  async function fetchAndSaveAdditionalData(token: string) {
    try {
      // Replace this with your actual server endpoint
      const response = await fetch("https://foofiesta-server-j46h.onrender.com/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers as needed
        },
      });

      if (response.ok) {
        const fetchedData = await response.json();
        
        // Store the fetched data in local storage or state as needed
        localStorage.setItem("userData", JSON.stringify(fetchedData));

        console.log("Fetched data:", fetchedData);
      } else {
        // Handle the error case
        console.error("Failed to fetch additional data from the server");
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  }

  function setMessage(message: string) {
    setState((prevState) => ({ ...prevState, message }));
  }


  return (
    <div className="ml-8 md:flex">
      <div className="w-1/2">
        <h1 className="text-orange-600 font-extrabold text-6xl my-10 animate-bounce">
          My Spice!
        </h1>
        <div className="animate-pulse text-xl font-medium">{state.message}</div>

        <p className="font-bold text-xl my-4">
          Welcome to My Spice! Order the best food online!
        </p>
        <h2 className="font-bold text-xl text-green-600 my-4">Sign In</h2>
        <label htmlFor="user">Enter your name</label>
        <br />
        <input
          id="user"
          required
          value={state.username}
          onChange={(e) => setState({ ...state, username: e.target.value })}
          className="border border-green-500"
        />
        <br />
        <div className="password">
          <label htmlFor="password">Enter Password</label>
          <br />
          <input
            type="password"
            id="password"
            required
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            className="border border-green-500"
          />
          <br />
        </div>
        <button
          className="bg-yellow-400 px-2 py-1 border rounded-md my-4 hover:bg-green-400"
          type="submit"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <p>Don't have an account? Please Sign Up.</p>
        <button
          className="bg-yellow-400 px-2 py-1 border rounded-md my-4 hover:bg-green-400"
          onClick={() => navigate("/")}
        >
          Sign Up
        </button>
      </div>
      <div className="w-1/2 h-full mt-10 ml-5">
        <img
          className="animate-spin-slow hover:animate-none hover:cursor-pointer"
          src="pizza.png"
          width={500}
          alt="Pizza"
        />
      </div>
    </div>
  );
}
