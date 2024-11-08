'use client';

import { useAccount } from 'wagmi';
import { useWagmiConnector } from '@/hooks/useWagmiConnector';
import styles from './page.module.css';

export enum NetworkProviders {
    INJECTED = 'injected',
}

const SupportedConnectors = [NetworkProviders.INJECTED];

export default function Home() {
    const { address, isConnected } = useAccount();
    const { connect, disconnect, connectors } = useWagmiConnector();

    const supportedConnectors = connectors.filter((connector) => SupportedConnectors.includes(connector.id as NetworkProviders));

    const handleConnect = () => {
        connect(supportedConnectors[0]);
    };

    const handleDisconnect = () => {
        disconnect();
    };

    return (
        <div className={styles.page}>
            <h1>Wagmi Connector Example</h1>

            {isConnected && <p>Address: {address}</p>}
            <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
            <p>Connectors: {supportedConnectors.map((connector) => connector.name).join(', ')}</p>

            <div className={styles.flex}>
                <button className={styles.button} disabled={isConnected} onClick={handleConnect}>
                    Connect
                </button>
                <button className={styles.button} disabled={!isConnected} onClick={handleDisconnect}>
                    Disconnect
                </button>
            </div>
        </div>
    );
}
