import React, {useState} from 'react';
import { useHistory } from 'react-router';
var axios = require('axios');

export default function Picture() {
    const history = useHistory();
    const [picture, setPicture] = useState({
        name : '',
        date:'',
        image:''
    });
    const token = localStorage.getItem('token');
    const firstname = localStorage.firstname;
    const handleChange = (event) => {
        setPicture({...picture, [event.target.name]:event.target.value});
    };
    const [image,setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        'http://localhost:8080/images/image-neutre.png'
    );
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
    const handleSubmit = (event) => {
        event.preventDefault();

        var data = new FormData();
    
        data.append('image', image.image);
        data.append('name', picture.name);
        data.append('date', picture.date);
    
        var config = {
          method: 'post',
          url: 'http://localhost:8080/api/pictures',
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
    }

    return (
        <div
            method="POST"
            onSubmit={handleSubmit}
            className="input-container"
        >
            <h1>Bienvenue {firstname}</h1>
            <form encType="multipart/form-data">
                <input
                    type="text"
                    name="name"
                    placeholder="Donne un nom à la photo"
                    value={picture.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="date"
                    placeholder="Date de la photo"
                    value={picture.date}
                    onChange={handleChange}
                    required
                />
                <div className="image-selection">
                    <div>
                        <label htmlFor="image">Sélectionne une photo</label>
                        <input
                            type="file"
                            name="picture"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFile}
                            required
                        />
                    </div>
                    <img
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
