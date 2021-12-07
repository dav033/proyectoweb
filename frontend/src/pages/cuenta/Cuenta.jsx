import React from "react";
import axios from "axios";
import useAuth from "../../auth/useAuth";
import "./Cuenta.css";
import ModalC from "../../components/modal/modal.jsx";

import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
  Row,
  Col,
  Image,
  Modal,
  ListGroup,
} from "react-bootstrap";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink,
  NavLinkProps,
} from "react-router-dom";
import { useState, useEffect } from "react";
import useChange from "../../components/hooks/useChange.jsx";

function Cuenta() {
  const { user } = useAuth();

  const [file, setFile] = useState();

  const [imagen, setImagen] = useState();

  const [userName, setUserName] = useState();

  const [tamaño, setTamaño] = useState();

  const [pref, setPref] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [animeELection, setAnimeElection] = useState(false);
  const [MangaElection, setMangaElection] = useState(false);
  const [seriesElection, setSeriesElection] = useState(false);

  const [videoElection, setVideoElection] = useState(false);
  const [lightElection, setLightElection] = useState(false);
  const [librosElection, setLibrosELection] = useState(false);

  const [comicELection, setComicElection] = useState(false);
  const [peliELection, setPeliELection] = useState(false);
  const [musicaElection, setMusicaElection] = useState(false);

  const [fileUrl, setFileUrl] = useState(null);
  const [auxP, setAuxP] = useState();

  const [auxC, setAuxC] = useState([]);

  var aux = [];

  useChange("perfil");

  const handleClose3 = () => {
    setAuxC([]);
    setShow3(false);
  };

  const handleShow3 = () => {
    setShow3(true);
    setAuxC([]);
  };

  const prefe = [
    {
      titulo: null,
      color: "#ff6961",
    },

    {
      titulo: null,
      color: "#77dd77",
    },

    {
      titulo: null,
      color: "#b186f1",
    },
    {
      titulo: null,
      color: "#84b6f4 ",
    },

    {
      titulo: null,
      color: "#fdcae1",
    },

    {
      titulo: null,
      color: "#c5c6c8",
    },
    {
      titulo: null,
      color: "#b2e2f2",
    },

    {
      titulo: null,
      color: "#ffda9e",
    },

    {
      titulo: null,
      color: "#fdf9c4",
    },
  ];

  const prefList = [
    {
      nombre: "Anime",
    },

    {
      nombre: "Manga",
    },

    {
      nombre: "Series",
    },

    {
      nombre: "VideoJuegos",
    },

    {
      nombre: "Libros",
    },

    {
      nombre: "Novelas Ligeras",
    },

    {
      nombre: "Comics",
    },

    {
      nombre: "Peliculas",
    },

    {
      nombre: "Musica",
    },
  ];

  async function onChangeFile(e) {
    setFile(e.target.files[0]);

    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  }

  async function getInfo() {
    const res = await axios.get("/api/users/" + user.id);

    const aux1 = res.data;

    const img = aux1.user.profileImage;
    const usuario = aux1.user.userName;
    const preferences = aux1.user.preferences;

    setImagen(img);
    setUserName(usuario);
    setPref(preferences);
    setTamaño(preferences.length);
    setAuxP(preferences.length);
  }

  useEffect(() => {
    getInfo();
  }, []);

  async function addP(e, id) {
    function delay(n) {
      return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
      });
    }
    let element = document.getElementById(id);
    aux.push(id);
    element.className = "animate__animated animate__fadeOut";
    await delay(0.5);
    let padre = await element.parentNode;
    padre.removeChild(element);
  }

  async function saveP() {
    alert(aux);

    await axios.put("/api/users/" + user.id, {
      preferences: aux,
    });

    setAuxP(1);
    getInfo();
  }

  async function updatePreferences() {
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

    aux = [null];

    getInfo();

    handleClose3();
    handleClose2();
  }

  useEffect(() => {
    setAnimeElection(false);

    setMangaElection(false);

    setSeriesElection(false);

    setVideoElection(false);

    setLibrosELection(false);

    setLightElection(false);

    setComicElection(false);

    setPeliELection(false);

    setMusicaElection(false);

    for (let i = 0; i < pref.length; i++) {
      switch (pref[i]) {
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
        case "Libros":
          setLibrosELection(true);
          break;
        case "Novelas Ligeras":
          setLightElection(true);
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
    }
  }, [pref, show3]);

  function election(elec, value) {
    if (elec) {
      return (
        <Button className="eliminarP" onClick={() => eliminar(value)}>
          <i className="icon-eliminar"></i>
        </Button>
      );
    } else {
      return (
        <Button className="agregarP" onClick={() => agregar(value)}>
          <i className="icon-agregar"></i>
        </Button>
      );
    }
  }

  function AE(a) {
    switch (a) {
      case "Anime":
        return election(animeELection, a);

      case "Manga":
        return election(MangaElection, a);

      case "Series":
        return election(seriesElection, a);

      case "VideoJuegos":
        return election(videoElection, a);

      case "Libros":
        return election(librosElection, a);

      case "Novelas Ligeras":
        return election(lightElection, a);

      case "Comics":
        return election(comicELection, a);

      case "Peliculas":
        return election(peliELection, a);

      case "Musica":
        return election(musicaElection, a);

      default:
        return null;
    }
  }

  const agregar = (id) => {
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

      case "Libros":
        setLibrosELection(true);
        break;

      case "Novelas Ligeras":
        setLightElection(true);
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

  function eliminar(id) {
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

      case "Libros":
        setLibrosELection(false);
        break;

      case "Novelas Ligeras":
        setLightElection(false);
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
  }

  function showPreferences() {
    if (auxP === 0) {
      return (
        <>
          <div className="nopref">
            <h5
              style={{
                color: "black",
              }}
            >
              No eres miembro de ninguna categoria
            </h5>
            <Link
              id="plus"
              as={Button}
              style={{ color: "black", display: "inline" }}
              onClick={handleShow2}
            >
              &nbsp;
              <i className="icon-plus" style={{ color: "black" }}></i>{" "}
            </Link>
          </div>

          <ModalC
            show={show2}
            onHide={handleClose2}
            animation={false}
            centered
            onClick={saveP}
          >
            {prefList.map((item) => (
              <div
                className="add"
                style={{
                  display: "inline-block",
                  backgroundColor: prefe[i++].color,
                }}
                id={item.nombre}
              >
                <h5 style={{ margin: 0 }}>{item.nombre} </h5>
                &nbsp;
                <button onClick={(e) => addP(e, item.nombre)} id="addButton">
                  <i className="icon-plus" id="adios"></i>
                </button>
              </div>
            ))}
          </ModalC>
        </>
      );
    } else {
      return (
        <>
          <div
            className="prefCont"
            style={{ backgroundColor: "transparent", width: "100%" }}
          >
            {pref.map((item) => (
              <h5
                className="pref"
                style={{ backgroundColor: prefe[i++].color }}
              >
                {item}
              </h5>
            ))}

            <button
              className="botonEditar"
              onClick={handleShow3}
              style={{ margin: "0px" }}
            >
              {" "}
              <i className="icon-editar" id="editarBoton"></i>
            </button>

            <ModalC
              show={show3}
              onHide={handleClose3}
              animation={false}
              centered
              onClick={updatePreferences}
            >
              <ListGroup>
                {prefList.map((item) => (
                  <ListGroup.Item className="">
                    <n className="aa" style={{ fontSize: "20px" }}>
                      {item.nombre}
                    </n>
                    {AE(item.nombre)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ModalC>
          </div>
        </>
      );
    }
  }

  useEffect(() => {
    if (show === false) {
      setFileUrl(null);
    }
  }, [show]);
  var i = 0;

  async function subir(e) {
    handleClose();
    const formData = new FormData();
    formData.append("image", file);
    await axios.put(`/api/users/${user.id}/image`, formData);

    setFileUrl(null);

    getInfo();
  }

  function img() {
    if (fileUrl !== null) {
      return <img src={fileUrl} style={{ width: "200px" }} alt="img"></img>;
    }
  }
  return (
    <section class="seccion-perfil-usuario">
      <div class="perfil-usuario-header">
        <div class="perfil-usuario-portada">
          <div className="container2">
            <img src={imagen} alt="img-avatar"></img>
            <div className="overlay">
              <button className="icon" onClick={handleShow}>
                <i class="icon-camara"></i>
              </button>

              <ModalC
                show={show}
                onHide={handleClose}
                animation={false}
                centered
                onClick={subir}
              >
                <form>
                  <input type="file" onChange={(e) => onChangeFile(e)}></input>
                  {img()}
                </form>
              </ModalC>
            </div>
          </div>
        </div>
      </div>
      <div class="perfil-usuario-body">
        <div class="perfil-usuario-bio">
          <h3 class="titulo">{userName}</h3>

          {showPreferences()}
        </div>
        <div class="perfil-usuario-footer">
          <ul class="lista-datos">
            <li>
              <i class="icono fas fa-map-signs"></i> Direccion de usuario:
            </li>
            <li>
              <i class="icono fas fa-phone-alt"></i> Telefono:
            </li>
            <li>
              <i class="icono fas fa-briefcase"></i> Trabaja en.
            </li>
            <li>
              <i class="icono fas fa-building"></i> Cargo
            </li>
          </ul>
          <ul class="lista-datos">
            <li>
              <i class="icono fas fa-map-marker-alt"></i> Ubicacion.
            </li>
            <li>
              <i class="icono fas fa-calendar-alt"></i> Fecha nacimiento.
            </li>
            <li>
              <i class="icono fas fa-user-check"></i> Registro.
            </li>
            <li>
              <i class="icono fas fa-share-alt"></i> Redes sociales.
            </li>
          </ul>
        </div>
        <div class="redes-sociales">
          <a href="" class="boton-redes facebook fab fa-facebook-f">
            <i class="icon-facebook"></i>
          </a>
          <a href="" class="boton-redes twitter fab fa-twitter">
            <i class="icon-twitter"></i>
          </a>
          <a href="" class="boton-redes instagram fab fa-instagram">
            <i class="icon-instagram"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Cuenta;
