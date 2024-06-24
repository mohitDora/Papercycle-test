"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Navlink2 = ({ href, children }) => {
  const pathName = usePathname();
  
  const isActive = pathName === href;
  return (
    <Link href={href} className={isActive ? 'underline underline-offset-8 text-secondary' : 'text-black hover:bg-gray-200'}>

  
        {children}
     
    </Link>
  );
};

export default Navlink2;
