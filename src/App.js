
import './App.css';
// import  './CartItem';
// import CartItem from './CartItem';
import Navbar from './Navbar';
import Cart from "./Cart";
import React from 'react';
// import { initializeApp } from "firebase/app";
// import * as firebase from "firebase";
import firebase from 'firebase/compat/app';



class App extends React.Component {

  constructor()
    {
        super();
        this.state=
        {
            products:
            [
                // {
                //     price: 79999 ,
                //     title: "iPhone 13",
                //     qty: 2,
                //     img: "https://images.unsplash.com/photo-1638038772924-ef79cce2426d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                //     id: 1
                // },
                // {
                //     price: 92500,
                //     title: "MacBook Air M1",
                //     qty: 1,
                //     img: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                //     id:2
                // },
                // {
                //     price: 29999,
                //     title: "iWatch",
                //     qty: 5,
                //     img: "https://images.unsplash.com/photo-1530508943348-b8f606ea2bf2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                //     id:3

                // }
            ],
            loading: true
        }
        this.db=firebase.firestore();
       
    }

    componentDidMount()
    {
      firebase
      .firestore()
      .collection("products")
      .orderBy("price","asc")
      .onSnapshot((snapshot)=>
      {
        console.log("snapshot");
        snapshot.docs.map((doc)=>
        
          console.log(doc.data())
        
        );

        const products=snapshot.docs.map((doc)=>
        {
          const data=doc.data();

          data['id']=doc.id;
          return data;
        })

        this.setState({
          products: products,
          loading : false
        })
      })
    }
    handleIncreaseQuantity = (product)=>
    {
        const {products}= this.state;
        const index=products.indexOf(product);

        // products[index].qty+=1;

        // this.setState({products: products});
        const docRef= firebase.firestore().collection("products").doc(products[index].id);

        docRef.update(
          {
            qty: products[index].qty+1
          }
        )
        .then(()=>console.log("update has been done successfully"))
        .catch((error)=>console.log("its an error in updating",error))
    }

    handleDecreaseQuantity = (product)=>
    {
        const {products}= this.state;
        const index=products.indexOf(product);

        if(products[index].qty===0)
        {
            return;
        }

        // products[index].qty-=1;

        // this.setState({products: products});

        const docRef= this.db.collection("products").doc(products[index].id);

        docRef.update(
          {
            qty: products[index].qty-1
          }
        )
        .then(()=>console.log("update has been done successfully"))
        .catch((error)=>console.log("its an error in updating",error))
    }

    handleDeleteProduct=(id)=>
    {
        const {products} =this.state;

        // const items= products.filter((item)=> item.id!==id);

        // this.setState({products: items});
        const docRef= this.db.collection('products').doc(id);

        docRef
        .delete()
        .then(()=> console.log("deleted successfully"))
        .catch((error)=>console.log("its an error", error))

      }

    getCartCount=()=>
    {
      const {products}= this.state;
      let count=0;
      products.forEach((product)=>
      {
        count+=product.qty;
      })

      return count;
    }
    getCartTotal=()=>
    {
      const {products}=this.state;
      let total=0;
      products.forEach((product)=>
      {
        total= total+ product.qty*product.price;
      });
      return total;
    }

    addProduct=()=>
    {
      firebase
      .firestore()
      .collection("products")
      .add(
        {
          img:"",
          price: 999,
          qty: 3,
          title: "Washing Machine"
        }
      )
      .then((docRef)=>
      {
        console.log("product has been added successfully", docRef);
      })
      .catch((error)=>
      {
        console.log("error in adding", error);
      })
    }
  render()
  {
    const {products, loading }= this.state;
    return (
      <div className="App">
        {/* <h1>My Cart</h1> */}
        <Navbar
        count={this.getCartCount()}
        />
        <button 
        onClick={this.addProduct}
        style={{padding:20, fontSize: 20, backgroundColor: "pink"}}
        
        >
          Add product
          </button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>loading products...</h1>}
        <div>Total: Rs.{this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
