import axios from "axios";
import qs from "qs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../Components/Categories";
import Pagination from "../Components/pagination";
import PizzaBlock from "../Components/pizzaBlock";
import PizzaSkeleton from "../Components/pizzaBlock/PizzaSkeleton";
import Sort from "../Components/Sort";
import { setFilters, setPageCount } from "../redux/slices/filterSlice";
function Main() {
  const navigate = useNavigate();
  const { sortType, selectedFilter, searchValue, currentPage, pageCount } =
    useSelector((state) => state.filter);
  const isSearch = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
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
          order: sortType.params,
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
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);

      dispatch(setFilters({ ...params }));
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
    if (isMounted) {
      const queryString = qs.stringify({
        sortType,
        selectedFilter,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    setIsMounted(true);
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
          <h2>Пиццы нету</h2>
        )}
      </div>
      <Pagination countPages={pageCount} />
    </>
  );
}

export default Main;
