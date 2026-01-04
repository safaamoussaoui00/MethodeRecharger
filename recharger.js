import { recharger } from "../service/servicerecharger.js";

const btnRecharger = document.getElementById("rechargerBtn");
const amountInput = document.getElementById("amount");
const cardSelect = document.getElementById("cardType");
const balanceElement = document.getElementById("balance"); // si tu veux mettre à jour le dashboard

let user = JSON.parse(sessionStorage.getItem("currentUser"));

btnRecharger.addEventListener("click", handleRecharge);

async function handleRecharge() {
  const montant = Number(amountInput.value);
  const typeCarte = cardSelect.value;

  if (!montant || montant <= 0) {
    alert("Veuillez entrer un montant valide");
    return;
  }

  try {
    const description = `Recharge via ${typeCarte}`;

    
    const updatedUser = await recharger(montant, user, description);
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
    if (balanceElement) balanceElement.textContent = updatedUser.balance + " DH";

    alert(`Rechargement de ${montant} DH via ${typeCarte} réussi !`);
    
    amountInput.value = "";
    cardSelect.value = "Paypal";

  } catch (err) {
    alert(err);
  }
}