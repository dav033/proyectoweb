import React from "react";

import owo from "../../assets/images/manga.jpeg";
import uwu from "../../assets/images/oo.jpg";
import anime from "../../assets/images/anime2.png";
import manga from "../../assets/images/manga.jpg";
import series from "../../assets/images/series.jpg";
import videojuegos from "../../assets/images/videojuegos.jpg";
import libros from "../../assets/images/libros.jpg";
import ln from "../../assets/images/ln.jpeg";
import musica from "../../assets/images/musica.jpg";
import comics from "../../assets/images/comics.jpg";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "./preferences.css";
import peliculas from "../../assets/images/peliculas.jpg";
import { useEffect, useState } from "react";

import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
  Row,
  Col,
  Carousel,
  Card,
  CardGroup,
} from "react-bootstrap";
function Preferences() {
  const [animeELection, setAnimeElection] = useState(false);
  const [MangaElection, setMangaElection] = useState(false);
  const [seriesElection, setSeriesElection] = useState(false);

  const [videoElection, setVideoElection] = useState(false);
  const [lightElection, setLightElection] = useState(false);
  const [librosElection, setLibrosELection] = useState(false);

  const [comicELection, setComicElection] = useState(false);
  const [peliELection, setPeliELection] = useState(false);
  const [musicaElection, setMusicaElection] = useState(false);
  const [position, setPosition] = useState(false);

  const [index, setIndex] = useState(0);
  const history = useHistory();

  var aux = [];

  const { fromRegister, setFromRegister } = useAuth();

  const { user, setUser } = useAuth();

  const agregar = (e, id) => {
    console.log("funcionando");
    if (id === "Anime") {
      setAnimeElection(true);
    }

    if (id === "Manga") {
      setMangaElection(true);
    }

    if (id === "Series") {
      setSeriesElection(true);
    }

    if (id === "VideoJuegos") {
      setVideoElection(true);
    }

    if (id === "Libros") {
      setLibrosELection(true);
    }
    if (id === "Novelas Ligeras") {
      setLightElection(true);
    }

    if (id === "Comics") {
      setComicElection(true);
    }

    if (id === "Peliculas") {
      setPeliELection(true);
    }

    if (id === "Musica") {
      setMusicaElection(true);
    }
  };

  const eliminar = (e, id) => {
    console.log("funcionando");
    if (id === "Anime") {
      setAnimeElection(false);
    }

    if (id === "Manga") {
      setMangaElection(false);
    }

    if (id === "Series") {
      setSeriesElection(false);
    }

    if (id === "VideoJuegos") {
      setVideoElection(false);
    }

    if (id === "Libros") {
      setLibrosELection(false);
    }

    if (id === "Novelas Ligeras") {
      setLightElection(false);
    }

    if (id === "Comics") {
      setComicElection(false);
    }

    if (id === "Peliculas") {
      setPeliELection(false);
    }

    if (id === "Musica") {
      setMusicaElection(false);
    }
  };

  function agregarBoton(id) {
    //return (<button onClick={(e) => agregar(e, id)}>Agregar</button>)

    if (id === "Anime") {
      if (animeELection === false) {
        return (
          <button id="agregar" onClick={(e) => agregar(e, id)}>
            Agregar
          </button>
        );
      } else {
        return (
          <>
            <button onClick={(e) => eliminar(e, id)} id="eliminar">
              Eliminar
            </button>
          </>
        );
      }
    }

    if (id === "Manga") {
      if (MangaElection === false) {
        return (
          <button onClick={(e) => agregar(e, id)} id="agregar">
            Agregar
          </button>
        );
      } else {
        return (
          <button onClick={(e) => eliminar(e, id)} id="eliminar">
            Eliminar
          </button>
        );
      }
    }

    if (id === "Series") {
      if (seriesElection === false) {
        return (
          <button onClick={(e) => agregar(e, id)} id="agregar">
            Agregar
          </button>
        );
      } else {
        return (
          <button onClick={(e) => eliminar(e, id)} id="eliminar">
            Eliminar
          </button>
        );
      }
    }

    if (id === "VideoJuegos") {
      if (videoElection === false) {
        return (
          <button onClick={(e) => agregar(e, id)} id="agregar">
            Agregar
          </button>
        );
      } else {
        return (
          <button onClick={(e) => eliminar(e, id)} id="eliminar">
            Eliminar
          </button>
        );
      }
    }

    if (id === "Novelas Ligeras") {
      if (lightElection === false) {
        return (
          <button onClick={(e) => agregar(e, id)} id="agregar">
            Agregar
          </button>
        );
      } else {
        return (
          <button onClick={(e) => eliminar(e, id)} id="eliminar">
            Eliminar
          </button>
        );
      }
    }

    if (id === "Libros") {
      if (librosElection === false) {
        return (
          <button onClick={(e) => agregar(e, id)} id="agregar">
            Agregar
          </button>
        );
      } else {
        return (
          <button onClick={(e) => eliminar(e, id)} id="eliminar">
            Eliminar
          </button>
        );
      }
    }

    if (id === "Comics") {
      if (comicELection === false) {
        return (
          <button onClick={(e) => agregar(e, id)} id="agregar">
            Agregar
          </button>
        );
      } else {
        return (
          <button onClick={(e) => eliminar(e, id)} id="eliminar">
            Eliminar
          </button>
        );
      }
    }

    if (id === "Peliculas") {
      if (peliELection === false) {
        return (
          <button onClick={(e) => agregar(e, id)} id="agregar">
            Agregar
          </button>
        );
      } else {
        return (
          <button onClick={(e) => eliminar(e, id)} id="eliminar">
            Eliminar
          </button>
        );
      }
    }

    if (id === "Musica") {
      if (musicaElection === false) {
        return (
          <button onClick={(e) => agregar(e, id)} id="agregar">
            Agregar
          </button>
        );
      } else {
        return (
          <button onClick={(e) => eliminar(e, id)} id="eliminar">
            Eliminar
          </button>
        );
      }
    }
  }
  const car1 = [
    {
      titulo: "Anime",
      imagen: anime,
    },

    {
      titulo: "Manga",
      imagen: manga,
    },

    {
      titulo: "Series",
      imagen: series,
    },
  ];

  const car2 = [
    {
      titulo: "VideoJuegos",
      imagen: videojuegos,
    },

    {
      titulo: "Libros",
      imagen: libros,
    },

    {
      titulo: "Novelas Ligeras",
      imagen: ln,
    },
  ];

  const car3 = [
    {
      titulo: "Comics",
      imagen: comics,
    },

    {
      titulo: "Peliculas",
      imagen: peliculas,
    },

    {
      titulo: "Musica",
      imagen: musica,
    },
  ];
  function finButton() {
    if (position === true) {
      return (
        <button className="fin" onClick={(e) => finalizar(e)}>
          Finalizar
        </button>
      );
    }
  }
  console.log(position);

  async function finalizar() {
    if (animeELection === true) {
      aux.push("Anime");
    }

    if (MangaElection === true) {
      aux.push("Manga");
    }

    if (seriesElection === true) {
      aux.push("Series");
    }

    if (videoElection === true) {
      aux.push("VideoJuegos");
    }

    if (librosElection === true) {
      aux.push("Libros");
    }

    if (lightElection === true) {
      aux.push("Novelas Ligeras");
    }

    if (comicELection === true) {
      aux.push("Comics");
    }

    if (peliELection === true) {
      aux.push("Peliculas");
    }

    if (musicaElection === true) {
      aux.push("Musica");
    }

    await axios.put("/api/users/" + user.id, {
      preferences: aux,
    });

    setFromRegister(false);
    history.push("/inicio");
  }

  useEffect(() => {
    console.log(index);
    if (index === 0) {
      document.getElementsByClassName(
        "carousel-control-prev"
      )[0].style.display = "none";
    }
    if (index === 1) {
      document.getElementsByClassName(
        "carousel-control-prev"
      )[0].style.display = "inline";
      document.getElementsByClassName(
        "carousel-control-next"
      )[0].style.display = "inline";
    }

    if (index === 2) {
      document.getElementsByClassName(
        "carousel-control-next"
      )[0].style.display = "none";

      setPosition(true);
    }
  }, [index]);

  function ControlledCarousel() {
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return (
      <div className="cont">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval={null}
          style={{ marginTop: "120px" }}
        >
          <Carousel.Item>
            <CardGroup>
              {car1.map((item) => (
                <Card bg={"dark"}>
                  <Card.Img variant="top" src={item.imagen} />
                  <Card.Body>
                    <Card.Title
                      className="text-center"
                      style={{ color: "white" }}
                    >
                      {item.titulo}
                    </Card.Title>
                    <br></br>
                    <Card.Text className="bodyCard text-center">
                      Esta categoria cuenta con &nbsp; <b>0</b> &nbsp; miembros
                    </Card.Text>
                    <br></br>
                    {agregarBoton(item.titulo)}
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
          </Carousel.Item>

          <Carousel.Item>
            <CardGroup>
              {car2.map((item) => (
                <Card bg={"dark"}>
                  <Card.Img variant="top" src={item.imagen} />
                  <Card.Body>
                    <Card.Title
                      className="text-center"
                      style={{ color: "white" }}
                    >
                      {item.titulo}
                    </Card.Title>
                    <br></br>
                    <Card.Text className="bodyCard text-center">
                      Esta categoria cuenta con &nbsp; <b>0</b> &nbsp; miembros
                    </Card.Text>
                    <br></br>
                    {agregarBoton(item.titulo)}
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
          </Carousel.Item>
          <Carousel.Item>
            <CardGroup>
              {car3.map((item) => (
                <Card bg={"dark"}>
                  <Card.Img variant="top" src={item.imagen} />
                  <Card.Body>
                    <Card.Title
                      className="text-center"
                      style={{ color: "white" }}
                    >
                      {item.titulo}
                    </Card.Title>
                    <br></br>
                    <Card.Text className="bodyCard text-center">
                      Esta categoria cuenta con &nbsp; <b>0</b> &nbsp; miembros
                    </Card.Text>
                    <br></br>
                    {agregarBoton(item.titulo)}
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
          </Carousel.Item>
        </Carousel>
        {finButton()}
      </div>
    );
  }

  return ControlledCarousel();
}

export default Preferences;
