import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

declare module "next-auth" {
  interface JWT {
    roles?: string[];
    accessToken?: string;
    id?: string;
  }

  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles?: string[];
    };
  }

  interface Profile {
    "https://myapp.example.com/roles"?: string[] | string;
    [key: string]: unknown;
  }
}

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      authorization: {
        params: {
          prompt: "login",
          audience: process.env.AUTH0_AUDIENCE,
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;

        const roles = profile?.["https://myapp.example.com/roles"];
        if (roles) {
          token.roles = Array.isArray(roles) ? roles : [roles];
        }
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken:
          typeof token.accessToken === "string" ? token.accessToken : undefined,
        user: {
          ...session.user,
          id: typeof token.id === "string" ? token.id : undefined,
          roles: token.roles ?? [],
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
