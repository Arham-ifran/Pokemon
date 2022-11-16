import React, { useState, useEffect} from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pokemon from '../../assets/images/1.png';

function MyList() {
    const [pokemons, setPokemons] = useState([]);
    useEffect(() =>{
        let localPokemons = localStorage.getItem('localPokemons');
        if(!localPokemons){
            localPokemons = []
        }else{
            localPokemons = JSON.parse(localPokemons)
        }
        setPokemons(localPokemons)
    },[])
    const release = (id) => {
        let pokemons_ = pokemons

        let index = pokemons_.findIndex(o => o.id === id);
        delete pokemons_[index]
        pokemons_ = pokemons_.filter(pokemon => pokemon)
        localStorage.setItem('localPokemons',JSON.stringify(pokemons_));
        setPokemons(pokemons_)

    }
    return (
        <div className="list-wrapper">

            <Container>
                <div className="heading text-center mb-5">
                    <h2>My Pokemon List</h2>
                    <p>{pokemons.length} Pokemons</p>
                </div>
                <div className="items-list">

                    <Row>
                        {pokemons.map((pokemon, index)=>{
                            return(
                                <Col lg={3} md={4} sm={6} className="mb-4" key={index}>
                                    <div className="item">
                                        <Link to={`/details/${pokemon.id}`}>
                                            <div className="image">
                                                <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/'+pokemon.id+'.png'} alt="" className="img-fluid" />
                                            </div>
                                            <h4 className="name">{pokemon.name}</h4>
                                            <h5 className="nick">{pokemon.nickname}</h5>
                                        </Link>
                                        <button className="btn btn-secondary mt-3" onClick={()=>release(pokemon.id)}>Release</button>
                                    </div>
                                </Col>

                            )
                        })}

                    </Row>


                </div>
            </Container>
        </div>
    );
}

export default MyList;
