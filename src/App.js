import "./App.css";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import TokenBalance from "./Components/TokenBalance.jsx";
import TokenBalanceEtherJs from "./Components/TokenBalanceEtherJs.jsx";
import TokenTransfer from "./Components/TokenTransfer.jsx";
import TokenTransferEtherJs from "./Components/TokenTransferEtherJs.jsx";

function App() {
  return (
    <div className="h-lvh">
      <NavBar />

      {/* //!  implement using EtherJs lib */}

      <TokenBalanceEtherJs />
      <TokenTransferEtherJs />

      {/* //! implement using Web.js lib */}

      <TokenBalance />
      <TokenTransfer />

      <Footer />
    </div>
  );
}

export default App;
