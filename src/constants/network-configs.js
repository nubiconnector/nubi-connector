const supportedETHChains = {
    Polygon: 137,
    Mumbai: 80001,
    Mainnet: 1,
    Goerli: 5,
    Aurora: 1313161554,
    AuroraTestnet: 1313161555,
    // Avalanche ?
};

export const BLOCKCHAINS = {
    NEAR: "NEAR",
    ETH: "Ethereum",
    // AUR: "Aurora",
    // PLG: "Polygon",
    // SOL: "Solana"
};

export const NEAR_NETWORKS = {
    Testnet: "testnet",
    Mainnet: "mainnet",
};

export const ETH_NETWORKS = {
    [supportedETHChains.Mumbai]: "Mumbai Testnet",
    [supportedETHChains.Polygon]: "Polygon",
    [supportedETHChains.Mainnet]: "Mainnet",
    [supportedETHChains.Goerli]: "Goerli Testnet",
    [supportedETHChains.Aurora]: "Aurora",
    [supportedETHChains.AuroraTestnet]: "Aurora Testnet",
};

export const ETH_NETWORKS_COINGEKO_TOKENS = {
    [supportedETHChains.Polygon]: 'polygon-pos',
    [supportedETHChains.Mainnet]: 'ethereum',
    [supportedETHChains.Aurora]: 'aurora',
    [supportedETHChains.Mumbai]: 'mumbai',
    [supportedETHChains.Goerli]: 'goerli',
    [supportedETHChains.AuroraTestnet]: 'aurora-testnet'
};

export const ETH_NETWORKS_NATIVE_TOKENS = {
    [supportedETHChains.Goerli]: "ETH",
    [supportedETHChains.Mainnet]: "ETH",
    [supportedETHChains.Mumbai]: "MATIC",
    [supportedETHChains.Polygon]: "MATIC",
    [supportedETHChains.Aurora]: "USN",
    [supportedETHChains.AuroraTestnet]: "USN",
};

export const ETH_NETWORKS_NATIVE_TOKENS_TO_PROTOCOLS = {
    [ETH_NETWORKS[supportedETHChains.Mumbai]]: "MATIC",
    [ETH_NETWORKS[supportedETHChains.Polygon]]: "MATIC",
    [ETH_NETWORKS[supportedETHChains.Mainnet]]: "ETH",
    [ETH_NETWORKS[supportedETHChains.Goerli]]: "ETH",
    [ETH_NETWORKS[supportedETHChains.Aurora]]: "AURORA",
    [ETH_NETWORKS[supportedETHChains.AuroraTestnet]]: "AURORA",
    [NEAR_NETWORKS.Mainnet]: "NEAR",
    [NEAR_NETWORKS.Testnet]: "NEAR",
};

export const ETH_TOKEN_ADDRESSES = {
    [supportedETHChains.Mumbai]: {
        DAI: "0x5A01Ea01Ba9A8DC2B066714A65E61a78838B1b9e",
        USDC: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
        USDT: "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832",
        LINK_2: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        DUMMY_ERC20: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
        WETH: "0x59dF7DEaEb713F3bb35bA2170559d404425fE351"
    },
    [supportedETHChains.Goerli]: {
        DAI: "0x73967c6a0904aA032C103b4104747E88c566B1A2",
        USDC: "0x509Ee0d083DdF8AC028f2a56731412edD63223B9",
        USDT: "0xC51FceEc013cD34aE2e95E6D64E9858F2aC28fFf",
        LINK_2: "0xE4e0EB46c269B11067031b6F4B7b658E5dAE1B7b"
    },
    [supportedETHChains.AuroraTestnet]: {
        USDC: "0x3a034FE373B6304f98b7A24A3F21C958946d4075",
        USDT: "0x8547A073cbc7D4aF48aD061b9D005C06D55337F5",
        DAI: "0xE68104D83e647b7c1C15a91a8D8aAD21a51B3B3E",
        LINK_2: "0x6715713831724679e0fEd5B63Fa4CDe8f73D2d76",
        DOT: "0x454b0E9D64531fA616a0327b1dbc64700B583428",
        LTC: "0x71931aF56f502Ab2881d5Adbb5e77bB9f4365076",
        CAKE: "0x9ee9238a68273AEE09EdaE5FA761C04766107579",
        AAVE: "0x5010abCF8A1fbE56c096DCE9Bb2D29d63e141361",
        YFI: "0xd65BfBA8bD3A3254Ce96792456FA334b78bdEC98"
    },
};

export const NEAR_CONTRACTS = {
    [NEAR_NETWORKS.Testnet]: {
        T7T: "t7t.testnet",
    },
    [NEAR_NETWORKS.Mainnet]: {
        T7T: "t7t.mainnet", // TODO: deploy
    },
};
