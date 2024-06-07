import styles from '../styles/Home.module.css';
import Link from 'next/link'
import { ConnectWallet } from '@thirdweb-dev/react';
export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link href="/">
                <p className={styles.gradientText1}
                style={{
                cursor: 'pointer', 
                fontSize: '1.2 rem', 
                fontWeight: 'bold'
                }}  
                >
                    Watase's Portfolio
                </p>
            </Link>
            <ConnectWallet
            btnTitle='Sign in'
            modalTitle='Select sign in method'
            detailsBtn={() => {
                return <p>Profile</p>
            }}
            />
        </div>
    )
}