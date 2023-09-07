"use client";

import { useAtomValue } from "jotai";

import Header from "./_components/header";

import { userAtom } from "@/globalState/user";
import AuthProvider from "@/provider/authProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAtomValue(userAtom);
  return (
    <AuthProvider>
      {user && (
        <>
          <Header />
          <main>{children}</main>
        </>
      )}
    </AuthProvider>
  );
}
