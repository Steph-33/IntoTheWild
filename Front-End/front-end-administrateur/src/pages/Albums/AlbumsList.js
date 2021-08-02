import React, {useState, useEffect} from 'react';
var axios = require('axios');

export default function AlbumsList() {
    const token = localStorage.getItem('token');
    const [allAlbums,setAllAlbums] = useState([]);

    const handleDelete = (event) => {
        event.preventDefault();
    
        const id = event.target.id;
        
        var config = {
          method: 'delete',
          url: `http://localhost:8080/api/albums/${id}`,
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };
    
        axios(config)
          .then(function (response) {
            const albums = allAlbums.filter((album) =>{
              return album.id !== parseInt(id)
            })
            setAllAlbums(albums);
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      useEffect(() => {
        const getAlbums = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/albums');
            setAllAlbums(response.data.reverse());
          } catch (error) {
            console.error(error);
          }
        };
        getAlbums();
      }, []);
      
    return (
    <div className="main-container">
      <h1 className="introduction-sentence">
        Voici la liste des différents albums !
      </h1>
      {allAlbums.map((album, index) => (
        <div className="object-container" method="POST" key={index}>
            <div className="object-title">{album.title}</div>
            <button
              className="delete-button"
              id={album.id}
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
