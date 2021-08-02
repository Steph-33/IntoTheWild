import React, { useState } from 'react';
import { useHistory } from 'react-router';
var axios = require('axios');

export default function Live() {
    const history = useHistory();
    const [live, setLive] = useState({
        place : '',
        address : '',
        date : '',
        image : ''
    });
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        'http://localhost:8080/images/image-neutre.png'
    );
    const token = localStorage.getItem('token');
    const firstname = localStorage.firstname;
    const handleChange = (event) => {
        setLive({...live, [event.target.name] : event.target.value})
    };
    const handleFile = (event) => {
        const [filename] = event.target.files;
        try{
            setImage({image:filename});
            setPreviewImage(URL.createObjectURL(filename));
        }
        catch(error){
            console.log(error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        var data = new FormData();
    
        data.append('image', image.image);
        data.append('place', live.place);
        data.append('address', live.address);
        data.append('date', live.date);
    
        var config = {
          method: 'post',
          url: 'http://localhost:8080/api/lives',
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          data: data,
        };
    
        axios(config)
          .then(function (response) {
            history.push('/home');
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    };
    return (
        <div 
        method="POST"
        action="/live"
        onSubmit={handleSubmit}
        className="input-container"
        >
            <h1>Bienvenue {firstname}</h1>
            <form encType="multipart/form-data">
                <input
                    type="text"
                    name="place"
                    placeholder="Entre le nom de la salle de concert"
                    value={live.place}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Entre l'adresse du concert"
                    value={live.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="date"
                    placeholder="Entre la date du concert"
                    value={live.date}
                    onChange={handleChange}
                    required
                />
                <div className="image-selection">
                    <div>
                        <label htmlFor="image">Sélectionne une image </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFile}
                            required
                        />
                    </div>
                    <img
                    className="preview-image"
                    src={previewImage}
                    alt="Prévisualisation"
                    />
                </div>
                <button type="submit">
                    Valider
                </button>
            </form>
        </div>
    )
}
