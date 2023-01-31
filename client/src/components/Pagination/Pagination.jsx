import React from "react"
import Find from '../Find/Find'
import style from './pagination.module.css'

const Pagination = (props) => {
    let pages = [];
    for (let i = 1; i <= props.totalPages; i++) {
        pages.push(<button className={style.button} onClick={() => props.handlePageChange(i)} key={i}>{i}</button>);
    }
    return (
        <div className={style.pagination}>
            <div className={style.div}>{pages}</div>
            <Find className={style.find} />
        </div>
    )


}

export default Pagination