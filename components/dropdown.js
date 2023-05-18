import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from "next/link";
import styles from '../styles/Home.module.scss';

export default function NavbarDropdown() {

    return (
        <div className={styles.inlineBlock}>
            <FormControl>
                <Select className={styles.navbarButton}
                        displayEmpty
                        renderValue={() => {
                            return "Storage"
                        }}
                        inputProps={
                            {
                                'aria-label': 'Without label'
                            }
                        }
                >
                    <MenuItem>
                        <Link href={"/storage/fridge"}>Fridge</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={"/storage/pantry"}>Pantry</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={"/storage/cabinet"}>Cabinet</Link>
                    </MenuItem>
                < /Select>
            < /FormControl>
        < /div>
    );
}