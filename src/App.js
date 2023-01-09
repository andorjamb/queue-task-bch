import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import Queue from './components/Queue';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [queue, setQueue] = useState({ first: null, last: null, size: 0 });
  const [pokemons, setPokemons] = useState([]);
  const [queueDisplay, setQueueDisplay] = useState([]);
  const [activeButton, setActiveButton] = useState(true);

  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }

  const enQueue = (e) => {
    let node = new Node(e.target.id);
    console.log(e.target.id);
    console.log(node);
    setActiveButton(true);
 

    let pokemonsList = pokemons;
    let i = pokemonsList.findIndex((pokemon) => pokemon.id == e.target.id);
    let pokeJoiningQueue = pokemonsList.splice(i, 1);
    setPokemons(pokemonsList);
    setQueueDisplay([...queueDisplay, pokeJoiningQueue[0]])


    if (queue.size === 0) {
      setQueue({
        ...queue,
        first: node,
        last: node,
        size: 1
      });
      return;
    }
    else {
      let currentLast = queue.last;
      let size = queue.size;
      currentLast.next = node;
      setQueue({
        ...queue,
        last: node,
        size: size + 1
      });
    }
  }

  const deQueue = () => {
    if (queue.first == null) {
      return null;
    }
    if (queue.size === 0) {
      setActiveButton(false);
      return null;
    }
    let first = queue.first;
    if (first === queue.last) {
      setQueue({ ...queue, first: null, last: null, size: 0 });
      setQueueDisplay({});
      return;
    }
    else {
      let first = queue.first;
      let size = queue.size;
      setQueue({ ...queue, first: first.next, size: size - 1 });
      let pokeJoiningQueue = queueDisplay;

      let newList = pokeJoiningQueue.filter((item) => item.id != first.value);
      setQueueDisplay(newList);
      return first;

    }
  }

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=30&offest=0')
      .then(res => {
        const fetches = res.data.results.map((p) => {
          return axios.get(p.url)
            .then((res) => res.data);
        });

        Promise.all(fetches)
          .then((res) => {
            setPokemons(res);
            setIsLoading(false);
          })
      })
  }, []);


  return (
    <div className="App">
      <header><h1>Queue App</h1></header>
      {isLoading ? <p>Still loading...</p> :

        <main>
          <h3>Click on a pokemon to add it to the queue. </h3>
          <div>
            {pokemons.map((item) => (
              <img id={item.id} key={item.id} onClick={(e) => enQueue(e)} src={item.sprites.other['official-artwork'].front_default} alt="pokemon" />))}

          </div>
          <div className='queue-container'>
            <Queue pokemons={queueDisplay} />

          </div>
          <div className='button-container'>

            <button id="dequeue" onClick={deQueue} className={
              activeButton ? 'active' : 'inActive'}>Dequeue</button>
          </div>
        </main>
      }
    </div>
  );
}

export default App;
