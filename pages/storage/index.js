import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import Link from 'next/link'
import {storageController} from '../../controllers/storageController'
import Navbar from "../../components/navbar";
import Image from "next/image";

export async function getServerSideProps() {
    const res = await storageController.getAllStorage();
    const storages = JSON.stringify(res);

    return {
        props: {
            storages,
        },
    }
}

export default function StorageList({storages}) {
    const storageSpaces = JSON.parse(storages);

    const storageListItems = storageSpaces.map(item =>
        <li key={item.id} className={styles.card}>
            {/* The link below has backticks */}
            <Image src={`/img/${item.name}.png`} width={100}
                   height={100}/>
            <Link href={`/storage/${item.name}`}><h3>{item.name}</h3></Link>
        </li>)

    return (
        <div className={styles.container}>
            <Navbar></Navbar>
            <Head>
                <title>Your Storage | HouseKeeper App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1 className={styles.title}>
                    Your Storage | HouseKeeper
                </h1>

                <ul className={styles.grid}>{storageListItems}
                    <p></p>
                </ul>
            </main>

        </div>
    )
}