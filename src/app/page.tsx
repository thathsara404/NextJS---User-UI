import Link from "next/link";

export default function Home() {
  return (
    <div className="links">
      <ul>
        <li>
          <Link href={'/register'}> <u>Register User</u></Link>
        </li>
        <li>
          <Link href={'/login'}> <u>Login</u></Link>
        </li>
      </ul>
    </div>
  );
}
