import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import styles from './pagination.module.scss'
import {setCurrentPage} from '../../redux/slices/filterSlice.js'
function Pagination({countPages}) {
  const currentPage = useSelector(state => state.filter.currentPage)
  const dispatch = useDispatch();
  return (
    <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => dispatch(setCurrentPage(e.selected))}
        pageRangeDisplayed={4}
        pageCount={countPages}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPage}
      />
  )
}

export default Pagination