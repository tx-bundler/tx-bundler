import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import styles from "../styles/TokenBalancesDisplay.module.css";

export default function TokenBalancesPanel({ walletAddress, chain }: any) {
  const [tokensBalance, setTokensBalance] = useState();
  const [isLoading, setIsloading] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();
  const [propAddress, setPropAddress] = useState();

  useEffect(() => {
    const getNFTs = async () => {
      setIsloading(true);
      if (isConnected || walletAddress) {
        try {
          const fetchedTokensBalance = await fetch("/api/getTokensBalance", {
            method: "POST",
            body: JSON.stringify({
              address: walletAddress ? walletAddress : address,
              chain,
            }),
          }).then((res) => res.json());
          setTokensBalance(fetchedTokensBalance);
        } catch (e) {
          console.log(e);
        }
      }

      setIsloading(false);
    };

    getNFTs();
  }, []);

  useEffect(() => {
    if (!propAddress?.length && address) setPropAddress(address);
  }, [address]);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.token_panel_container}>
      <div className={styles.token_box}>
        <h2>
          {isDisconnected && walletAddress?.length
            ? `${walletAddress.slice(0, 6)}...${walletAddress.contract.slice(
                38
              )} `
            : `${propAddress?.slice(0, 6)}...${propAddress?.slice(38)}`}
        </h2>

        <div className={styles.tokens_container}>
          {tokensBalance?.length &&
            tokensBalance.map((token) => {
              return (
                <div key={token.symbol} className={styles.token}>
                  <div className={styles.token_name_container}>
                    <div className={styles.image_container}>
                      <img
                        src={
                          token.logo
                            ? token.logo
                            : "http://via.placeholder.com/50"
                        }
                      ></img>
                    </div>
                    <p className={styles.token_name}>{token.name}</p>
                  </div>

                  <div className={styles.info_container}>
                    <div className={styles.token_name_sybol_container}>
                      <p className={styles.token_balance}>{token.balance}</p>
                      <p className={styles.token_symbol}>{token.symbol}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
