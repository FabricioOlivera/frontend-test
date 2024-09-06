"use client";
import "./page.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getBalances } from "@/api/mock/get-balance";
import AnimatedBalanceCounter from "@/components/AnimatedBalanceCounter/AnimatedBalanceCounter";
import { getUser } from "@/api/mock/get-user";
import { AccountObject } from "@/api/DataObjects";
import Image from "next/image";
import InputField from "@/components/InputField/InputField";
import TransactionForm from "./TransactionForm";
import { postTransaction } from "@/api/mock/post-transaction";

export default function Balance() {
  const path = usePathname();
  const userID = useMemo(() => {
    const splittedPath = path.split("/");
    return splittedPath[splittedPath.length - 1];
  }, [path]);

  const [user, setUser] = useState<AccountObject | null>(null);
  const [balanceHistory, setBalanceHistory] = useState<number[]>([]);
  const [state, setState] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [error, setError] = useState({ code: 0, msg: "" });

  const prevBalance = useMemo(() => {
    if (balanceHistory.length > 1) {
      return balanceHistory[balanceHistory.length - 2];
    }
    return 0;
  }, [balanceHistory]);

  const currBalance = useMemo(() => {
    if (balanceHistory.length > 0) {
      return balanceHistory[balanceHistory.length - 1];
    }
    return 0;
  }, [balanceHistory]);

  const statistics = useMemo(() => {
    let lastBalance = 0;
    let income = 0;
    let spent = 0;

    balanceHistory.forEach((value) => {
      const delta = value - lastBalance;
      if (delta >= 0) {
        income += delta;
      } else {
        spent -= delta;
      }
      lastBalance = value;
    });

    return { income, spent };
  }, [balanceHistory]);

  const handleFetch = async () => {
    setState("loading");
    const fetchedUser = await getUser(Number.parseInt(userID));
    const fetchedBalanceHistory = await getBalances(Number.parseInt(userID));

    if (fetchedUser.code === 200) {
      setUser(fetchedUser.user!);
    } else {
      setError({ code: fetchedUser.code, msg: fetchedUser.msg });
      setState("error");
      return;
    }

    if (fetchedBalanceHistory.code === 200) {
      setBalanceHistory(fetchedBalanceHistory.balanceHistory!);
    } else {
      setError({
        code: fetchedBalanceHistory.code,
        msg: fetchedBalanceHistory.msg,
      });
      setState("error");
      return;
    }

    setState("success");
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <main>
      <h1>Balance</h1>

      <dialog open={state === "error"} className="card">
        <h1>Error {error.code}</h1>
        <p>{error.msg}</p>
      </dialog>

      <section
        className={`main-columns ${state !== "success" ? "loading" : ""}`}
      >
        <article id="balance-article" className="card">
          <p className="sm-text">
            Hola <span>{user?.name}</span>.
          </p>

          <p className="sm-text">
            <AnimatedBalanceCounter
              className="xl-text"
              from={prevBalance}
              to={currBalance}
              amount={0.1}
            />
            <br /> es su balance actual.
          </p>
        </article>
        <article id="income-article" className="card content-columns">
          <Image src={"/trending_up.svg"} alt="" width={35} height={35} />

          <p className="sm-text">Ingreso</p>

          <p>
            <AnimatedBalanceCounter
              className="bold-font"
              from={0}
              to={statistics.income}
              amount={0.1}
            />
          </p>
        </article>
        <article id="spent-article" className="card content-columns">
          <Image src={"/trending_down.svg"} alt="" width={35} height={35} />
          <p className="sm-text">Gasto</p>

          <p>
            <AnimatedBalanceCounter
              className="bold-font"
              from={0}
              to={statistics.spent}
              amount={0.1}
            />
          </p>
        </article>

        <TransactionForm
          onTransaction={async (value) => {
            const res = await postTransaction(Number.parseInt(userID), value);
            if (res.code >= 400) {
              alert(JSON.stringify(res));
            }
            handleFetch();
          }}
          className="card"
          id="transaction-form"
        />
      </section>
    </main>
  );
}
