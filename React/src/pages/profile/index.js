import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import RatingRatio from "../../components/ratingratio";
import { fullDate, getItems, postItems, redirectIfNotLogged } from "../../utility";
import Edit from "../../components/edit"
import { CropImage } from "../../components/searchcomponents";
import SuchEmpty from "../../components/suchempty";

export async function loader() {
    await redirectIfNotLogged("/profile")
    const activities = await getItems(`http://127.0.0.1:8000/${localStorage.getItem("id")}/activity`)
    const bookshelfData = await postItems(
        {userid:localStorage.getItem("id")},`http://127.0.0.1:8000/searchbooks/`
    )
    return {activities:activities,bookshelfData:bookshelfData.data}
}


export default function PofileIndex() {
    const user = localStorage.getItem("user")
    const navigate = useNavigate()
    const [nameChange, SetNameChange] = React.useState({bool:false,new:user})
    
    async function logout() {
        const res = await getItems(`http://127.0.0.1:8000/auth/logout/${localStorage.getItem("id")}/`)
        console.log(res);
        if (res.message && res.message==='logged out' ) {
            localStorage.clear()
            navigate("/",{replace:true})
        }
    }
    
    const {activities,bookshelfData} = useLoaderData()
    const statistics =["Contributions","Reviews","Ratings","Comments"]

    return(
        <div>
            {/* <div className="personal--details"> */}
                {/* <div className="personal--stats">
                    <CropImage src="/images/defaultprofilepic.png" />
                    <Link className="noLink" to={"activity"}>0 ratings </Link>
                    <Link className="noLink" to={"activity"}>0 review</Link>
                </div> */}

                <div>
                    {nameChange.bool
                    ?   <input 
                            defaultValue={user}
                            className="contribute--input"
                            onBlur={()=>SetNameChange(prev => ({...prev,bool:false}) )}
                            onChange={(e)=>SetNameChange(prev => ({...prev,new:e.target.value}) )}
                            value={nameChange.new}
                        />
                
                    :   <div className="your--review">
                            <h1>{nameChange.new}  </h1>
                            <Edit onClick={() => SetNameChange(prev => ({...prev,bool:true}))} />
                        </div>
                    }
                    
                     <br/>
                    
                    <h3 className="auth--navbar">User Statistics</h3>
                    <hr/>
                    <table className="vertical--table">
                    <tbody>
                        {statistics.map(ele => {

                            let data = 0
                            if (ele==="Contributions") data=activities.filter(ele=>ele.activity==="contributed").length 
                            else if (ele==="Reviews") data=activities.filter(ele=>ele.activity==="reviewed").length 
                            else if (ele==="Ratings") data=activities.filter(ele=>ele.activity==="rated").length 
                            else if (ele==="Comments") data=activities.filter(ele=>ele.activity==="commented").length 
                            
                            return(
                                <tr>
                                <th>{ele}</th>
                                <td>{data}</td>
                                </tr>
                            )
                        })}
                          
                    </tbody>
                    </table>
                </div>
                <br/>
            {/* </div> */}

            <div>
                <div className="your--review">
                    <h3>Your Bookshelf    </h3> 

                    {bookshelfData && bookshelfData.length >7 &&
                    <Link className="noLink view--more" to={"bookshelf"}>View More &gt;&gt;</Link>}    
                </div>
                
                <hr/>
                
                {bookshelfData && bookshelfData.length !==0 
                ?
                <div className="dashboard--bookshelf">
                    {bookshelfData.map(ele => <Link to={"/book/"+ele.id}><img 
                        key={ele.id}
                        src={ele.image}
                        alt=""
                        width={"100px"}
                    /></Link>)}
                </div>
                :
                <SuchEmpty msg="The books you want to read appears here"/>}
            </div>

            <div>
                 
                <div className="your--review">
                    <h3>Rcecent Activities   </h3> 

                    {activities && activities.length >8 &&
                    <Link className="noLink view--more" to={"activity"}>View More &gt;&gt;</Link>}    
                </div>
                
                <hr/>
                
                {activities && activities.length !==0 
                ?
                <div className="dashboard--activity--container">
                {activities.map(ele=>{
                    return(
                        <div key={ele.id} className="dashboard--activity">
                            <span>{user} has {ele.activity}    <Link className="noLink dashboard--activity--bookname" to={`/book/${ele.bookId}`}>{ele.book}</Link>    </span>   
                            {ele.activity==="rated" && <RatingRatio rating={ele.rating}/>}
                            <div className="dashboard--activity--rhs">
                                <small className="gray">{fullDate(ele.date)}    </small>
                                {/* <button className="gray nobutton">X</button> */}
                            </div>
                        </div>
                    )
                })}   
                </div>
                :
                <SuchEmpty msg={"Your recent activities appear here"}/>}
            </div>

            <button 
                className="logout"
                onClick={logout}
            >  Log Out  </button>

        </div>
    )
}