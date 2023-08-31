import React from "react";
import Booktile from "./booktile";
import { Loading } from "./sadpath";
import { postItems } from "../utility";
import { useLocation } from "react-router-dom";

export default function Slider (props) {
    const containerRef = React.useRef(null)
    const location = useLocation()
    const [data,setData] = React.useState({books:[],pageno:1,totalbooks:0})
    const [loading,setLoading] = React.useState(true)
    const [clickCounter,setClickCounter] = React.useState(0)

    React.useEffect(()=>{
        async function getNewBooks() {
            const newdata=await postItems(
                {...props.postObject,pageno:data.pageno},
                props.api
            )
       
            setLoading(true)
            setData(prev => { return( {
                books:prev.books.concat(newdata.data) ,
                pageno:prev.pageno+1,
                totalbooks:newdata.totalbooks
            })})
            setLoading(false)
        }

        if (
            clickCounter  >= 2*(data.pageno-1) &&
            data.pageno-1 <= data.totalbooks/20     
        ) 
            getNewBooks()

    },[location.pathname,props,data,clickCounter])

    function handleScrollDirection(direction) {
        containerRef.current.scrollBy({
            left : direction * containerRef.current.clientWidth
        })

        setClickCounter(prev => prev+direction)
    }

    const booktiles =data.books.map(obj => 
        <Booktile 
            key={obj.id} 
            logged={props.logged} 
            {...obj} 
        />
    )
    
    return(
         <div style={{overflow:"hidden"}}>
            <button 
                className="slider--greater nobutton" 
                onClick={()=>handleScrollDirection(1) } 
            > &gt; </button>
            <button 
                className="slider--lesser nobutton" 
                onClick={()=>handleScrollDirection(-1)} 
            > &lt; </button>

            <div className="slider" ref={containerRef}>
                {booktiles}
                {loading && <Loading/>}
            </div>
        </div>
    )
}