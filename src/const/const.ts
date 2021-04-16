export const TESTNET_PATH =
	"https://apps.polkadomain.com/?rpc=wss%3A%2F%2Ftestnet-rpc.polkadomain.com#/explorer";
export const MEDIUM_PATH = "https://medium.com/@polkadomain";
export const GITHUB_PATH = "https://github.com/polka-domain";
export const TELEGRAM_PATH = "https://t.me/PolkaDomain";
export const TWITTER_PATH = "https://twitter.com/polkadomain";
export const WHITELIST_PATH = "/whitelist";
export const TOKENS_PATH = "/tokens";
export const AIRDROP_PATH = "/airdrop";

export const LOTTERY_INFO_PATH = "https://medium.com/@polkadomain";
export const URL_DOMAIN = "https://polkadomain.org/whitelist";
export const LOTTERY_SHARE_PATH = `https://twitter.com/intent/tweet?text=Just joined @polkadomain's lottery, CAN'T WAIT TO WIN MY $NAME 🤞🤞🤞&url=${encodeURIComponent(
	URL_DOMAIN
)}`;

export const SOCIAL = {
	Github: GITHUB_PATH,
	Twitter: TWITTER_PATH,
	Telegram: TELEGRAM_PATH,
	Medium: MEDIUM_PATH,
};

export const reCAPTCHA_site_key = "6LeEiqMaAAAAALZICdpKk-1_kmdOZKapkwXTGdh9";
// Rinkeby address
export const TESTED_FIXED_SWAP_ADDRESS = "0x3f1091Cc60c83C208db4A660aB4804bB684E988A";
export const MAINNET_FIXED_SWAP_ADDRESS = "0x513dE4c0E3E5acc65176fF0d264ea30609485df5";
export const DEFAULT_AUCTION_INDEX = 0;

export const TESTED_AIRDROP_ADDRESS = "0x11324a45AAae766D77377e74ADd50A06F6810cb8";
export const MAINNET_AIRDROP_ADDRESS = "0x1f023A6b25dD1729F69C001Bef2c0cd7Dc354124";

export const PROVIDER_POLLING_INTERVAL = 12000;
const RPC_URLS = {
	1: "https://eth-mainnet.alchemyapi.io/v2/JM8nesyHFYIHF6vWjCORATB9NUpCsXVH",
	4: "https://eth-rinkeby.alchemyapi.io/v2/BOMvDIMuDKSqyJ6eGwOXRbUEVwtmP2yK",
};
export const RPC_URL = RPC_URLS[1];

export const NAME = "NAME";

export const HEADER_LINKS = {
	Whitelist: WHITELIST_PATH,
	Tokens: TOKENS_PATH,
	Airdrop: AIRDROP_PATH,
	Docs: "/Flowchart Polkadomain.pdf",
	Social: SOCIAL,
	Testnet: TESTNET_PATH,
};

export const MOBILE_HEADER_LINKS = {
	Whitelist: WHITELIST_PATH,
	Tokens: TOKENS_PATH,
	Airdrop: AIRDROP_PATH,
	Docs: "/Flowchart Polkadomain.pdf",
	Testnet: TESTNET_PATH,
};
