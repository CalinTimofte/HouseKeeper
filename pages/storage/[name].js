import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import {storageController} from '../../controllers/storageController'
import React, {useState, useEffect} from 'react';
import Navbar from "../../components/navbar";

export async function getServerSideProps(context) {
  let storage = await storageController.getAllFoodInStorage(context.params.name);
  if (storage !== undefined)
    storage = JSON.stringify(storage);
  else
    storage = "Page does not exist";
  return {
      props: {
        storageName: context.params.name,
        storage,
      },
  }
}


const Storage = ({storage, storageName}) => {
  if (storage === "Page does not exist")
    return(<h1>{storage}</h1>)

  const [food, setFood] = useState(JSON.parse(storage));
  const [newFoodItem, setNewFoodItem] = useState({
    "name": "avocado",
    "expirationDate": "2024-04-20",
    "quantity": "1",
    "unit": "piece"
  })

  let changeNewFoodItemField = (field, event) => {
    setNewFoodItem({...newFoodItem, [field]:event.target.value});
  }

  let changeNewFoodItemName = (event) => changeNewFoodItemField("name", event);
  let changeNewFoodItemExpiration = (event) => changeNewFoodItemField("expirationDate", event);
  let changeNewFoodItemQuantity = (event) => changeNewFoodItemField("quantity", event);
  let changeNewFoodItemUnit = (event) => changeNewFoodItemField("unit", event);

  const getFoodArr = async() => {
    const res = await fetch('/api/getAllFoodInStorage', {
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

  const refreshData = () => {
    getFoodArr().then(res => {setFood(res)});
  }

  const deleteButtonAction = async (foodItemName) => {
    await fetch('/api/deleteFoodItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: foodItemName
    })});
    refreshData();
  };

  const createButtonAction = async () => {
    await fetch('/api/addNewFoodItemToStorage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "storage": storageName,
        "foodItem": newFoodItem
    })});
    // This line of code is for "unclogging" database?
    // Idk why it doesn't work without it tbh
    // await getFoodArr();
    refreshData();
  };

  const storageListItems = food.map(item =>
    <li key={item.id} className={styles.card}>
        <h3>{item.name}</h3>
        <h3 className={styles.button_danger} onClick={() => deleteButtonAction(item.name)}>- delete</h3>
    </li>)

  return (
      <div className={styles.container}>
          <Navbar></Navbar>
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
              <div className={styles.card}>
                Name: 
                <input type="text"
                value={newFoodItem.name}
                onChange={changeNewFoodItemName} />
                <br/>
                
                Expiration Date: 
                <input type="text"
                value={newFoodItem.expirationDate}
                onChange={changeNewFoodItemExpiration} />
                <br/>

                Quantity: 
                <input type="text"
                value={newFoodItem.quantity}
                onChange={changeNewFoodItemQuantity} />
                <br/>
                
                Unit: 
                <input type="text"
                value={newFoodItem.unit}
                onChange={changeNewFoodItemUnit} />
                <br/>

                <div onClick={() => createButtonAction()} className={styles.button_create}>
                    <h3> + add food </h3>
                </div>
              </div>
          </main>

      </div>
    )
}

export default Storage;
export const dynamic = 'force-dynamic';