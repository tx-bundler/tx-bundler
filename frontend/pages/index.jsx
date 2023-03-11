import styles from "../styles/Home.module.css";
import InstructionsComponent from "../components/InstructionsComponent";
import TokensBalanceDisplay from "../components/tokensBalanceDisplay.jsx";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        
        {/* pass chain id to display, here */}
        <TokensBalanceDisplay address={""} chain={"ETH_GOERLI"} />

        {/* <InstructionsComponent></InstructionsComponent> */}

      </main>
    </div>
  );
}
