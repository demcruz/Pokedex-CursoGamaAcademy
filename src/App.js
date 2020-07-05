import React, { useEffect, useState } from 'react'

import api from './api'
import './index.css'

import './Card.js'


import logo from './assents/pokemon.png'



function App() {
  const [pokemon, setPokemon] = useState([])
  const [search, setSearch] = useState("")


  useEffect(() => {
    api.get().then((res) => res.data.results.map(item => {
      api.get(item.url).then((poke => {
        pokemon.push(poke.data)
        setPokemon([...pokemon])
      }))
    }))
  }, [])


  const filter = pokemon.filter(item => {
    return search !== "" ? item.name.includes(search) : item
  })


  console.log(pokemon)

  return (
    <div>

      <nav className="navbar">
        <img src={logo} alt="pokemon" width="20%;"/>
        <ul className="navbar-nav"></ul>
      </nav>


      <form method="get">
        <div className="boxbox">
          <input className="search" type="text" placeholder="Qual Poquemon Deseja comprar " onChange={e => setSearch(e.target.value)} />
          <input className="submit" value="GO" />
        </div>
      </form>


      <main>
        <section className="cards">
          {filter.map((res, i) => (
            <div className="card" key={i}>
              <div className="card__image-container">
                <img
                  src={res.sprites.front_default}
                  alt={res.sprites.front_default}
                />
              </div>
              <div className="card__content">
                <p className="card__title text--medium">
                  {res.name}
                </p>
                <div className="card__info">
                  <p className="text--medium">Free</p>
                  <button className="card__price text--medium">Comprar</button>
                </div>
              </div>
            </div>
          ))}

        </section>
      </main>
    </div>

  );
}

export default App;
