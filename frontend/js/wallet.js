async function connectWallet() {
    // 1. Check if the extension is installed
    const freighterStatus = await isConnected();
    if (!freighterStatus.isConnected) {
        alert("Please install the Freighter Wallet extension.");
        return;
    }

    try {
        // 2. Retrieve the public key (prompts user if not already allowed)
        const publicKey = await getPublicKey();
        
        // 3. Store and notify
        localStorage.setItem("wallet", publicKey);
        alert("Wallet connected:\n" + publicKey);
        
        return publicKey;
    } catch (error) {
        console.error("Connection failed:", error);
        alert("User denied connection or an error occurred.");
    }
}
