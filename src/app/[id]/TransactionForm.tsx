"use client";
import InputField from "@/components/InputField/InputField";
import { useState } from "react";
import "./TransactionForm.css";
import Image from "next/image";

type TransactionFormProps = {
  onTransaction: (value: number) => void;
} & React.HTMLAttributes<HTMLFormElement>;

type FormObject = {
  [key: string]: number | string;
};

const defaultForm: FormObject = {
  amount: 0,
  transactionKind: "deposit",
};

export default function TransactionForm({
  onTransaction,
  ...props
}: TransactionFormProps) {
  const [form, setForm] = useState(defaultForm);

  const handleFormFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      {...props}
      onSubmit={(event) => {
        event.preventDefault();
        const formObject = form as FormObject;
        const value =
          (formObject.amount as number) *
          (formObject.transactionKind === "withdraw" ? -1 : 1);
        onTransaction(value);
      }}
    >
      <h2 className="lg-text bold-font">Realizar Transacción</h2>
      <InputField
        label="Monto"
        name="amount"
        onChange={handleFormFieldChange}
        type="number"
        defaultValue={0}
      />

      <fieldset>
        <label id="deposit-card" className="card">
          <Image src={"/deposit.svg"} alt="" width={20} height={20} />
          <span>Depósito</span>
          <input
            type="radio"
            name="transactionKind"
            onChange={handleFormFieldChange}
            defaultChecked={defaultForm.transactionKind === "deposit"}
            value="deposit"
          />
        </label>
        <label id="withdraw-card" className="card">
          <Image src={"/withdraw.svg"} alt="" width={20} height={20} />
          <span>Retiro</span>
          <input
            type="radio"
            name="transactionKind"
            onChange={handleFormFieldChange}
            defaultChecked={defaultForm.transactionKind === "withdraw"}
            value="withdraw"
          />
        </label>
      </fieldset>

      <button className="btn pill primary"> Transferir</button>
    </form>
  );
}
