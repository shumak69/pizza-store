import Header from './Header';
import Categories from './Categories';
import PizzaBlock from "./PizzaBlock";
import Sort from "./Sort";

import pizzas from '../pizza.json';

function App() {
  console.log(pizzas)
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
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
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              pizzas.map(item => <PizzaBlock key={item.id}
                {...item}
                />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
