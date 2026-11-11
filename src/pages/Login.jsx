import Input from "../components/Input";
import Button from "../components/button";  
import Navbar from "../components/Navbar";
import "./Login.css"
function Login(){
  return (

    <div className="loginPage">
      <Navbar />
      <div className="login">
       
        <form>
          <h2>Login to your account</h2>
          <Input
            label="Username or Email"
            type="text"
            placeholder="Enter your username or email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <Button text="Login" type="submit" />
        </form>

      </div>
    </div>

  );

}

export default Login;