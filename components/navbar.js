import styles from '../styles/Home.module.scss';
import NavbarDropdown from "./dropdown";
import {Button} from "@mui/material";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Button href={"/"} variant="outlined" className={styles.navbarButton}>
                Home
            </Button>
            <NavbarDropdown></NavbarDropdown>
            <Button variant="outlined" href={"/storage/shopping list"} className={styles.navbarButton}>
                Shopping list
            </Button>
        </nav>
    )
}