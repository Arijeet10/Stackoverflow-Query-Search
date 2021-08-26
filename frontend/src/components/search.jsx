import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { setData, setSearchInput } from '../redux/actions/reduxAction';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function Search(props) {

    const { data,search } = props  //destructuring the data state

    const dispatch = useDispatch()  //to dispatch the data to redux actions

    //state to store the user input in an object
    const [params, setParams] = useState({
        q: "",
        accepted: "",
        answers: "",
        body: "",
        closed: "",
        migrated: "",
        notice: "",
        nottagged: "",
        tagged: "",
        title: "",
        user: "",
        url: "",
        views: "",
        wiki: "",
    })
    function handleParams(e) {
        const { name, value } = e.target;
        setParams(prevParams => {
            return { ...prevParams, [name]: value }
        })
    }

    const [pageNo, setPageNo] = useState(1);    //counting the page

    function handleNextPage() {
        setPageNo(pageNo + 1)   //increment the page
        getSearchData() //paginating
    }


    //let str;

    function getSearchData() {
        //retrieving search results from django server
        axios
            .get(`http://127.0.0.1:8000/query/${search}/${pageNo}`)
            .then(res => dispatch(setData(res.data)))
            .catch(err => console.log(err))
    }

    //on form submit it calls a function to fetch search results and if success then stores the results in an array of objects 
    function handleSubmit(e) {
        e.preventDefault();
        //str = Object.entries(params).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&'); //serializing the user input object into list of url query params
        if(params){
            dispatch(setSearchInput(params))
            if (params.q !== "") {
                getSearchData();
            } else {
                alert("cannot search empty field")  //if there is no user input
            }
        }
    }

    return (
        <React.Fragment>
            {data.length > 0 ? (
                data.map(
                    (item, index) => (
                        <div key={index}>
                            <a rel="noopener noreferrer" href={item[1]} target="_blank" style={{ textDecoration: "none" }}>
                                <p>{item[0]}</p>
                            </a>
                        </div>
                    )
                )
            ) : (

                <form onSubmit={handleSubmit}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="q">Search</label>
                            <input type="email" class="form-control" id="q" placeholder="Enter the query" name="q" value={params.q} onChange={handleParams} />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="number">Minimum No of Answers</label>
                        <input type="number" class="form-control" id="number" placeholder="Enter the minimum number of answers" name="answers" value={params.answers} onChange={handleParams} />
                    </div>
                    <div class="form-group">
                        <label for="body">Body</label>
                        <input type="text" class="form-control" id="body" placeholder="Enter the text which must appear in questions' bodies" name="body" value={params.body} onChange={handleParams} />
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="nottagged">Nottagged</label>
                            <input type="text" class="form-control" id="nottagged" placeholder="Enter the tags which are not related. Put semicolon(;) between the tags" name="nottagged" value={params.nottagged} onChange={handleParams} />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tagged">Tagged</label>
                            <input type="text" class="form-control" id="tagged" placeholder="Enter the related tags. Put semicolon(;) between the tags" name="tagged" value={params.tagged} onChange={handleParams} />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" placeholder="Enter the title text" name="title" value={params.title} onChange={handleParams} />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="user">User</label>
                            <input type="text" class="form-control" id="user" placeholder="Enter the id of the user who must own the questions" name="user" value={params.user} onChange={handleParams} />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="url">Url</label>
                            <input type="text" class="form-control" id="url" placeholder="Enter the url which is contained in the question post" name="url" value={params.url} onChange={handleParams} />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="views">Views</label>
                            <input type="number" class="form-control" id="views" placeholder="Enter the minimum number of views of questions" name="views" value={params.views} onChange={handleParams} />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-group col-md-4">
                            <label for="accepted">Accepted</label>
                            <select id="accepted" class="form-control" onChange={handleParams} name="accepted" value={params.accepted}>
                                <option selected>Choose...</option>
                                <option value="true">return questions with accepted answers</option>
                                <option value="false">return only questions without answers</option>
                                <option value="Omit">Elide constraint</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="closed">Closed</label>
                            <select id="closed" class="form-control" onChange={handleParams} name="closed" value={params.closed}>
                                <option selected>Choose...</option>
                                <option value="true">return closed questions</option>
                                <option value="false">return only open questions</option>
                                <option value="Omit">Elide constraint</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="migrated">Migrated</label>
                            <select id="migrated" class="form-control" onChange={handleParams} name="migrated" value={params.migrated}>
                                <option selected>Choose...</option>
                                <option value="true">return questions migrated away from site</option>
                                <option value="false">return questions which are not migrated</option>
                                <option value="Omit">Elide constraint</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="notice">Notice</label>
                            <select id="notice" class="form-control" onChange={handleParams} name="notice" value={params.notice}>
                                <option selected>Choose...</option>
                                <option value="true">return questions with post notices</option>
                                <option value="false">return questions without post notices</option>
                                <option value="Omit">Elide constraint</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="wiki">Wiki</label>
                            <select id="wiki" class="form-control" onChange={handleParams} name="wiki" value={params.wiki}>
                                <option selected>Choose...</option>
                                <option value="true">return only community wiki questions</option>
                                <option value="false">return only non-community wiki questions</option>
                                <option value="Omit">Elide constraint</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Search</button>
                </form>

                // <form onSubmit={handleSubmit}>
                //     <input type="search" placeholder="Enter the question to search" name="q" value={params.q} onChange={handleParams} />
                //     <br />
                //     <label for="accepted">Accepted</label>
                //     <select id="accepted" onChange={handleParams} name="accepted" value={params.accepted}>
                //         <option value="true">return questions with accepted answers</option>
                //         <option value="false">return only questions without answers</option>
                //         <option value="Omit">Elide constraint</option>
                //     </select>
                //     <br />
                //     <input type="number" placeholder="Enter the minimum number of answers" name="answers" value={params.answers} onChange={handleParams} /><br />
                //     <input type="text" placeholder="Enter the text which must appear in questions' bodies" name="body" value={params.body} onChange={handleParams} /><br />
                //     <label for="closed">Closed</label>
                //     <select id="closed" onChange={handleParams} name="closed" value={params.closed}>
                //         <option value="true">return closed questions</option>
                //         <option value="false">return only open questions</option>
                //         <option value="Omit">Elide constraint</option>
                //     </select>
                //     <br />
                //     <label for="migrated">Migrated</label>
                //     <select id="migrated" onChange={handleParams} name="migrated" value={params.migrated}>
                //         <option value="true">return questions migrated away from site</option>
                //         <option value="false">return questions which are not migrated</option>
                //         <option value="Omit">Elide constraint</option>
                //     </select>
                //     <br />
                //     <label for="notice">Notice</label>
                //     <select id="notice" onChange={handleParams} name="notice" value={params.notice}>
                //         <option value="true">return questions with post notices</option>
                //         <option value="false">return questions without post notices</option>
                //         <option value="Omit">Elide constraint</option>
                //     </select>
                //     <br />
                //     <input type="text" placeholder="Enter the tags which are not related. Put semicolon(;) between the tags" name="nottagged" value={params.nottagged} onChange={handleParams} /><br />
                //     <input type="text" placeholder="Enter the related tags. Put semicolon(;) between the tags" name="tagged" value={params.tagged} onChange={handleParams} /><br />
                //     <input type="text" placeholder="Enter the title text" name="title" value={params.title} onChange={handleParams} /><br />
                //     <input type="text" placeholder="Enter the id of the user who must own the questions" name="user" value={params.user} onChange={handleParams} /><br />
                //     <input type="text" placeholder="Enter the url which is contained in the question post" name="url" value={params.url} onChange={handleParams} /><br />
                //     <input type="number" placeholder="Enter the minimum number of views of questions" name="views" value={params.views} onChange={handleParams} /><br />
                //     <label for="wiki">Wiki</label>
                //     <select id="wiki" onChange={handleParams} name="wiki" value={params.wiki}>
                //         <option value="true">return only community wiki questions</option>
                //         <option value="false">return only non-community wiki questions</option>
                //         <option value="Omit">Elide constraint</option>
                //     </select>
                //     <br />
                //     <button type='submit' onClick={handleSubmit}>Search</button>
                // </form>
            )}
            {data.map(
                (item, index) => (
                    <div key={index}>
                        <a rel="noopener noreferrer" href={item[1]} target="_blank" style={{ textDecoration: "none" }}>
                            <p>{item[0]}</p>
                        </a>
                    </div>
                )
            )}
            <button type="submit" className="btn btn-secondary" onClick={handleNextPage}>
                Next Page
            </button>
            {/* <form onSubmit={handleSubmit}>
                <input type="search" placeholder="Enter the question to search" value={search} onChange={handleChange} />
                <button type='submit' onClick={handleSubmit}>Search</button>
            </form> */}
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    data: state.Data.data,
    search:state.Data.search
})

export default connect(mapStateToProps,{setSearchInput})(Search)