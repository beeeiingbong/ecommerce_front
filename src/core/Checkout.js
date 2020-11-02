import React, { useEffect, useState } from 'react';
import {isAuthenticated} from '../auth/index'
import {Link,Redirect} from 'react-router-dom'
import { getBraintreeClientToken, processPayment, createOrder } from "./apiCore"
import DropIn from 'braintree-web-drop-in-react'
import {emptyCart} from './cartHelpers'



const Checkout = ({products}) => {

    const [data, setData] = useState({
        loading:false,
        success: false,
        clientToken:null,
        error:'',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;  

    const getToken=(userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error){
                setData({...data, error: data.error});
            }
            else{
                setData({ clientToken: data.clientToken})
            }
        })
    }


    useEffect(() => {
        getToken(userId, token)
    }, [])

    const handleAddress = event =>{
        setData({...data, address: event.target.value})
    }

    const getTotal = () =>{
        return products.reduce((currentValue, nextValue)=> {
            return currentValue + nextValue.count * nextValue.price;
        },0)
                
    }

    const showCheckout = () => {
        return  isAuthenticated() ? (
            <div className=" btn btn-success"> {showDropIn()}</div>
        ): (<Link to ="/signin">
             <button className="btn btn-primary">Sign in to checkout</button> 
             </Link>)
    }

    let deliveryAddress = data.address

    const buy= () =>{
        //send the nonce to your server
        //nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            // console.log(data)
            nonce =data.nonce
            // once you have nonce (card type, card number) send once as 'paymentMethodNonce'
            // and also total to be charged
            // console.log('send nonce and total to process: ', nonce, getTotal(products))
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }

            processPayment(userId, token, paymentData)
            .then(response =>{
                // console.log(response)
                //create order
                const createOrderdata ={
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: deliveryAddress
                }

                createOrder(userId, token, createOrderdata)
                .then(response => {
                    emptyCart(() => {
                        console.log('payment success and empty cart')
                        setData({loading:false,success: response.success})
                    })
                }).catch(error => {
                        console.log(error)
                        setData({ loading: false })
                })
                
            })
        .catch(error => { 
            // console.log('dropin error: ', error)
            setData({...data, error: error.message })
        })
        // return <Redirect to = "/shop"/>
    })
}

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ''})}>
            {(data.clientToken !== null && products.length) > 0 ? (
            <div>
                <div className="form-group mb-3">
                    <label className="text-muted">Delivery Address</label>
                    <textarea 
                        onChange={handleAddress}
                        className="form-control"
                        value={data.address}
                        placeholder = " Type your delivery address here..."
                    />
                </div>
                <DropIn options = {{
                    authorization: data.clientToken
                }} onInstance={instance => data.instance = instance }/>
                <button onClick={buy} className ="btn btn-success btn-block">Pay</button>
            </div>):null}
        </div>
        )
    const showError = error => (
        <div className=" alert alert-danger" style ={{display: error ? '': 'none'}}>
            {error}
        </div>
    )

    const showSuccess = success => (
        <div className=" alert alert-info" 
             style ={{display: success ? '': 'none'}}>
            
        </div>
    )

    const homepage = () =>{
        if(data.success === true){
            {alert("Your Payment was a success")}
            return <Redirect to = "/shop"/>
           
        }}
    

    return(

        <div>
        <h2>Total: &#x20B9; {getTotal()}</h2>
        {showSuccess(data.success)}
        {showError(data.error)}
        {showCheckout()}
        {homepage()}
        </div>)

}
export default Checkout