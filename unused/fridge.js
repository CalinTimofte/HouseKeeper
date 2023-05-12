// import Head from 'next/head';
// import styles from '../styles/Home.module.scss';

// export default function Fridge() {
//     const fridgeContents = [
//         {name: "apple", quantity: 3, unit: "piece", id: 1},
//         {name: "bread", quantity: 1, unit: "loaf", id: 2},
//         {name: "cheese", quantity: 6, unit: "slice", id: 3}
//     ]

//     const fridgeListItems = fridgeContents.map(item =>
//         <li key={item.id} className={styles.card}>
//             <h3>{item.name}</h3>
//             <p>Quantity: {item.quantity} {item.unit + (item.quantity > 1 ? "s" : "")} </p>
//         </li>)

//     return (
//         <div className={styles.container}>
//             <Head>
//                 <title>Your Fridge | HouseKeeper App</title>
//                 <link rel="icon" href="/favicon.ico" />
//             </Head>

//             <main>
//                 <h1 className={styles.title}>
//                     Your Fridge | HouseKeeper
//                 </h1>

//                 <ul className={styles.grid}>{fridgeListItems}
//                 </ul>
//             </main>

//         </div>
//     )
// }