import HeroCard from '../../components/hero-card'
import styles from '../../styles/Home.module.css'
import { TIP_JAR_CONTRACT_ADDRESS } from '../../constants/addresses'
import { ethers } from 'ethers'
import { Web3Button, toEther, useAddress, useContract, useContractMetadata, useContractRead } from '@thirdweb-dev/react'
export default function TipJarProject() {
    const address = useAddress();
    const {
        contract
    } = useContract(TIP_JAR_CONTRACT_ADDRESS);

    const {
        data:contractMetadata,
        isLoading: contractMetadataIsLoading,
    } = useContractMetadata(contract);

    const {
        data: tipJarBalance,
        isLoading : tipJarBalanceIsLoading,
    } = useContractRead(
        contract,
        "getBalance",
    );

    const {
        data: owner,
        isLoading: ownerIsLoading,
    } = useContractRead(contract, "owner",);

    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard
                    isLoading={contractMetadataIsLoading}
                    title={contractMetadata?.name!}
                    description={contractMetadata?.description!}
                    image={contractMetadata?.image!}
                />
                <div className={styles.grid}>
                    <div className={styles.componentCard}>
                        <h3>Leave a tip</h3>
                        <p>Tips in Binance and record it on the blockchain</p>
                        <Web3Button
                            contractAddress={TIP_JAR_CONTRACT_ADDRESS}
                            action={(contract) => contract.call(
                                "tip",
                                [],{
                                    value: "1000000000000000"
                                }
                            )}
                        >
                            {`Tip (0.001 BNB)`}
                        </Web3Button>
                    </div>
                    <div className={styles.componentCard}>
                        <h3>Tip Jar balance</h3>
                        <p>Total tips:</p>
                        {tipJarBalanceIsLoading ? "Loading..." : `${ethers.utils.formatEther(tipJarBalance)} BNB`}
                    </div>
                    <div className={styles.componentCard}>
                        <h3>Withdraw Balance</h3>
                        {ownerIsLoading ? "Loading..." : owner === address ? (
                            <Web3Button
                                contractAddress={TIP_JAR_CONTRACT_ADDRESS}
                                action={(contract) => contract.call(
                                    "withdrawTips"
                                )}
                                onSuccess={() => alert("Tips withdrawn!")}
                            >   
                                Withdraw Balance
                            </Web3Button>
                        ) : (
                            <p>Only owner can withdraw  the balance</p>
                        )

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}