import "./App.css";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import TokenBalance from "./Components/TokenBalance.jsx";
import TokenTransfer from "./Components/TokenTransfer.jsx";

function App() {
  return (
    <div className="h-lvh">
      <NavBar />
      <TokenBalance />
      <TokenTransfer />
      <Footer />
    </div>
  );
} 

export default App;

