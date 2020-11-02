import React, {useState, useEffect} from "react"
import Layout from "./Layout"
import Card from "./Card"
import {getCategories, getFilteredProducts, getProducts } from './apiCore'
import CheckBox from './CheckBox'
import RadioBox from "./RadioBox"
import {  prices } from './fixedPrices'

const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price:[]}
    })
    const [categories, setCategories] = useState([]) 
    const [error, setError] = useState([false]) 
    // const [error1, seterror] = useState(false)
    const [limit, setLimit] = useState([6]) 
    const [skip, setSkip] = useState([false]) 
    const [size,setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])
    // const [productsBySell, setProductsBySell] = useState([])
   
    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error)
            }
            else {
                setCategories(data)
            }
        })
    }

    // const loadProductBySell = () => {

    //     getProducts('sold').then(data => {
    //         if(data.error1){
    //             seterror(data.error1)
    //         }
    //         else{
    //             setProductsBySell(data)
    //         }
    //     })
    // }



    const loadFilteredResults = newFilters => {
        getFilteredProducts(skip,limit, newFilters).then(data =>{
            if(data.error){
                setError(data.error)
            }
            else{
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
            }
        })
        // console.log(newFilters)
    }

    const loadMore = () => {
        let toSkip =skip + limit

        getFilteredProducts(toSkip,limit, myFilters.filters).then(data =>{
            if(data.error){
                setError(data.error)
            }
            else{
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size)
                setSkip(toSkip)
            }
        })
        // console.log(newFilters)
    }

    const loadMoreButton =()=> {
        return (
            size> 0 && size>= limit && (
                <button onClick ={loadMore} className="btn btn-warning mb-5">Load More</button>
            )
        )
    }

    useEffect(() => {
          init()  
          loadFilteredResults(skip,limit, myFilters.filters)
        //   loadProductBySell()
    },[])

    const handleFilters = (filters, filterBy) => {
        console.log('SHOP',filters, filterBy);
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        if(filterBy === "price"){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    } 



    const handlePrice = value => {
        const data =prices 
        let array = []

        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }
        return array
    }
    
    return(
        <Layout title ="Shop Page"    
                description ="Search and find books of your choice"
                className="container-fluid">


                <div className="row">
                    <div className ="col-4">
                        <h4>Filter By Categories</h4>
                        <ul>
                        <CheckBox 
                         categories={categories}
                         handleFilters ={filters =>handleFilters(filters, 'category')} />
                        </ul>

                        <h4>Filter By price range</h4>
                        <div>
                        <RadioBox 
                         prices={prices}
                         handleFilters ={filters =>handleFilters(filters, 'price')} />
                        </div>

                    </div>
                

                    <div className="col-8">
                         {/* {JSON.stringify(filteredResults)}
                         <h2>The Separation</h2>
                         {JSON.stringify(productsBySell)} */}

                       <h2 className="mb-4">Products</h2>
                         <div className="row">
                            { filteredResults.map((product, i) => (
                                    <div key ={i} className="col-4 mb-3">
                                        <Card  product = {product} showViewProductButton={true}/>
                                    </div>
                                    ))}               
                                  
                        </div> 
                 {/* <h2 className="mb-4">Best Sellers</h2>
                <div className="row">
                 {JSON.stringify(productsBySell)}
                {productsBySell.map((product, i) =>
                 (<Card key ={i} product = {product}/>))}
                </div> */}
                        <hr/>
                        {loadMoreButton()}
                    </div>
                </div>

        </Layout>)
}

export default Shop 