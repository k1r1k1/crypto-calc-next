"use client"

import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'About',
    path: '/about'
  }
]

const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">
        <Image priority={false} src="/bootstrap-logo.svg" alt="Logo" width={30} height={24} className="d-inline-block align-text-top mx-1" />
        Bootstrap
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {navigation.map((item, index) => (
            <li key={`$nav-item-${index}`} className="nav-item">
              <a className={`nav-link ${pathname === item.path ? 'active' : null}`} aria-current="page" href={item.path}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </nav>
  );
}
  
export default Nav
  