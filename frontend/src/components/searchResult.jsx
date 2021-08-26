import React from 'react'

function Result(props) {

    function handleClick(){
        props.handleNextPage()
    }

    return (
        <div>
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
