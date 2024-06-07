import { Web3Button, useAddress, useContract, useContractMetadata, useTokenBalance, useTokenSupply } from '@thirdweb-dev/react'
import HeroCard from '../../components/hero-card'
import styles from '../../styles/Home.module.css'
import { ERC20_CONTRACT_ADDRESS } from '../../constants/addresses'
import Link from 'next/link';

export default function ERC20Project() {
    const address = useAddress();

    const {
        contract
    } = useContract(ERC20_CONTRACT_ADDRESS);

    const {
        data: contractMetadata,
        isLoading: contractMetadataIsLoading,

    } = useContractMetadata(contract);

    const {
        data: tokenSupply,
        isLoading: tokenSupplyIsLoading,
    } = useTokenSupply(contract);

    const {
        data: tokenBalance,
        isLoading:tokenBalanceIsLoading,
    } = useTokenBalance(contract, address);
    return (
        <div className={styles.container}>
            <HeroCard
            isLoading={contractMetadataIsLoading}
            title={contractMetadata?.name!}
            description={contractMetadata?.description!}
            image={contractMetadata?.image!}
            />

            <div className={styles.grid}>
                <div className={styles.componentCard}>
                    <h3>Token Stats</h3>
                    {tokenSupplyIsLoading ? (
                        <p>Total supply...</p>
                    ) : (
                        <p>Total supply: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
                    )
                    }

                </div>
                <div className={styles.componentCard}>
                    <h3>Token Balance</h3>
                    {tokenBalanceIsLoading ? (
                        <p>Loading balance...</p>
                    ) : (
                        <p>Balance {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                    )
                    }
                    <Web3Button
                    contractAddress={ERC20_CONTRACT_ADDRESS}
                    action={(contract) => contract.erc20.burn(10)}
                    >
                        Burn 10 Tokens
                    </Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3>Earn Token</h3>
                    <p>Earn more tokens by staking an ERC721 NFT</p>
                    <div>
                        <Link href='/project/staking'>
                            <button className={styles.matchButton}>Stake ERC721</button>
                        </Link>
                        <Link href='/project/erc721'>
                            <button className={styles.matchButton}>Claim ERC721</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}