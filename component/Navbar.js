import Link from "next/link";
import styles from "../styles/Home.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.links}>
        <li className={styles.navlink}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/contact">Contact</Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/products">Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
