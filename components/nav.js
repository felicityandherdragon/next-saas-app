import Link from 'next/link'
import { useUser } from '../context/user';

const Nav = () => {
  const { user } = useUser();

  return (
    <nav>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/pricing'>
        <a>Pricing</a>
      </Link>
      <Link href={user ? '/logout' : '/login'}>
        <a>{user ? 'Logout' : 'Login' }</a>
      </Link>
    </nav>
  );
};


export default Nav;
