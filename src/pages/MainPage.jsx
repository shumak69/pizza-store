import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import Categories from "../Components/Categories";
import Pagination from "../Components/pagination";
import PizzaBlock from "../Components/pizzaBlock";
import PizzaSkeleton from "../Components/pizzaBlock/PizzaSkeleton";
import Sort, { list } from "../Components/Sort";
import { setFilters, setPageCount } from "../redux/slices/filterSlice";
function Main() {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  const { sortType, selectedFilter, searchValue, currentPage, pageCount } =
    useSelector((state) => state.filter);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(`https://62e3c9643c89b95396d05783.mockapi.io/items?`, {
        params: {
          page: currentPage + 1,
          limit: 4,
          category: selectedFilter > 0 ? selectedFilter : null,
          sortBy: sortType.type,
          order: sortType.params || "asc",
          search: searchValue ? searchValue : "",
        },
      })
      .then((res) => {
        if (Math.ceil(res.data.count / 4) !== pageCount) {
          dispatch(setPageCount(res.data.count));
        }
        setItems(res.data.items);
        setIsLoading(false);
      });
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
      fetchPizzas();
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
        {isLoading ? (
          [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
        ) : items.length ? (
          items.map((item) => <PizzaBlock key={item.id} {...item} />)
        ) : (
          <h2 className="content__empty">Пицца не найдена</h2>
        )}
      </div>
      <Pagination countPages={pageCount} />
    </>
  );
}

export default Main;
