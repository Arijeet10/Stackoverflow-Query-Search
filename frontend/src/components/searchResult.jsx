import React from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import {setReset} from '../redux/actions/reduxAction';

function Result(props) {
    const dispatch=useDispatch()
    function handleReset(){
        dispatch(setReset())
    }

    function handleClick(){
        props.handleNextPage()
    }

    return (
        <div>
            <Link to={"/"} onClick={handleReset} style={{textDecoration:"none"}}>
                <button type="submit">Search</button>
            </Link>
            {
                props.data.map(
                    (item, index) => (
                        <div key={index}>
                            <a rel="noopener noreferrer" href={item[1]} target="_blank" style={{ textDecoration: "none" }}>
                                <p>{item[0]}</p>
                            </a>
                        </div>
                    )
                )
            }
            < button type="submit" className="btn btn-secondary" onClick={handleClick}>
                Next Page
            </button>
        </div>
    )
}


export default Result
