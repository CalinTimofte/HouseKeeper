import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import {storageController} from '../../controllers/storageController'
import React, {useState, useEffect} from 'react';

// Generates storage/fridge, /pantry, /cabinet
// export async function getStaticPaths() {
//   let storages = await storageController.getAllStorage();
//   const paths = storages.map((storage) => ({
//     params: { name: storage.name},
//   }))
//   return { paths, fallback: false }
// }

export async function getServerSideProps(context) {
  let storage = await storageController.getAllFoodInStorage(context.params.name);
  storage = JSON.stringify(storage);
  return {
      props: {
        storageName: context.params.name,
        storage,
      },
  }
}


const Storage = ({storage, storageName}) => {
  const [food, setFood] = useState(JSON.parse(storage));
  // useEffect(() => {
  //   getFoodArr().then(res => {console.log(res)});
  // })

  const getFoodArr = async() => {
    const res = await fetch('http://localhost:3000/api/getAllFoodInStorage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: storageName
    })})
    const reply = await res.json();
    return reply;
  }

  const refreshData = async () => {
    const newFoodArr = await getFoodArr();
    console.log(newFoodArr);
    setFood(newFoodArr);
  }

  const deleteButtonAction = async (foodItemName) => {
    await fetch('http://localhost:3000/api/deleteFoodItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: foodItemName
    })});
    await refreshData();
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
    })}).then(fetch('http://localhost:3000/api/addFoodItemToStorage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "storage": storageName,
          "foodItem": "cornflakes"
      })})).then(refreshData());
  };

  const storageListItems = food.map(item =>
    <li key={item.id} className={styles.card}>
        <h3>{item.name}</h3>
        <h3 className={styles.button_danger} onClick={() => deleteButtonAction(item.name)}>- delete</h3>
    </li>)

  return (
      <div className={styles.container}>
          <Head>
              <title>{storageName +"| HouseKeeper App"}</title>
              <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
              <h1 className={styles.title}>
                {storageName} | HouseKeeper
              </h1>

              <ul className={styles.grid}>
                {storageListItems}
              </ul>
              <div onClick={createButtonAction} className={styles.button_create}>
                  <h3> + add food </h3>
              </div>
          </main>

      </div>
    )
}

export default Storage;
export const dynamic = 'force-dynamic';