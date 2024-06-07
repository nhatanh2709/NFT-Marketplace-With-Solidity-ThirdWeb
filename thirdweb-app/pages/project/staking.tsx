import HeroCard from "../../components/hero-card";
import styles from '../../styles/Home.module.css'
import { Web3Button, toEther, useAddress, useContract, useContractMetadata, useContractRead, useOwnedNFTs, useTokenBalance } from "@thirdweb-dev/react";
import { ERC20_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../../constants/addresses";
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import StakeNFTCard from "../../components/stake-nft-card";
import StakedNFTCard from "../../components/staked-nft-card";
export default function StakingProject () {
    const address = useAddress();
    const [claimbleRewards , setClaimbleRewards] = useState<BigNumber>();

    const {
        contract : stakingContract
    } = useContract(STAKING_CONTRACT_ADDRESS);

    const {
        contract : ERC20Contract
    } = useContract(ERC20_CONTRACT_ADDRESS);

    const {
        contract: ERC721Contract
    } = useContract(ERC721_CONTRACT_ADDRESS)

    const {
        data: stakingContractMetadata,
        isLoading: stakingContractMetadataIsLoading,
    } = useContractMetadata(stakingContract);

    const {
        data: tokenBalance,
        isLoading: tokenBalanceIsLoading,
    } = useTokenBalance(ERC20Contract, address);

    const {
        data: ownedERC721NFTs,
        isLoading: ownedERC721NFTsIsLoading,
    } = useOwnedNFTs(ERC721Contract, address);

    const {
        data: stakedERC721Tokens,
        isLoading: isStakedERC721TokensLoading
    } = useContractRead(
        stakingContract,
        "getStakeInfo",
        [address]
    )

    useEffect(() => {
        if(!stakingContract || !address) return ;

        async function getClaimbleRewards() {
            const claimbleRewards = await stakingContract?.call(
                "getStakeInfo",
                [address]
            );
            setClaimbleRewards(claimbleRewards[1]);
        }
        getClaimbleRewards();
    }, [address, stakingContract]);

    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard
                    isLoading={stakingContractMetadataIsLoading}
                    title={stakingContractMetadata?.name!}
                    description={stakingContractMetadata?.description!}
                    image={stakingContractMetadata?.image!}
                />
                <div className={styles.grid}>
                    <div className={styles.componentCard}>
                        <h3>Rewards</h3>
                        {tokenBalanceIsLoading? (
                            <p>Loading balance...</p>
                        ) : (
                            <p>Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                        )}
                        {claimbleRewards && (
                            <p>Reward balance: {ethers.utils.formatEther(claimbleRewards!)}</p>
                        )}
                        <Web3Button
                            contractAddress={STAKING_CONTRACT_ADDRESS}
                            action={(contract) => contract.call("claimRewards")}
                            onSuccess={() => {
                                alert("Rewards claimed!");
                                setClaimbleRewards(ethers.constants.Zero);
                            }}
                            isDisabled={!claimbleRewards || claimbleRewards.isZero()}
                        >
                            Claim Rewards
                        </Web3Button>
                    </div>
                    <div className={styles.componentCard}>
                        <h3>Unstaked</h3>
                        {ownedERC721NFTsIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            ownedERC721NFTs && ownedERC721NFTs.length > 0 ? (
                                    ownedERC721NFTs.map((nft) => (
                                        <div key={nft.metadata.id} className={styles.nftGrid}>
                                            <StakeNFTCard
                                                nft={nft}
                                            />
                                        </div>
                                    ))
                            ) : (
                                <p>No NFTs owned </p>
                            )
                        )}
                    </div>
                    <div className={styles.componentCard}>
                        <h3>Staked</h3>
                        {isStakedERC721TokensLoading ? (
                            <p>Loading...</p>
                        ): (
                            stakedERC721Tokens && stakedERC721Tokens.length > 0 ? (
                                stakedERC721Tokens[0].map((stakeNFT: BigNumber, index: number) => (
                                    <div key={index} className={styles.nftGrid}>
                                        <StakedNFTCard 
                                            tokenId={stakeNFT.toNumber()}
                                        />
                                        
                                    </div>
                                ))
                            ) : (
                                <p>No NFTs staked</p>                                
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}