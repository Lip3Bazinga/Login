import Link from "next/link"
import SigInButton from "./SigInButton"


const Header = () => {
  return (
    <header className="fixed w-screen flex align-center gap-4 p-4 text-black bg-gradient-to-b from-white to-gray-200 shadow">
      <Link href={"/"} className="  transition-colors hover:text-blue-500">
        Home
      </Link>
      <SigInButton />
    </header>
  )
}

export default Header
