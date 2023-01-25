import React from "react"

const Pagination = (props) => {
    let pages = [];
    for (let i = 1; i <= props.totalPages; i++) {
        pages.push(<button onClick={() => props.handlePageChange(i)} key={i}>{i}</button>);
    }
    return <div>{pages}</div>;
}

export default Pagination