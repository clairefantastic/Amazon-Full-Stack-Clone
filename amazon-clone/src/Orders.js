import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { collection, query, orderBy, onSnapshot, doc, setDoc } from "firebase/firestore";
import './Orders.css';
import { useStateValue } from './StateProvider';
import Order from "./Order";

function Orders() {
  const [orders, setOrders] = useState();
  const [{ basket, user }, dispatch] = useStateValue();
  useEffect(() => {
    if (!user?.uid) {
        console.error("❌ Error: User ID is missing or invalid.");
        setOrders([])
        return;
    }

    // Define Firestore collection reference
    const ordersRef = collection(db, "users", user.uid, "orders");

    // Create a query with ordering by "created" field
    const ordersQuery = query(ordersRef, orderBy("created", "desc"));

    // Subscribe to Firestore collection changes
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        setOrders(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        );
    });
    return () => unsubscribe();
  }, [user]);
  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders__order'>
        {orders?.map(order => (
          <Order order={order}/>
        ))}
      </div>
    </div>
  )
}

export default Orders
