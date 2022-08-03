import React from "react";
import { Link } from "react-router-dom";
import CartEmptyImg from '../assets/img/empty-cart.png'
function CardEmpty() {
  return (
    <>
        <div className="container container--cart">
          <div className="cart cart--empty">
            <h2>
              Корзина пустая 😕
            </h2>
            <p>
              Вероятней всего, вы не заказывали ещё пиццу.
              <br />
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={CartEmptyImg} alt="Empty cart" />
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>
      </div>
    </>
  );
}

export default CardEmpty;
