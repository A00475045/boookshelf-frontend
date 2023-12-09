import { useState } from "react";
import './css/selling.css'
import axios from "axios";
import URL from "./url";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState("");
    const [url, setUrl] = useState("");


    const validateAndSave = async () => {
        if(title === "" ||
        description === "" ||
        category === "" ||
        author === "" ||
        condition === "" ||
        price === "" ||
        url === "" 
    ){ alert("all fields required!!");
        return ;
    }

        try{
            console.log({
                Author:author,
                CategoryName: category,
                Condition: condition,
                Description: description,
                ImageUrl:url,
                Title:title,
                Price: price,
                SellerId: Cookies.get('userID')
               })
               const response = await axios.post(`${URL}/books`,{
                "Title": title,
                "Description": description,
                "CategoryName": category,
                "Author": author,
                "Condition": condition,
                "SellerId": Cookies.get('userID'),
                "ImageUrl": url,
                "Price": price
            },{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("jwt")}`,
                },
    });
               console.log(response)
               navigate('/dashboard/');
        }catch(err){
            alert("something went wrong!!");
        }
    }

    return (
        <main className="main-selling">
            Create a listing

        <span>
            <input type="text" style={{margin:"0 2vw"}} name="title" id="title" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" style={{margin:"0 2vw"}} name="description" id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/></span>
<span>
            <input type="text" name="category"style={{margin:"0 2vw"}} id="category" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}/>
            <input type="text" name="author" id="author"style={{margin:"0 2vw"}} placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)}/></span>
            <span><input style={{width:"10vw",margin:"0 2vw"}} type="text" name="condition" placeholder="Book condition" id="condition" value={condition} onChange={(e) => setCondition(e.target.value)}/>
            <input type="text" style={{width:"10vw",margin:"0 2vw"}} placeholder="price" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
            <input type="text" name="url" id="url" value={url} placeholder="https//something.com" onChange={(e) => setUrl(e.target.value)}/></span>
            <button onClick={validateAndSave}>Create a listing</button>
        </main>
    )
}

export default Dashboard;