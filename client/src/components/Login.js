import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", this.state.credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
        console.log(res);
      })
      .catch((err) => console.error("login error", err.message));
  };

  render() {
    return (
      <>
        <h1>Welcome to the Bubble App!</h1>
        <p>Build a login page here</p>
        <div>
          <form onSubmit={this.login}>
            <input
              type="text"
              name="username"
              value={this.state.credentials.username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              value={this.state.credentials.password}
              onChange={this.handleChange}
            />

            <button>Log in</button>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
// import React from "react";

// const Login = () => {
//   // make a post request to retrieve a token from the api
//   // when you have handled the token, navigate to the BubblePage route
//   return (
//     <>
//       <h1>Welcome to the Bubble App!</h1>
//       <p>Build a login page here</p>
//     </>
//   );
// };

// export default Login;
