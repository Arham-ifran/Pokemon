import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pokemon from '../../assets/images/1.png';
import InfiniteScroll from "react-infinite-scroll-component";

function List() {
    const [pokemons, setPokemons] = useState([])
    // const [limit, setLimit] = useState(20)
    // const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(0)
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    useEffect(() =>{
        getPokemons()
    },[])

    const getPokemons = async () =>{
        fetch(url,{
            method: "GET" // default, so we can ignore
        })
        .then((res) => res.json())
        .then((res)=>{
            let {count, next, results} = res
            setTotal(count)
            setUrl(next)
            let pokemons_ = pokemons
            setPokemons(pokemons_.concat(results) )
        })
    }
    return (
        <div className="list-wrapper">

            <Container>
                <div className="heading text-center mb-5">
                    <h2>Generation</h2>
                    <p>{total} Pokemon</p>
                </div>
                <div className="items-list">

                    
                        {/* {pokemons.map((pokemon, index) => {
                            return(
                                <Col lg={3} md={4} sm={6} className="mb-4" key={index}>
                                    <div className="item">
                                        <Link to="/details">
                                            <div className="image">
                                                <img src={Pokemon} alt="" className="img-fluid" />
                                            </div>
                                            <h4 className="name">{pokemon.name}</h4>
                                        </Link>
                                    </div>
                                </Col>

                            )
                        })} */}
                        <InfiniteScroll
                            dataLength={pokemons.length}
                            next={()=>getPokemons()}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                            >
                            <Row>
                            {pokemons.map((pokemon, index) => {
                                return(
                                    <Col lg={3} md={4} sm={6} className="mb-4" key={index}>
                                        <div className="item">
                                            <Link to={`/details/${pokemon.url.split('/').at(-2)}`}>
                                                <div className="image">
                                                    <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/'+pokemon.url.split('/').at(-2)+'.png'} alt="" className="img-fluid" />
                                                </div>
                                                <h4 className="name">{pokemon.name}</h4>
                                            </Link>
                                        </div>
                                    </Col>

                                    )   
                                })}
                            </Row>
                        </InfiniteScroll>



                </div>
            </Container>
        </div>
    );
}

export default List;
