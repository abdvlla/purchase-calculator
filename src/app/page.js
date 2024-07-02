"use client";

import { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

let nextId = 0;
let uniqueId = 500;

export default function Home() {
  const [purchases, setPurchases] = useState([]);
  const [purchase, setPurchase] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState(0);

  const [funds, setFunds] = useState(0);
  const [wage, setWage] = useState(0);

  const [expense, setExpense] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [calculatedPurchases, setCalculatedPurchases] = useState([]);

  function handlePurchases() {
    setPurchases([
      ...purchases,
      {
        id: nextId++,
        purchase: purchase,
        purchaseAmount: parseFloat(purchaseAmount),
      },
    ]);
    setPurchase("");
    setPurchaseAmount(0);
  }

  function handleExpenses() {
    setExpenses([
      ...expenses,
      {
        id: uniqueId++,
        expense: expense,
        expenseAmount: parseFloat(expenseAmount),
      },
    ]);
    setExpense("");
    setExpenseAmount(0);
  }

  function handleResetBalance() {
    setFunds(0);
    setWage(0);
  }

  const deleteExpense = (id) => {
    setExpenses((oldValues) =>
      oldValues.filter((expense) => expense.id !== id)
    );
  };

  const deletePurchase = (id) => {
    setPurchases((oldValues) =>
      oldValues.filter((purchase) => purchase.id !== id)
    );
  };

  useEffect(() => {
    const total = expenses.reduce(
      (sum, expense) => sum + expense.expenseAmount,
      0
    );
    setTotalExpenses(total);

    const savings = wage - total;
    const updatedPurchases = purchases.map((purchase) => {
      const monthsToSave = purchase.purchaseAmount / savings;
      const daysToSave = Math.ceil(monthsToSave * 30);
      return { ...purchase, daysToSave };
    });

    setCalculatedPurchases(updatedPurchases);

    const totalPurchaseAmount = purchases.reduce(
      (sum, purchase) => sum + purchase.purchaseAmount,
      0
    );
    setTotalPurchases(totalPurchaseAmount);
  }, [expenses, wage, purchases]);

  return (
    <>
      <div className="flex flex-row items-start justify-center h-screen space-x-8 mt-8">
        <div>
          <h2>Account Balance Calculator</h2>
          <form className="bg-gray-400 rounded-lg p-6">
            <div className="grid grid-cols-1 gap-3">
              <Input
                type="number"
                placeholder="0.00"
                label="Current funds"
                labelPlacement={"outside"}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                value={funds}
                isRequired={"true"}
                onChange={(e) => setFunds(parseFloat(e.target.value))}
                min={0}
              />
              <Input
                type="number"
                label="Monthly wage"
                placeholder="0.00"
                labelPlacement={"outside"}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                value={wage}
                onChange={(e) => setWage(parseFloat(e.target.value))}
                isRequired={"true"}
                min={0}
              />
            </div>
            <Button
              onClick={handleResetBalance}
              color="warning"
              variant="shadow"
              radius="full"
              className="mt-3"
            >
              Reset
            </Button>
          </form>
          <table className="table-auto text-sm mx-auto mt-6">
            <thead className="gap-2">
              <tr className="border-b">
                <th className="px-6">Current Funds</th>
                <th className="px-6">Monthly Wage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6">${funds}</td>
                <td className="px-6">${wage}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>Expense Calculator</h2>
          <form className="bg-gray-400 rounded-lg p-6">
            <div className="grid grid-cols-1 gap-3">
              <Input
                type="text"
                label="Expense"
                placeholder="Name of expense"
                labelPlacement={"outside"}
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                isRequired={"true"}
              />
              <Input
                type="number"
                label="Amount"
                placeholder="0.00"
                labelPlacement={"outside"}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(parseFloat(e.target.value))}
                isRequired={"true"}
                min={0}
              />
            </div>
            <Button
              onClick={handleExpenses}
              color="primary"
              variant="shadow"
              radius="full"
              className="mt-3"
            >
              Add
            </Button>
          </form>
          <table className="table-auto text-sm mx-auto mt-6">
            <thead className="gap-2">
              <tr className="border-b">
                <th className="px-6">Expense</th>
                <th className="px-6">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b">
                  <td className="px-6">{expense.expense}</td>
                  <td className="px-6">${expense.expenseAmount}</td>
                  <td className="px-6 py-1">
                    <Button onClick={() => deleteExpense(expense.id)} size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-6">Total Expenses</td>
                <td className="px-6">${totalExpenses}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>Future Purchases</h2>
          <form className="bg-gray-400 rounded-lg p-6">
            <div className="grid grid-cols-1 gap-3">
              <Input
                type="text"
                label="Purchase"
                placeholder="Name of purchase"
                labelPlacement={"outside"}
                value={purchase}
                onChange={(e) => setPurchase(e.target.value)}
                isRequired={"true"}
              />
              <Input
                type="number"
                label="Price"
                placeholder="0.00"
                labelPlacement={"outside"}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(parseFloat(e.target.value))}
                isRequired={"true"}
                min={0}
              />
            </div>
            <Button
              onClick={handlePurchases}
              color="primary"
              variant="shadow"
              radius="full"
              className="mt-3"
            >
              Add
            </Button>
          </form>
          <table className="table-auto text-sm mx-auto mt-6">
            <thead className="gap-2">
              <tr className="border-b">
                <th className="px-6">Purchase</th>
                <th className="px-6">Price</th>
                <th className="px-6">Days to save</th>
              </tr>
            </thead>
            <tbody>
              {calculatedPurchases.map((purchase) => (
                <tr key={purchase.id} className="border-b">
                  <td className="px-6">{purchase.purchase}</td>
                  <td className="px-6">${purchase.purchaseAmount}</td>
                  <td className="px-6">{purchase.daysToSave}</td>
                  <td className="px-6 py-1">
                    <Button
                      onClick={() => deletePurchase(purchase.id)}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-6">Total Purchases</td>
                <td className="px-6">${totalPurchases}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
