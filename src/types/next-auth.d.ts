import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      phone?: string;
      accessToken?: string;
      refreshToken?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    phone?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
