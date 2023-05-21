import styles from '../styles/Home.module.scss';
import NavbarDropdown from "./dropdown";
import {Button} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Button href={"/"} variant="outlined" className={styles.navbarButton}>
                <HomeIcon></HomeIcon>  Home
            </Button>
            <Button variant="outlined" href={"/storage/shopping list"} className={styles.navbarButton}>
                <ListIcon></ListIcon>  Shopping list
            </Button>

            <NavbarDropdown></NavbarDropdown>
        </nav>
    )
}