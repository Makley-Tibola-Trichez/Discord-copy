import Image from 'next/image';
import SVGBackgroundLogin from '../../../public/svgs/login-screen.svg';
import { Dialog } from '../../components/dialog/dialog';

export default function Login() {
  return (
    <main className="bg-login-background h-screen w-screen">
        <Dialog />
    </main>
  );
}
