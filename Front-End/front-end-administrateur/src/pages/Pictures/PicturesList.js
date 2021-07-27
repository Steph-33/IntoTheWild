import React, { useState, useEffect } from 'react';
var axios = require('axios');

export default function PicturesList() {
    const token = localStorage.getItem('token');
    const [allPictures, setAllPictures] = useState([]);

    const handleDelete = (event) => {
        event.preventDefault();
    
        const id = event.target.id;
        
        var config = {
          method: 'delete',
          url: `http://localhost:8080/api/pictures/${id}`,
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };
    
        axios(config)
          .then(function (response) {
            const pictures = allPictures.filter((picture) =>{
              return picture.id !== parseInt(id)
            })
            setAllPictures(pictures);
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    };

      useEffect(() => {
        const getPictures = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/pictures');
            setAllPictures(response.data.reverse());
          } catch (error) {
            console.error(error);
          }
        };
        getPictures();
      }, []);

    return (
    <div>
      <h1>
        Galerie de Photos
      </h1>
      {allPictures.map((picture, index) => (
        <div method="POST" key={index}>
            <div>{picture.name}</div>
            <img
                src={picture.image}
                alt="Prévisualisation"
            />
            <button
              id={picture.id}
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
