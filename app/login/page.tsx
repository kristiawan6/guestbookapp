import { redirect } from 'next/navigation';

export default function LoginPageRedirect() {
  redirect('/auth/login');
}