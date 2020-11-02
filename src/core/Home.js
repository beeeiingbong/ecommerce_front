import React, { useEffect, useState } from 'react';
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, seterror] = useState(false)

    const loadProductBySell = () => {

        getProducts('sold').then(data => {
            if(data.error){
                seterror(data.error)
            }
            else{
                setProductsBySell(data)
            }
        })
    }

    const loadProductByArrival = () => {

        getProducts('createdAt').then(data => {
            if(data.error){
                seterror(data.error)
            }
            else{
                setProductsByArrival(data)
            }
        })
    }
 
    useEffect(() => {
        loadProductByArrival()
        loadProductBySell()
    }, [])
         
         return(
         <Layout title ="Home Page" 
                 description ="Node React E-Commerce App"
                 className="container-fluid">

                <Search/>    
                
                <h2 className="mb-4">Best Sellers</h2>
                <div className="row">
                {/* {JSON.stringify(productsBySell)} */}
                {productsBySell.map((product, i) =>(
                    <div key ={i} className="col-4 mb-3">
                        <Card  product = {product} showViewProductButton={true}/>
                    </div>
                 ))}
                </div>

                <h2 className="mb-4">New Arrivals</h2>
                <div className="row">
                {productsByArrival.map((product, i) =>
                 ( <div key ={i} className="col-4 mb-3">
                        <Card  product = {product} showViewProductButton={true}/>
             </div>))}    
                </div>    
         </Layout>)
}
export default Home; 