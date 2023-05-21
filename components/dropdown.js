import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from "next/link";
import styles from '../styles/Home.module.scss';
import KitchenIcon from '@mui/icons-material/Kitchen';

export default function NavbarDropdown() {

    return (
        <div className={styles.inlineBlock}>
            <FormControl variant="standard">
                <Select className={styles.navbarButton}
                        displayEmpty
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        renderValue={() => {
                            return <><KitchenIcon></KitchenIcon>Storage</>
                        }}
                        inputProps={{
                            'aria-label': 'Without label'
                        }}>

                    <Link href={"/storage/fridge"}>
                        <MenuItem>Fridge</MenuItem>
                    </Link>
                    <Link href={"/storage/pantry"}>
                        <MenuItem>Pantry</MenuItem>
                    </Link>
                    <Link href={"/storage/cabinet"}>
                        <MenuItem>Cabinet</MenuItem>
                    </Link>
                < /Select>
            < /FormControl>
        < /div>
    );
}