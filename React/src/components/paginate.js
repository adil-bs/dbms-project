// import React from "react";
// import { useSearchParams } from "react-router-dom";
// import { largest, smallest } from "../utility";

// export default function Paginate(props) {
//     const [searchParam,setSearchParam] = useSearchParams()
//     const [startPageNo,setStartPageNo] = React.useState(1)
//     const lastPageNo = Math.ceil(props.totalItems/props.itemsPerPage)
//     const displayAtOnce=5
//     const moveBy = Math.floor(displayAtOnce/2)   //to move the selected page towards middle of the paginate array

//     React.useEffect(()=>{
//         const pageno=parseInt(searchParam.get("pageno") || 1)
//         //selected page always comes in the middle of paginate array (exception being pages at the very last and at the very first)
//         setStartPageNo(pageno>lastPageNo-moveBy ?     //checks whether current page is among one of the very last
//             largest(lastPageNo-displayAtOnce+1 , 1) 
//             : 
//             largest(pageno-moveBy,1)  //arranges paginate array in such a way that selected pageno is always at the center of the array
//         )
        
//     },[searchParam])

//     const handleSearchParam = pageno => {
//         props.scrollRef.current.scrollIntoView({ block: 'start' })
                                                       
//         setSearchParam(prevParam => {
//             prevParam.set('pageno',pageno)
//             return prevParam
//         })
        
//     }

//     const handleSearchParamByOneUnit = direction => {
//         props.scrollRef.current.scrollIntoView({ block:"start" })

//         setSearchParam(prevParam => {
//             const previousPage = parseInt(prevParam.get("pageno")) - 1
//             const nextPage = parseInt(prevParam.get("pageno")||1) + 1
//             prevParam.set('pageno', direction==="prev"? previousPage : nextPage )
          
//             if (direction==="next" && nextPage>(startPageNo+displayAtOnce-1))
//                 setStartPageNo(prev => prev+1)
//             else if (direction==="prev" && previousPage<(startPageNo))
//                 setStartPageNo(prev => prev-1 )
//             return prevParam
//         })
//     }

//     const firstItemIndex = searchParam.get("pageno") ? 
//         (parseInt( searchParam.get("pageno") ) -1 ) * props.itemsPerPage + 1 : 1
//     const lastItemIndex = (firstItemIndex+props.itemsPerPage-1)<=props.totalItems ?
//         firstItemIndex+props.itemsPerPage-1 : props.totalItems
//     let pageNo=[]

//     //...
//     if (startPageNo!==1) {
//         pageNo.push(
//             <button 
//                 className="paginate--pageno" 
//                 key={1}
//                 onClick={()=>handleSearchParam(1)}
//                 style={{background: parseInt(searchParam.get("pageno") || 1)===1? "rgb(57, 125, 233)":""}}
//             > {1} </button>
//         )
//         pageNo.push(startPageNo>2 &&  <b key={-10}>{" ... "}</b>)
//     }
//     for (let i = startPageNo ; i <=  smallest(startPageNo+displayAtOnce-1, lastPageNo) ; i++) {
//         pageNo.push(
//             <button 
//                 className="paginate--pageno" 
//                 key={i}
//                 onClick={()=>handleSearchParam(i)}
//                 style={{background: parseInt(searchParam.get("pageno"))===i? "rgb(57, 125, 233)":""}}
//             > {i} </button>
//         )
//     }
    
//     if (parseInt(pageNo[pageNo.length-1].key)!==lastPageNo) {
//         pageNo.push(pageNo[pageNo.length-1].key<lastPageNo-1 &&  <b key={-20}>{" ... "}</b>)

//         pageNo.push(
//             <button 
//                 className="paginate--pageno" 
//                 key={lastPageNo}
//                 onClick={()=>handleSearchParam(lastPageNo)}
//                 style={{background: parseInt(searchParam.get("pageno"))===lastPageNo? "rgb(57, 125, 233)":""}}
//             > {lastPageNo} </button>
//         )
//     }
        

//     return(
//         <div className="paginate--container">
//             <pre>Displaying {firstItemIndex} - {lastItemIndex} out of {props.totalItems}</pre>

