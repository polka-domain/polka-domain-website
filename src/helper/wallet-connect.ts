import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export const walletConnect = (): Promise<{ accounts: string[]; connector: WalletConnect }> =>
	new Promise((resolve, reject) => {
		const connector = new WalletConnect({
			bridge: "https://bridge.walletconnect.org",
			qrcodeModal: QRCodeModal,
		});

		if (!connector.connected) {
			connector.createSession().then(console.log, console.error);
		}

		connector.on("disconnect", (error, payload) => {
			console.log("wallet disconnected");
			reject(error);
		});

		connector.on("modal_closed", () => {
			reject("modal-close");
		});

		connector.on("connect", (error, payload) => {
			console.log("wallet connected");
			if (error) {
				reject(error);
			}

			const { accounts } = payload.params[0];
			resolve({
				accounts,
				connector,
			});
		});
	});
