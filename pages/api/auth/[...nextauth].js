import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import initDB from "@/utils/db";

initDB();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;
        // login
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid credentials: no user!");
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          throw new Error("Invalid credentials: incorrect password!");
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Persist Oauth access_token to token right after signin
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id.toString(); // Convert ObjectID to string
      }
      return token;
    },
    // Send properties to the client, like an access_token from a provider
    async session({ session, token }) {
      session.userId = token.sub;
      if (token?.id) {
        session.user = { id: token.id, name: token.name, email: token.email };
      }
      return session;
    },
  },
}

export default NextAuth(authOptions);