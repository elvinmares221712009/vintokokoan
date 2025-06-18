import LoginForm from '@/app/ui/login-form';
import { kanit } from '@/app/ui/fonts';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-900">
      <div className="flex flex-col items-center p-8 rounded-lg shadow-lg bg-white md:w-[400px]">
        <div className="flex items-center justify-center mb-8">
          <Image src="/vape-logobaru.jpg" width={80} height={80} alt="Logo" />
          <h1 className={`${kanit.className} text-3xl font-bold text-gray-900 ml-2 md:text-4xl`}>
            Welcome to Toko kokoan
          </h1>
        </div>
        <LoginForm />
        <p className="text-xs text-gray-700 mt-4 text-center">
          Don't have an account?{' '}
          <a href="#" className="text-purple-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </main>
  );
}
