import React, { useState } from 'react'

function Login(props) {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    function submitHandler(event){
        event.preventDefault();
        props.validate(username, password);
        
    }

    function handleChange(event){
        const{name, value} = event.target;
        if(name === 'username')
            setUsername(value);
        else if(name === 'password')
            setPassword(value);
    }

  return (
    <div className='container'>
        <h1>Login as {props.role}</h1>
        <form className='form' onSubmit={submitHandler}>
            <p>Username</p>
            <input type='text' name='username' placeholder='Enter your username' value={username} onChange={handleChange}/><br /><br />
            <p>Password</p>
            <input type='password' name='password' placeholder='Enter your password' value={password} onChange={handleChange} /><br /><br />
            <button >Login</button>
        </form>
    </div>
  )
}

export default Login