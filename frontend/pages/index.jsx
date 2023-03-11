import styles from "../styles/Home.module.css";
import InstructionsComponent from "../components/InstructionsComponent";
import TokensBalanceDisplay from "../components/tokensBalanceDisplay.jsx";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        
        
        {/* TODO: pass dynamic chain id to display, here */}
        <TokensBalanceDisplay address={""} chain={"OPT_GOERLI"} />


        {/* <InstructionsComponent></InstructionsComponent> */}

      </main>
    </div>
  );
}
