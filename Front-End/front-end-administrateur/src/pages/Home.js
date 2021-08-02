import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    const firstname = localStorage.firstname;
    return (
    <div className="home-container">
      <h1>Bienvenue {firstname}</h1>
      <h3>Que souhaites-tu faire ? </h3>
      <div className="buttons-box">
        <div className="buttons">
          <Link to="/album">
            <button className="btn-style">
              Ajouter un album à la discographie
            </button>
          </Link>
          <Link to="/article">
            <button className="btn-style">Ajouter un article</button>
          </Link>
          <Link to="/live">
            <button className="btn-style">
              Ajouter un concert
            </button>
          </Link>
          <Link to="/member">
            <button className="btn-style">Ajouter un membre au groupe</button>
          </Link>
          <Link to="/picture">
            <button className="btn-style">
              Ajouter une photo à la galerie
            </button>
          </Link>
          <Link to="/video">
            <button className="btn-style">
              Ajouter une vidéo à la liste
            </button>
          </Link>
        </div>
        <div className="buttons">
          <Link to="/albums">
            <button className="btn-style">
              Voir la liste des albums
            </button>
          </Link>  
          <Link to="/articles">
            <button className="btn-style">Voir la liste des articles</button>
          </Link>
          <Link to="/lives">
            <button className="btn-style">
              Voir la liste des concerts
            </button>
          </Link>         
          <Link to="/members">
            <button className="btn-style">Voir la liste des membres du groupe</button>
          </Link>
          <Link to="/pictures">
            <button className="btn-style">
              Voir la galerie de photos
            </button>
          </Link>
          <Link to="/videos">
            <button className="btn-style">
              Voir la liste des vidéos
            </button>
          </Link>
        </div>
      </div>
    </div>
    )
}
