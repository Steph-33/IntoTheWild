import React, { useState, useEffect } from 'react';
var axios = require('axios');

export default function LivesList() {
    const token = localStorage.getItem('token');
    const [allLives, setAllLives] = useState([]);

    const handleDelete = (event) => {
        event.preventDefault();
    
        const id = event.target.id;
        
        var config = {
          method: 'delete',
          url: `http://localhost:8080/api/lives/${id}`,
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };
    
        axios(config)
          .then(function (response) {
            const lives = allLives.filter((live) =>{
              return live.id !== parseInt(id)
            })
            setAllLives(lives);
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      useEffect(() => {
        const getLives = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/lives');
            setAllLives(response.data.reverse());
          } catch (error) {
            console.error(error);
          }
        };
        getLives();
      }, []);

    return (
    <div className="main-container">
      <h1 className="introduction-sentence">
        Voici la liste des différents concerts !
      </h1>
      {allLives.map((live, index) => (
        <div className="object-container" method="POST" key={index}>
            <div className="object-place">{live.place}</div>
            <div className="object-date">{live.date}</div>
            <button
              className="delete-button"
              id={live.id}
              onClick={handleDelete}
              type="submit"
            >
              Supprimer
            </button>
        </div>
      ))}
    </div>
    )
}
