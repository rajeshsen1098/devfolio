import React, { useEffect, useState } from "react";
import "../styles/SignUp.scss";
import { connect } from "react-redux";
import { loginUser } from "../ducks/auth/actions";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getUser } from "../selectors";

function LogIn({ loginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector(getUser);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser({ email, password });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="forms-container">
      <div className="navbar-container"></div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
