import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import Categories from "../Components/Categories";
import Pagination from "../Components/pagination";
import PizzaBlock from "../Components/pizzaBlock";
import PizzaSkeleton from "../Components/pizzaBlock/PizzaSkeleton";
import Sort, { list } from "../Components/Sort";
import { setFilters, setPageCount } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

function Main() {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  const { sortType, selectedFilter, searchValue, currentPage, pageCount } =
    useSelector((state) => state.filter);
  const {items, status} = useSelector(state => state.pizzas)
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const getPizzas = () => {
    // setIsLoading(true);
    // axios
    //   .get(`https://62e3c9643c89b95396d05783.mockapi.io/items?`, {
    //     params: {
    //       page: currentPage + 1,
    //       limit: 4,
    //       category: selectedFilter > 0 ? selectedFilter : null,
    //       sortBy: sortType.type,
    //       order: sortType.params || "asc",
    //       search: searchValue ? searchValue : "",
    //     },
    //   })
      dispatch(fetchPizzas({currentPage, selectedFilter, sortType, searchValue}))
      .then(({payload}) => {
        const res = payload
        if (Math.ceil((res?.count || 0) / 4) !== pageCount) {
          dispatch(setPageCount(res?.count || 0));
        }
      })
  };

  useEffect(() => {
    if (location.search) {
      const currentPage = searchParams.get("currentPage");
      const selectedFilter = searchParams.get("selectedFilter");
      const sortType = searchParams.get("sortType");
      const sort = list.find((obj) => obj.type === sortType);
      dispatch(
        setFilters({
          sortType: sort || {
            type: "rating",
            name: "популярности",
            params: "asc",
          },
          selectedFilter: selectedFilter || 0,
          currentPage: currentPage || 0,
        })
      );
      isSearch.current = true;
    }
  }, []);
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [selectedFilter, sortType, searchValue, currentPage]);
  useEffect(() => {
    if (isMounted.current) {
      const filters = {};
      if (sortType.type != "rating") {
        filters.sortType = sortType.type;
      }
      if (currentPage != 0) {
        console.log(pageCount)
        filters.currentPage = currentPage;
      }
      if (selectedFilter != 0) {
        filters.selectedFilter = selectedFilter;
      }
      setSearchParams(filters);
    }
    isMounted.current = true;
  }, [selectedFilter, sortType, currentPage]);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'error' ? (<h2 className="content__empty">Произошла ошибка, не удалось найти пиццы</h2>) : status === 'loading' ? (
          [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
        ) : items.length ? (
          items.map((item) => <PizzaBlock key={item.id} {...item} />)
        ) : (
          <h2 className="content__empty">Пицца не найдена</h2>
        )}
        {}
      </div>
      <Pagination countPages={pageCount} />
    </>
  );
}

export default Main;
