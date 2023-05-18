import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import Link from 'next/link'
import {storageController} from '../../controllers/storageController'


export async function getServerSideProps() {
    const res = await storageController.getAllStorage();
    const storages =  JSON.stringify(res);
    
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
            <Link href={`/storage/${item.name}`}><h3>{item.name}</h3></Link>
        </li>)

    return (
        <div className={styles.container}>
            <Head>
                <title>Your Storage | HouseKeeper App</title>
                <link rel="icon" href="/favicon.ico" />
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