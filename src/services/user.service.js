import { ApiService } from "./api.service";

export class UserService {
    static async getUserVault() {
        let userIdentifier = localStorage.getItem("userVaultIdentifier");
        let wallets;

        console.log("Identifier:", userIdentifier);

        if (!userIdentifier) {
            const { newVaultId } = await this.saveUserVault();
            localStorage.setItem("userVaultIdentifier", newVaultId);
            wallets = [];
        } else {
            wallets = await this.getUserWallets(userIdentifier);
        }

        return wallets;
    }

    static async saveUserVault() {
        try {
            return await ApiService.callBackend("GET", "vaults");
        } catch (err) {}
    }

    static async saveUserWallet(walletData) {
        try {
            return await ApiService.callBackend("POST", "wallets", walletData);
        } catch (err) {}
    }

    static async updateUserWallet(walletUpdatesData) {
        try {
            return await ApiService.callBackend(
                "PUT",
                "wallets",
                walletUpdatesData
            );
        } catch (err) {}
    }

    static async removeUserWallet(docId, vaultID) {
        try {
            return await ApiService.callBackend(
                "DELETE",
                `wallets/${docId}/${vaultID}`
            );
        } catch (err) {}
    }

    static async getUserWallets(vaultId) {
        return await ApiService.callBackend("GET", `wallets/${vaultId}`);
    }
}
