import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import styles from './pagination.module.scss'
import {setCurrentPage} from '../../redux/slices/filterSlice'
import { RootState } from "../../redux/store";

type PaginationProps = {
  countPages: number
}

function Pagination({countPages} : PaginationProps) {
  const currentPage = useSelector<RootState, number>(state => state.filter.currentPage)
  const dispatch = useDispatch();
  if(!countPages) {
    return null;
  }
  return (
    <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => dispatch(setCurrentPage(e.selected))}
        pageRangeDisplayed={4}
        pageCount={countPages}
        previousLabel="<"
        // renderOnZeroPageCount={null}
        forcePage={currentPage}
      />
  )
}


export default Pagination