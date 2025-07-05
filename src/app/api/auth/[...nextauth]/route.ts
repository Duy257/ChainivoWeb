import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: {label: 'Phone', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        // Thêm logic xác thực của bạn ở đây.
        // Ví dụ: gọi API để kiểm tra phone và password.
        // const res = await fetch('/your/api/login', {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { 'Content-Type': 'application/json' },
        // });
        // const user = await res.json();

        // Để minh họa, tôi sẽ trả về một user giả lập nếu thông tin đăng nhập hợp lệ.
        if (
          credentials?.phone === '0123456789' &&
          credentials?.password === 'password'
        ) {
          // Bất kỳ đối tượng nào được trả về sẽ được lưu trong `user` của JWT.
          return {id: '1', name: 'Test User', phone: '0123456789'};
        }

        // Trả về null nếu thông tin đăng nhập không hợp lệ.
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({token, user}) {
      // Khi đăng nhập thành công, `user` object sẽ được truyền vào đây.
      // Thêm các thuộc tính của user vào token.
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({session, token}) {
      // Gửi các thuộc tính từ token đến session phía client.
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
});

export {handler as GET, handler as POST};
