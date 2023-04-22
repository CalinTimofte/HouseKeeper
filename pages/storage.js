import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Link from 'next/link'

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/getAllStorage')
    const storages = await res.json()
    
    return {
        props: {
            storages,
        },
    }
}

export default function Storage({storages}) {
    const storageListItems = storages.storages.map(item =>
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