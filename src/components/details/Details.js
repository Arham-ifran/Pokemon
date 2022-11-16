import React, { useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Details() {

    const [nickname, setNickname] = useState(false);
    const [nicknameText, setNicknameText] = useState(null);
    const [nicknameTextMsg, setNicknameTextMsg] = useState(null);
    const [pokemon, setPokemon] = useState(null);
    const [sprites, setSprites] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [types, setTypes] = useState([]);
    const { id } = useParams();
    let navigate = useNavigate();
    
    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
    };

    useEffect(() =>{
        getPokemon()
    },[])

    const getPokemon = async () =>{
        fetch('https://pokeapi.co/api/v2/pokemon/'+id,{
            method: "GET" // default, so we can ignore
        })
        .then((res) => res.json())
        .then((res)=>{
            setSprites(res.sprites)
            setAbilities(res.abilities)
            setTypes(res.types)
            setPokemon(res)
        })
    }
    const addToCollection = (newPokemon) => {
        if(nicknameText){
            let localPokemons = localStorage.getItem('localPokemons');
            if(!localPokemons){
                localPokemons = []
            }else{
                localPokemons = JSON.parse(localPokemons)
            }
            let checkEntry = localPokemons.find(o => o.id === newPokemon.id);
            if(!checkEntry){
                newPokemon.nickname = nicknameText
                localPokemons.push(newPokemon)
                localStorage.setItem('localPokemons',JSON.stringify(localPokemons));
            }
            navigate('/my-list')
        }else{
            setNicknameTextMsg('Nickname is required')
        }
    }
    return (
        <div className="product-details">
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="images">
                                {
                                pokemon && pokemon.sprites &&
                                    <Slider {...settings} className="image-slider">    
                                        <div className="item">
                                            <div className="image">
                                                <img src={sprites.back_default} alt="name" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="image">
                                                <img src={sprites.back_shiny} alt="name" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="image">
                                                <img src={sprites.front_default} alt="name" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="image">
                                                <img src={sprites.front_shiny} alt="name" className="img-fluid" />
                                            </div>
                                        </div>
                                    </Slider>
                                }

                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="product-info">
                            <h2 className="name">{pokemon?.name}</h2>
                            <div className="info"><b>Weight: </b> {pokemon?.weight}</div>
                            <div className="ability-list mt-5">
                                <h5>Ability</h5>

                                <ul>
                                    {abilities.map((ability, index) => {
                                        if(!ability.is_hidden){
                                            return(
                                                <li key={index}>{ability.ability.name}</li>
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className="ability-list">
                                <h5>Type</h5>
                                <ul>
                                    {types.map((type, index) => {
                                        return(
                                            <li key={index}>{type.type.name}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="action-btn">
                                <button className="btn btn-secondary" onClick={() => setNickname(!nickname)}>Catch</button>
                            </div>
                            {nickname ? <div className="add-nickname">
                                <div className="form-wrapper">
                                    <label>Add Nick Name</label>
                                    <input type="text" name="nick" onChange={(e)=>setNicknameText(e.target.value)} value={nicknameText} className="form-control" />
                                    {nicknameTextMsg && <label className="error">{nicknameTextMsg}</label>}
                                </div>
                                <p to="#." onClick={()=>addToCollection({name:pokemon?.name, id:pokemon?.id})} className="btn btn-secondary">Save</p>
                            </div> : ''}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Details;
