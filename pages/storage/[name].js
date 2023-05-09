import Head from 'next/head';
import styles from '../../styles/Home.module.scss';

// Generates storage/fridge, /pantry, /cabinet
export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/getAllStorage');
  const storages = await res.json();
  const paths = storages.storages.map((storage) => ({
    params: { name: storage.name },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const res = await fetch('http://localhost:3000/api/getAllFoodInStorage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: context.params.name
    })})
  const storage = await res.json()
  
  return {
      props: {
        storageName: context.params.name,
        storage,
      },
  }
}

const Storage = ({storage, storageName}) => {
  const storageListItems = storage.foodArray.map(item =>
    <li key={item.id} className={styles.card}>
        <h3>{item.name}</h3>
    </li>)
return (
    <div className={styles.container}>
        <Head>
            <title>{storageName} | HouseKeeper App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <h1 className={styles.title}>
              {storageName} | HouseKeeper
            </h1>

            <ul className={styles.grid}>{storageListItems}
            <p></p>
            </ul>
        </main>

    </div>
  )
}

export default Storage
