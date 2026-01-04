export function updateSolde(amount, user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount > 0) {
        user.balance += amount;
        resolve(user);
      } else {
        reject("Montant invalide");
      }
    }, 300);
  });
}

export function addTransactions(type, description, amount, user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const date = new Date().toLocaleDateString();
      user.transactions.unshift({ date, description, type, montant: amount });
      resolve(user);
    }, 300);
  });
}
export async function recharger(amount, user, description = "Recharge") {
  if (amount <= 0) throw "Montant incorrect";

  // mise à jour solde
  await updateSolde(amount, user);

  // ajout transaction avec description dynamique
  await addTransactions("+", description, amount, user);

  return user;
}