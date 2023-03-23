import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentailProvder from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentailProvder({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "SaarDOO" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (
          credentials?.username === "Test" &&
          credentials?.password === "test"
        )
          if (
            credentials?.username === "Samayara Srivastava" &&
            credentials?.password === "amongus6969"
          ) {
            return {
              id: 2,
              name: "Samayara Srivastava",
              email: "srivastavasamayara30@gmail.com",
              image:
                "https://cdn.sanity.io/images/mrfd4see/production/5db389be209c96202064cddba475d2eed0a3f287-606x723.jpg",
            };
          }

        if (
          credentials?.username === "SaarDOO" &&
          credentials?.password === "SaarDOO"
        ) {
          return {
            id: 4,
            name: "SaarDOO ",
            email: "astrosaard@gmail.com",
            image:
              "https://i.scdn.co/image/ab6775700000ee85617839eb4593623cc34f554e",
          };
        }
        return null;
      },
    }),
  ],
});
