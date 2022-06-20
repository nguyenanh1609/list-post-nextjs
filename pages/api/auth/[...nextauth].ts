import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId:
    //     "222502534019-2dhd23sqg33slrq05c6u5mejmttqkdpg.apps.googleusercontent.com",
    //   clientSecret: "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",
    // }),
    GithubProvider({
      clientId: "5fb8df49e4d9aa08559a",
      clientSecret: "0045875efd00da3906ec4e9360008d16d287df19",
    }),
  ],
});
