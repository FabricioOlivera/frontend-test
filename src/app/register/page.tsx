"use client";
import InputField from "@/components/InputField/InputField";
import Link from "next/link";
import { useState } from "react";
import "./page.css";
import { register } from "@/api/mock/post-register";
import { AccountObject } from "@/api/DataObjects";

type RegisterForm = {
  [key: string]: number | string;
};

const defaultRegister: RegisterForm = {
  name: "",
  lastName: "",
  accountNumber: "",
  initialBalance: 0,
};

export default function Register() {
  //const router = useRouter();
  const [form, setForm] = useState(defaultRegister);

  const handleFormFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await register(
      form as AccountObject,
      form.initialBalance as number
    );
    window.location.href = "/" + res.id;
    //router.push("/" + res.id + "");
  };

  return (
    <main>
      <div className="card">
        <h1>Registrarse</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <fieldset className="user-fieldset">
            <InputField
              label="Nombre"
              required
              minLength={3}
              id="name-field"
              onChange={handleFormFieldChange}
              name="name"
              type="text"
            />

            <InputField
              label="Apellido"
              required
              minLength={3}
              id="lastName-field"
              onChange={handleFormFieldChange}
              name="lastName"
              type="text"
            />
          </fieldset>

          <InputField
            label="Número de cuenta"
            required
            minLength={8}
            id="account-field"
            onChange={handleFormFieldChange}
            name="accountNumber"
            type="text"
          />
          <br />
          <InputField
            className="number-field"
            label="Saldo inicial"
            id="initialBalance-field"
            onChange={handleFormFieldChange}
            name="initialBalance"
            defaultValue={defaultRegister.initialBalance}
            type="number"
          />

          <fieldset className="buttons-fieldset">
            <Link className="btn" href="/">
              Cancelar
            </Link>
            <button className="btn primary" type="submit">
              Registrar
            </button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
