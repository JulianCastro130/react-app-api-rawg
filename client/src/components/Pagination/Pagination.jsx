import React from "react"
import Find from '../Find/Find'
import './pagination.css'

const Pagination = (props) => {
    let pages = [];
    for (let i = 1; i <= props.totalPages; i++) {
        pages.push(<button className="divPaginationPagesButton" onClick={() => props.handlePageChange(i)} key={i}>{i}</button>);
    }
    return (
        <div className="divPagination">
            <div className="divPaginationPages">{pages}</div>
            <Find className="divPaginationFind" />
        </div>
    )


}

export default Pagination