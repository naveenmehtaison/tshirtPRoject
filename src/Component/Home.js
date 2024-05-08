import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Cart from './Cart'
import DataContext from '../Store/auth-context'
const Home=()=>{
    const Ctx= useContext(DataContext)
    console.log('hii')
    const [data,setdata]=useState([])
    const [showmodal,setshowmodal]=useState(false)
    const [cartlen,setcartlen]=useState()
    async function Postdata(obj,p2){
        console.log(obj)
        const response = await axios.post(`https://crudcrud.com/api/a0bb8d341b2a413baeb9623a8bae698a/${p2}`,obj)
    }
    async function Postdata2(obj,item,size){
        const datacopy = data
        if(size==='1'){
            datacopy[item].small=parseInt(parseInt(datacopy[item].small)-1)
        }
        else if(size==='2'){
            datacopy[item].small=parseInt(parseInt(datacopy[item].medium)-1)
        }
        else if(size==='3'){
            datacopy[item].small=parseInt(parseInt(datacopy[item].large)-1)
        }
        setdata(datacopy)
        const response = await axios.post(`https://crudcrud.com/api/a0bb8d341b2a413baeb9623a8bae698a/Cart`,{obj})
        setcartlen(cartlen+1)
    }
    useEffect(()=>{
        async function Getdata(){
            const response = await axios.get('https://crudcrud.com/api/a0bb8d341b2a413baeb9623a8bae698a/products')     
            setdata(response.data)
            setcartlen(response.data.length)
        }
        Getdata()
    },[])
    const SubmitHandle=(e)=>{
        e.preventDefault()
        const obj = {Name:e.target.name.value,des:e.target.des.value,price:e.target.price.value,small:e.target.small.value,large:e.target.large.value,medium:e.target.medium.value}
        console.log(e)
        setdata([...data,obj])
        Postdata(obj,'products')
    }
    return(
        <>
            <h1>Tshirt SHop</h1>
            <button onClick={()=>{setshowmodal(!showmodal)}}>Cart{cartlen}</button>
            <form onSubmit={SubmitHandle}>
                <label htmlFor='name'>Tshirt Name</label>
                <input type='text' id='name'></input>
                <label htmlFor='des'>Desciption</label>
                <input id = 'des'></input>
                <label htmlFor='price'>Price</label>
                <input id='price'></input>
                <label htmlFor='small' >Small</label>
                <input type='number' style={{width: '80px'}} id='small'></input>
                <label htmlFor='medium' >Medium</label>
                <input id='medium' style={{width: '80px'}}></input>
                <label htmlFor='large' >Large</label>
                <input id='large' style={{width: '80px'}}></input>
                <button type='submit'> ADD </button>
            </form>
            
            <div className='container'>
                {data.map((ele,item)=>(
                    <div  key={item}>
                        <h2>{ele.Name}</h2>
                        <p>{ele.des}</p>
                        Rs.<b>{ele.price}</b><br></br>
                        <button onClick={()=>{Postdata2(ele,item,'1')}}> Buy S {ele.small}</button>
                        <button onClick={()=>{Postdata2(ele,item,'2')}}> Buy M {ele.medium}</button>
                        <button onClick={()=>{Postdata2(ele,item,'3')}}> Buy L {ele.large}</button>
                       
                        <hr></hr>
                    </div>
                ))}
            </div>
            {showmodal && <Cart/>}
        </>
    )
}
export default Home