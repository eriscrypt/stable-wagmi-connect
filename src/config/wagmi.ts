import { createConfig, createConnector, http } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { mainnet } from 'viem/chains';

const injectedWithFallback = () => {
    return createConnector((config) => {
        const injectedConnector = injected()(config);

        return {
            ...injectedConnector,
            connect(...params) {
                if (window && !window.ethereum) {
                    window.open('https://metamask.io/', 'inst_metamask');
                }
                return injectedConnector.connect(...params);
            },
            get name() {
                return 'Injected';
            },
            // you can also override icon getter
            // get icon() {
            //     return 'https://example.com/icon.png';
            // },
        };
    });
};

export const config = createConfig({
    ssr: true,
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(),
    },
    connectors: [injectedWithFallback()],
});
