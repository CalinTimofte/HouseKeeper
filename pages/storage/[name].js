import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import { useRouter } from 'next/router';


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
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const deleteButtonAction = async (foodItemName) => {
    fetch('http://localhost:3000/api/deleteFoodItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: foodItemName
    })}).then(refreshData())
  };

  const createButtonAction = async () => {
    fetch('http://localhost:3000/api/addFoodItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "name": "cornflakes",
        "expirationDate": "2024-04-20",
        "quantity": 1,
        "unit": "piece"
    })})
    .then(res => {
      fetch('http://localhost:3000/api/addFoodItemToStorage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "storage": storageName,
          "foodItem": "cornflakes"
      })})
    })
    .then(refreshData())
  };

  const storageListItems = storage.foodArray.map(item =>
    <li key={item.id} className={styles.card}>
        <h3>{item.name}</h3>
        <h3 className={styles.button_danger} onClick={() => deleteButtonAction(item.name)}>- delete</h3>
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

              <ul className={styles.grid}>
                {storageListItems}
              </ul>
              <div className={styles.button_create}>
                  <h3 onClick={createButtonAction}> + add food </h3>
              </div>
          </main>

      </div>
    )
}

export default Storage
