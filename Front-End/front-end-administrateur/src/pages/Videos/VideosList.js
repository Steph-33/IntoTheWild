import React, {useState, useEffect} from 'react';
var axios = require('axios');

export default function VideosList() {
    const token = localStorage.getItem('token');
    const [allVideos, setAllVideos] = useState([]);

    const handleDelete = (event) => {
        event.preventDefault();
    
        const id = event.target.id;
        
        var config = {
          method: 'delete',
          url: `http://localhost:8080/api/videos/${id}`,
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };
    
        axios(config)
          .then(function (response) {
            const videos = allVideos.filter((video) =>{
              return video.id !== parseInt(id)
            })
            setAllVideos(videos);
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    };

      useEffect(() => {
        const getVideos = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/videos');
            setAllVideos(response.data.reverse());
          } catch (error) {
            console.error(error);
          }
        };
        getVideos();
      }, []);



    return (
    <div className="main-container">
      <h1 className="introduction-sentence">
        Vidéos en ligne
      </h1>
      {allVideos.map((video, index) => (
        <div className="object-container" method="POST" key={index}>
            <div className="object-name">{video.name}</div>
            <img
            src={video.image}
            alt="Prévisualisation de la Vidéo"
            />
            <button
              className="delete-button"
              id={video.id}
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
