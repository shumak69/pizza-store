import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Categories from "../Components/Categories";
import Pagination from '../Components/pagination';
import PizzaBlock from "../Components/pizzaBlock";
import PizzaSkeleton from "../Components/pizzaBlock/PizzaSkeleton";
import Sort from "../Components/Sort";
function Main() {
  const {sortType, selectedFilter} = useSelector(state => state.filter)
  const   selectedSort = sortType
  const {searchValue} = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0)
  const [countOfItems, setCountOfItems] = useState(0);

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://62e3c9643c89b95396d05783.mockapi.io/items?page=${currentPage + 1}&limit=4&${selectedFilter > 0 ? `category=${selectedFilter}` : ''}${searchValue ? `&search=${searchValue}` : ''}&sortBy=${selectedSort.type}&order=${selectedSort.params}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCountOfItems(res.count)
        setItems(res.items);
        setIsLoading(false);
      });
    // window.scrollTo(0, 0);
  }, [selectedFilter, selectedSort, searchValue, currentPage ]);
  const countPages = useMemo(() => {
    return Math.ceil(countOfItems / 4)
  }, [countOfItems])
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort/>
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
      <Pagination setCurrentPage={setCurrentPage} countPages={countPages}/>
    </>
  );
}

export default Main;
