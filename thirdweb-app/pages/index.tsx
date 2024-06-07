import { NextPage } from "next";
import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import ContractCard from "../components/contract-card";
import { ERC20_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS,ERC1155_CONTRACT_ADDRESS,STAKING_CONTRACT_ADDRESS,TIP_JAR_CONTRACT_ADDRESS, PROFILE_STATUS_CONTRACT_ADDRESS } from "../constants/addresses";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            My{" "}
            <span className={styles.gradientText0}>
              Contracts
            </span>
          </h1>

          <p className={styles.description}>
            Select a contract to interact with.
          </p>
        </div>

        <div className={styles.grid}>
          <ContractCard
            href="/project/erc20"
            contractAddress={ERC20_CONTRACT_ADDRESS}
            title="ERC-20"
            description="Claim ERC20 Tokens"
          />

          <ContractCard
            href="/project/erc721"
            contractAddress={ERC721_CONTRACT_ADDRESS}
            title="ERC-721"
            description="Claim ERC721 Tokens"
          />

          <ContractCard
            href="/project/erc1155"
            contractAddress={ERC1155_CONTRACT_ADDRESS}
            title="ERC-1155"
            description="Claim ERC1155 Tokens"
          />

          <ContractCard
            href="/project/staking"
            contractAddress={STAKING_CONTRACT_ADDRESS}
            title="Staking"
            description="Stake your ERC721 NFT to earn ERC20"
          />

          <ContractCard
            href="/project/profileStatus"
            contractAddress={PROFILE_STATUS_CONTRACT_ADDRESS}
            title="Profile Status"
            description="Update your profile status on the blockchain"
          />

          <ContractCard
            href="/project/tipJar"
            contractAddress={TIP_JAR_CONTRACT_ADDRESS}
            title="Tip Jar"
            description="Leave a tip on the blockchain"
          />
        </div>
      </div>
    </main>
  )
};

export default Home;
