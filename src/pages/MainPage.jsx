import Categories from '../Components/Categories';
import PizzaBlock from "../Components/pizzaBlock";
import Sort from "../Components/Sort";
import { useEffect, useState } from 'react';
import PizzaSkeleton from '../Components/pizzaBlock/PizzaSkeleton';
function Main() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetch('https://62e3c9643c89b95396d05783.mockapi.io/items').then(res => res.json())
    .then(res => {
      setItems(res)
      setIsLoading(false)
    })
  }, [])
  return (
    <>
      <div className="content__top">
        <Categories
          items={[
            "Все",
            "Мясные",
            "Вегетарианская",
            "Гриль",
            "Острые",
            "Закрытые",
          ]}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? (
          [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
        ) : items.length ? (
          items.map((item) => <PizzaBlock key={item.id} {...item} />)
        ) : (
          <h2>Пиццы нету</h2>
        )}
      </div>
    </>
  );
}

export default Main;
