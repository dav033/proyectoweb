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

import CardC from "../../components/card/card";

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
    switch (id) {
      case "Anime":
        setAnimeElection(true);
        break;
      case "Manga":
        setMangaElection(true);
        break;
      case "Series":
        setSeriesElection(true);
        break;
      case "VideoJuegos":
        setVideoElection(true);
        break;
      case "Novelas Ligeras":
        setLightElection(true);

        break;
      case "Libros":
        setLibrosELection(true);
        break;
      case "Comics":
        setComicElection(true);
        break;
      case "Peliculas":
        setPeliELection(true);
        break;
      case "Musica":
        setMusicaElection(true);
        break;

      default:
        break;
    }
  };

  const eliminar = (e, id) => {
    switch (id) {
      case "Anime":
        setAnimeElection(false);
        break;
      case "Manga":
        setMangaElection(false);
        break;
      case "Series":
        setSeriesElection(false);
        break;
      case "VideoJuegos":
        setVideoElection(false);
        break;
      case "Novelas Ligeras":
        setLightElection(false);
        break;
      case "Libros":
        setLibrosELection(false);
        break;
      case "Comics":
        setComicElection(false);
        break;
      case "Peliculas":
        setPeliELection(false);
        break;
      case "Musica":
        setMusicaElection(false);
        break;
      default:
        break;
    }
  };

  function eleccion(elec, value) {
    if (elec) {
      return (
        <button id="eliminar" onClick={(e) => eliminar(e, value)}>
          Eliminar
        </button>
      );
    } else {
      return (
        <button id="agregar" onClick={(e) => agregar(e, value)}>
          Agregar
        </button>
      );
    }
  }

  function agregarBoton(id) {
    switch (id) {
      case "Anime":
        return eleccion(animeELection, id);
      case "Manga":
        return eleccion(MangaElection, id);
      case "Series":
        return eleccion(seriesElection, id);
      case "VideoJuegos":
        return eleccion(videoElection, id);
      case "Libros":
        return eleccion(librosElection, id);

      case "Novelas Ligeras":
        return eleccion(lightElection, id);
      case "Comics":
        return eleccion(comicELection, id);
      case "Peliculas":
        return eleccion(peliELection, id);
      case "Musica":
        return eleccion(musicaElection, id);
      default:
        return null;
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

  function carouselItem(car) {
    return (
      <Carousel.Item>
        <CardGroup>
          {car.map((item) => (
            <CardC
              imagen={item.imagen}
              title={item.titulo}
              boton={agregarBoton(item.titulo)}
            >
              Esta categoria cuenta con &nbsp; <b>0</b> &nbsp; miembros
            </CardC>
          ))}
        </CardGroup>
      </Carousel.Item>
    );
  }
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
          {carouselItem(car1)}
          {carouselItem(car2)}
          {carouselItem(car3)}
        </Carousel>
        {finButton()}
      </div>
    );
  }

  return ControlledCarousel();
}

export default Preferences;
