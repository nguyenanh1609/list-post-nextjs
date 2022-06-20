import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "222502534019-2dhd23sqg33slrq05c6u5mejmttqkdpg.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // GithubProvider({
    //   clientId: "26c9eccbf8ca43fdd0e8",
    //   clientSecret: "6859a68471835d5c8dc1a48ea27c06a997c3d5cc",
    // }),
  ],
});
