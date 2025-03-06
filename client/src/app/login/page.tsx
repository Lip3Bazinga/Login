"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const services = [
  { image: "assets/images/digital-marketing.png", description: "Planejamento & Briefing de Campanhas" },
  { image: "assets/images/settuing.png", description: "Produção de materiais" },
  { image: "assets/images/law.png", description: "Engenharia fiscal" },
  { image: "assets/images/supply-chain.png", description: "Supply Chain trade Marketing" },
  { image: "assets/images/truck.png", description: "Coleta industrial" },
  { image: "assets/images/warehouse.png", description: "Armazenagem nacionais, regionais e virtuais" },
  { image: "assets/images/cross-selling.png", description: "Vendas B2B | B2C | D2C" },
  { image: "assets/images/transportation.png", description: "Entregas multimodais & Last Mile" },
  { image: "assets/images/product-development.png", description: "Ativação em PDV e Positivação" },
  { image: "assets/images/graph.png", description: "Inteligência de Dados" },
  { image: "assets/images/360-degress.png", description: "Gestão completa de todos os serviços" },
  { image: "assets/images/satisfaction.png", description: "Pesquisa NPS" },
];

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (session) {
    return <div>Redirecionando...</div>;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Nome de usuário e senha são obrigatórios");
      return;
    }
    try {
      const result = await signIn("credentials", { redirect: false, email, password });
      if (result === undefined) {
        setLoginError("Erro ao fazer login");
      } else if (result.error) {
        setLoginError(result.error);
      }
    } catch {
      setLoginError("Erro ao fazer login");
    }
  }

  return (
    <div
      className="w-screen min-h-screen bg-cover bg-center flex flex-col lg:flex-row"
      style={{ backgroundImage: "url('/assets/images/background.png')" }}
    >
      <div className="flex-1 min-w-[300px] flex flex-col items-center justify-center p-4">
        <div className="contentLogo mb-4">
          <img src="assets/images/bp-full-shop.png" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[500px] bg-white flex flex-col items-center gap-8 rounded-2xl p-8 mx-auto"
        >
          <h2 className="text-xl text-[#1b1b1b] font-bold relative">
            Já tenho registro
            <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#B0B0B0]" />
          </h2>
          <div className="w-3/4 h-[65px] border-3 border-transparent border-l-3 border-l-blue-500 flex items-center rounded-md bg-gray-100 shadow-md hover:border-blue-500 transition-all duration-300">
            <img src="assets/images/mail-outline.svg" width="30" height="30" className="ml-4 opacity-50" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className="text-black font-semibold outline-none ml-4 border-l-2 border-gray-400 pl-2 bg-transparent w-full"
            />
          </div>
          <div className="w-3/4 h-[65px] border-3 border-transparent border-l-3 border-l-blue-500 flex items-center rounded-md bg-gray-100 shadow-md hover:border-blue-500 transition-all duration-300">
            <img src="assets/images/key-outline.svg" width="30" height="30" className="ml-4 opacity-50" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Senha"
              className="text-black font-semibold outline-none ml-4 border-l-2 border-gray-400 pl-2 bg-transparent w-full"
            />
          </div>
          <div className="w-full flex justify-between px-12">
            <label className="text-sm cursor-pointer">
              <input type="checkbox" className="checkbox" />
              <span className="checkbox-custom text-gray-600 pl-1">Lembrar de mim</span>
            </label>
            <a
              href="/"
              className="text-black text-sm relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#B0B0B0] after:rounded-md"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <button
            type="submit"
            className="w-[150px] h-[50px] bg-[#065484] text-white flex justify-center items-center gap-2 rounded-md cursor-pointer font-bold uppercase transition-all duration-300 hover:scale-110"
          >
            <img src="assets/images/login.svg" width="30" height="30" style={{ filter: "invert(1)" }} />
            Log in
          </button>
          <h3 className="text-[20px] text-[#1b1b1b] font-bold">
            Não tem uma conta?
            <a
              href="/"
              className="pl-1 relative text-[#065484] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-[#B0B0B0]"
            >
              Registre-se
            </a>
          </h3>
          {loginError && <div className="text-[15px] text-red-400 font-semibold">{loginError}</div>}
        </form>
        <div className="contentLogo mt-4">
          <img src="assets/images/bp-full.png" />
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col justify-center items-center text-center px-4 py-8">
        <h2 className="text-3xl text-white">
          Gestão <span>completa</span>:
        </h2>
        <h3 className="text-4xl text-white font-bold uppercase pt-4">
          Indústria | varejo | Distribuidores
        </h3>
        <div className="w-full h-[5px] bg-white mt-10 mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-0">
          {services.map((service, index) => (
            <div key={index} className="rounded-md p-5 text-center text-white font-sans flex flex-col items-center justify-center">
              <img src={service.image} alt="" />
              <p className="mt-4 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="w-full h-[5px] bg-white mt-10" />
      </div>
    </div>
  );
}
