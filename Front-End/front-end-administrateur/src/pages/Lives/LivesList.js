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
    <div>
      <h1>
        Voici la liste des différents concerts !
      </h1>
      {allLives.map((live, index) => (
        <div method="POST" key={index}>
            <div>{live.place}</div>
            <div>{live.date}</div>
            <button
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
