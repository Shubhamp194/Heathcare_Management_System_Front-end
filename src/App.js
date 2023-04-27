import "./App.css";
import AppRouter from "./Router/Approuter";

function App() {
  window.addEventListener("beforeunload", (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctors");
    localStorage.removeItem("user");
  });

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
