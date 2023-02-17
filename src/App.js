import './App.css';
import Login from './components/Login';

function App() {

  function authenticate(user, pass){
    alert("Login Successfull for user : "+user+" with password : "+pass);
  }

  return (
    <div className="App">
      <Login role='Admin' validate={authenticate}/>
    </div>
  );
}

export default App;
