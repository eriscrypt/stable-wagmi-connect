import { useConnect } from 'wagmi';
import { Connector, disconnect as wagmiDisconnect } from '@wagmi/core';
import { config as wagmiConfig } from '@/config/wagmi';

export const useWagmiConnector = () => {
    const { connect: wagmiConnect, connectors } = useConnect();

    const connect = (connector: Connector) => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            // In mobile need to call 'connect' from 'wagmi' object
            wagmiConnect({ connector });
        } else {
            // In desktop need to call 'connect' from 'connector' object directly
            connector.connect();
        }
    };

    const disconnect = () => {
        wagmiDisconnect(wagmiConfig);
    };

    return { connect, disconnect, connectors };
};
