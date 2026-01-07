let currentOdds = 0;

function selectMatch(match, odds) {
    document.getElementById("selectedMatch").innerText = match;
    document.getElementById("odds").innerText = odds;
    // Ensure odds are treated as a number for calculation
    currentOdds = parseFloat(odds); 
    
    // Trigger win calculation if a stake is already entered
    calculatePotentialWin();
}

const calculatePotentialWin = () => {
    const stakeInput = document.getElementById("stake");
    const winDisplay = document.getElementById("win");
    
    if (stakeInput && winDisplay) {
        const stake = parseFloat(stakeInput.value);
        winDisplay.innerText = (stake > 0 && currentOdds > 0) 
            ? (stake * currentOdds).toFixed(2) 
            : "0.00";
    }
};

// Add listener with a null check
const stakeElement = document.getElementById("stake");
if (stakeElement) {
    stakeElement.addEventListener("input", calculatePotentialWin);
}

function placeBet() {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) {
        alert("Connect wallet first");
        return;
    }
    
    const stake = document.getElementById("stake").value;
    if (!stake || stake <= 0 || currentOdds === 0) {
        alert("Please select a match and enter a valid stake");
        return;
    }

    alert(`Bet placed on odds ${currentOdds} with ${stake} units!`);
}
