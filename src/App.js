
import './App.css';
import { AppRouter } from './router';
import { Navbar } from "./components";

function App() {
  return (
    <div className="App">
     <Navbar/>
      <AppRouter/>
    </div>
  );
}

export default App;
