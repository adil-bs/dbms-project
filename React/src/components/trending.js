import React from "react";
import {Link} from 'react-router-dom'

function Dots(props) {
    return(
        <p 
            className={"dots"+ ( props.isClicked ? " dotsClicked" : "")}
            onClick={()=>props.handleclickdots(props.id)}
        ></p>
    )
}


export default function Trending(props) {
    const containerRef = React.useRef(null)
    const [dotsScroll,setDotsScroll] = React.useState({
        dotArray:[1,0,0,0,0,0,0,0],
        scrollPosition:0
    })

    React.useEffect(()=>{

        const timer = setInterval(()=>{
            const currentDot = dotsScroll.dotArray.indexOf(1)
            handleclickdots( (currentDot + 1) %8 )
        },3000)

        return ()=> clearInterval(timer)
    },[dotsScroll])
    
    function handleclickdots(theId) {
        setDotsScroll(prev => {
            let newDotArray = prev.dotArray.map(ele => 0)
            newDotArray[theId] = 1

            const newScrollPosition = theId * containerRef.current.clientWidth
            containerRef.current.scrollLeft = newScrollPosition

            return ({dotArray:newDotArray , scrollPosition:newScrollPosition})
        })

    }
    
    function handleclick(direction) {
        const currentDot = dotsScroll.dotArray.indexOf(1)

        if (direction==="left" ) {
            handleclickdots( currentDot===0 ? 7 : currentDot-1 )
        } else  {
            handleclickdots( (currentDot + 1) %8 )
        }
    }       

    return(
        <div className="trending--section">
            <button className="leftbutton" onClick={()=>handleclick("left")}>&lt;</button>
            <button className="rightbutton" onClick={()=>handleclick("right")}>&gt;</button>

            <div className="trending--books"  ref={containerRef}>
            {props.data.map(obj => {
                return(    
                    <Link 
                        key={obj.id} 
                        to = {`/book/${obj.id}`}
                        className="noLink trending--book" 
                        style={{backgroundImage: `url(${obj.landscapeImage})`}}
                    >
                        <h1>{obj.name}</h1>
                        <h2>{obj.author}</h2> 
                    </Link>
                )
            })}
            </div>
             
            <div className="displaydots--container">
                {dotsScroll.dotArray.map(
                    (element,index) =>  
                        <Dots 
                            key={index} 
                            id={index} 
                            isClicked={element} 
                            handleclickdots={handleclickdots}
                        /> 
                )}
            </div>
                       
        </div>
    )
}