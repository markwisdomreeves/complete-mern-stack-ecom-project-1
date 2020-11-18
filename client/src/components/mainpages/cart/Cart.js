import React, { useContext, useState, useEffect } from 'react';
import {GlobalState} from '../../../GlobalState';
import axios from 'axios';
import PaypalButton from './PaypalButton';


function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)


    useEffect(() => {
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }
        getTotal()
    },[cart])


    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }


    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }


    const removeProduct = id => {
        if(window.confirm("Are you sure you want to delete this project?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart(cart)
        }
    }


    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed your order.")
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", color: "rgb(3, 165, 206)", fontSize: "1.5rem", 
        textTransform: "uppercase", fontFamily: "sans-serif", marginTop: "40px"}}>Your cart is currently empty.</h2> 

    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="productImg" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>$ {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>
                            
                            <div className="delete" 
                            onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }


            <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton
                  total={total}
                  tranSuccess={tranSuccess} />
            </div>
        </div>
    )
}



export default Cart
