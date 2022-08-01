import ReactPaginate from "react-paginate";
import styles from './pagination.module.scss'
function Pagination({setCurrentPage, countPages}) {
  return (
    <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => setCurrentPage(e.selected)}
        pageRangeDisplayed={4}
        pageCount={countPages}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
  )
}

export default Pagination