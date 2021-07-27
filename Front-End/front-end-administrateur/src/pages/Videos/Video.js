import React, {useState} from 'react';
import { useHistory } from 'react-router';
var axios = require('axios');

export default function Video() {
    const history = useHistory();
    const [video, setVideo] = useState({
        name:'',
        date:'',
        link:'',
        image:''
    });
    const handleChange = (event)=>{
        setVideo({...video, [event.target.name]:event.target.value});
    };
    const token = localStorage.getItem('token');
    const firstname = localStorage.firstname;
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        'http://localhost:8080/images/image-neutre.png'
    );
    const handleFile = (event) => {
        const [filename] = event.target.files
        try{
            setImage({image:filename})
            setPreviewImage(URL.createObjectURL(filename))
        }
        catch(error){
            console.log(error);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        var data = new FormData();
    
        data.append('image', image.image);
        data.append('name', video.name);
        data.append('date', video.date);
        data.append('link', video.link);
    
        var config = {
          method: 'post',
          url: 'http://localhost:8080/api/videos',
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
            onSubmit={handleSubmit}
        >
            <h1>Bienvenue {firstname}</h1>
            <form encType= "multipart/form-data">
                <input
                    type="text"
                    name="name"
                    placeholder="Entre le nom de la vidéo"
                    value={video.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="date"
                    placeholder="Date de la vidéo"
                    value={video.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="link"
                    placeholder="Lien vers la vidéo"
                    value={video.link}
                    onChange={handleChange}
                    required
                />
                <div>
                    <div>
                        <label htmlFor="image">Sélectionne l'image illustrant la vidéo</label>
                        <input
                            type="file"
                            name="image"
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
                <button type="submit">Valider</button>
            </form>
        </div>
    )
}
