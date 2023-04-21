import Head from 'next/head';
import styles from '../styles/Home.module.scss';

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('http://localhost:3000/api/getAllStorage')
    const storages = await res.json()
    console.log(storages);
    
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            storages,
        },
    }
}

export default function Storage({storages}) {
    const fridgeContents = [
        {name: "apple", quantity: 3, unit: "piece", id: 1},
        {name: "bread", quantity: 1, unit: "loaf", id: 2},
        {name: "cheese", quantity: 6, unit: "slice", id: 3}
    ]
    console.log(storages);
    const storageListItems = storages.map(item =>
        <li key={item.id} className={styles.card}>
            <h3>{item.name}</h3>
        </li>)

    const fridgeListItems = fridgeContents.map(item =>
        <li key={item.id} className={styles.card}>
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity} {item.unit + (item.quantity > 1 ? "s" : "")} </p>
        </li>)

    return (
        <div className={styles.container}>
            <Head>
                <title>Your Fridge | HouseKeeper App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className={styles.title}>
                    Your Fridge | HouseKeeper
                </h1>

                <ul className={styles.grid}>{storageListItems}
                <p></p>
                </ul>
            </main>

        </div>
    )
}