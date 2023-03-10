import React from 'react';

const Queue = ({ pokemons }) => {

    return (
        <div>
            {pokemons.length !== 0 ?
                pokemons.map((item) => (
                    <img id={item.id} key={item.id} title={item.id} src={item.sprites.other['official-artwork'].front_default} alt="pokemon" />))
                : null
            }
        </div>
    );
};

export default Queue;