//             {pageNo.length !== 1 &&
//             <div className="paginate--pageno--container">
    
//                 <button 
//                     className="nobutton paginate--more" 
//                     disabled={parseInt(searchParam.get("pageno")|| 1) === 1} 
//                     onClick={()=>handleSearchParamByOneUnit("prev")}
//                 >  &lt;  </button> 
//                 {pageNo}
//                 <button 
//                     className="nobutton paginate--more" 
//                     disabled={parseInt(searchParam.get("pageno") || 1)=== lastPageNo} 
//                     onClick={()=>handleSearchParamByOneUnit("next")}
//                 >  &gt;  </button>
                
//             </div>}
//         </div>
//     )
// }
import React from "react";
import { useSearchParams } from "react-router-dom";
import { largest, smallest } from "../utility";


export default function Paginate(props) {

    const [searchParam,setSearchParam] = useSearchParams()
    const [startOfMiddlePages,setStartOfMiddlePages] = React.useState(2)
    const lastPageNo = Math.ceil(props.totalItems/props.itemsPerPage)
    
    const displayAtOnce=7
    const moveBy = Math.floor(displayAtOnce/2)   //to move the selected page towards middle of the paginate array

    React.useEffect(()=>{
        const pageno = parseInt(searchParam.get("pageno")|| 1)

        setStartOfMiddlePages(pageno>lastPageNo-moveBy     
        //checks whether current page is among one of the very last
            
            ?   largest(lastPageNo-displayAtOnce+1 , 2) 
            :   largest(pageno-moveBy,2)  
            //arranges paginate array in such a way that selected pageno is always at the center of the array
        )
    },[searchParam])

    function PaginateButton (props) {
        return(
            <button 
                className="paginate--pageno" 
                onClick={()=>handleSearchParam(props.id)}
                style={{background: parseInt(searchParam.get("pageno") || 1)===props.id? "rgb(57, 125, 233)":""}}
            > {props.id} </button>
        )
    }
    function NavigateArrow (props) {
        const currentPage = parseInt(searchParam.get("pageno")|| 1)
        const disable = props.direction === -1 
            ? currentPage===1
            : currentPage===lastPageNo

        return(
            <button 
                className="nobutton paginate--more" 
                disabled={disable} 
                onClick={()=>handleSearchParamByUnits(props.direction)}
            >  
                {props.direction===1 ? '>' : '<'}  
            </button> 
        )
    }

    const handleSearchParam = pageno => {
        props.scrollRef.current.scrollIntoView({ block: 'start' })
                                                       
        setSearchParam(prevParam => {
            prevParam.set('pageno',pageno)
            return prevParam
        })
    }

    const handleSearchParamByUnits = (units) => {
        const currentPage = parseInt(searchParam.get("pageno") || 1)
        handleSearchParam(currentPage + units)
    }

    const firstItemIndex = 
        searchParam.get("pageno") 
        ?   (parseInt( searchParam.get("pageno") ) -1 ) * props.itemsPerPage + 1 
        :   1
    const lastItemIndex = smallest(firstItemIndex+props.itemsPerPage-1,props.totalItems)

    let middlePages=[]

    for (let i = startOfMiddlePages ; i <=  smallest(startOfMiddlePages+displayAtOnce-1, lastPageNo-1) ; i++) {
        middlePages.push(<PaginateButton id={i} key={i} />)
    }

    return(
        <div className="paginate--container">
            <pre>Displaying {firstItemIndex} - {lastItemIndex} out of {props.totalItems}</pre>

            {lastPageNo !== 1 &&
            <div className="paginate--pageno--container">
    
                <NavigateArrow direction={-1}/>
                <PaginateButton id={1} />

                {middlePages[0] && middlePages[0].key !== '2' && "..."}
                {middlePages}
                {middlePages[0] && middlePages[middlePages.length-1].key !== `${lastPageNo-1}` && "..."}

                <PaginateButton id={lastPageNo} />
                <NavigateArrow direction = {1}/>
                
            </div>}
        </div>
    )
}