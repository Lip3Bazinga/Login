import { SERVER_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth"
async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(SERVER_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "email",
          placeholder: "emailaddress@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      // async authorize(credentials, req) {
      //   if (!credentials?.email || !credentials?.password) {
      //     throw new Error('Nome de usuário e senha são obrigatórios');
      //   }

      //   const { email, password } = credentials;
      //   try {
      //     const res = await fetch(SERVER_URL + "/auth/login", {
      //       method: "POST",
      //       body: JSON.stringify({
      //         email,
      //         password,
      //       }),
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     });

      //     if (res.status === 401) {
      //       throw new Error('Credenciais inválidas');
      //     }

      //     if (!res.ok) {
      //       throw new Error('Erro ao fazer login');
      //     }

      //     const user = await res.json();
      //     return user;
      //   } catch (error) {
      //     console.error('Erro ao autorizar:', error);
      //     throw error;
      //   }
      // },
      async authorize(credentials, req) {
        // Log de entrada na função
        console.log("[authorize] Iniciando processo de autorização...");

        // Logs para verificar se estamos recebendo as credenciais corretas
        console.log("[authorize] Credenciais recebidas:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("[authorize] Falha: e-mail ou senha não fornecidos.");
          throw new Error("Nome de usuário e senha são obrigatórios");
        }

        const { email, password } = credentials;

        try {
          // Log antes de fazer o fetch
          console.log(`[authorize] Enviando POST para: ${SERVER_URL}/auth/login`);
          console.log("[authorize] Payload:", { email, password });

          const res = await fetch(`${SERVER_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          // Log do status de resposta do servidor
          console.log("[authorize] Status de resposta:", res.status);

          // Checagens do status
          if (res.status === 401) {
            console.log("[authorize] Resposta 401: Credenciais inválidas.");
            throw new Error("Credenciais inválidas");
          }

          if (!res.ok) {
            console.log(`[authorize] Resposta não OK (status ${res.status}): Erro ao fazer login.`);
            throw new Error("Erro ao fazer login");
          }

          // Se chegou aqui, res.ok deve ser 2xx
          const user = await res.json();
          // Log do objeto retornado pela API
          console.log("[authorize] Usuário retornado:", user);
          return user;
        } catch (error) {
          console.error("[authorize] Erro ao autorizar:", error);
          throw error;
        }
      }

    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn)
        return token;

      try {
        return await refreshToken(token);
      } catch (error) {
        console.error('Erro ao atualizar token:', error);
        throw error;
      }
    },

    async session({ token, session }) {
      try {
        session.user = token.user;
        session.backendTokens = token.backendTokens;

        return session;
      } catch (error) {
        console.error('Erro ao criar sessão:', error);
        throw error;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
