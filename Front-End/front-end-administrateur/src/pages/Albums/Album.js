import React, {useState} from 'react';
import { useHistory } from 'react-router';
var axios = require('axios');

export default function Album() {
    const history = useHistory();
    const [album, setAlbum] = useState({
        title : '',
        date : '',
        set_list : '',
        price : '',
        image : ''
    });
    const [image,setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        'http://localhost:8080/images/image-neutre.png'
    );
    const token = localStorage.getItem('token');
    const firstname = localStorage.firstname;
    const handleChange = (event) => {
        setAlbum({...album, [event.target.name]: event.target.value})
    };
    const handleFile = (event) => {
        const [filename] = event.target.files;
        try{
            setImage({image : filename});
            setPreviewImage(URL.createObjectURL(filename))
        }
        catch(error){
            console.log(error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        
        var data = new FormData();
    
        data.append('image', image.image);
        data.append('title', album.title);
        data.append('date', album.date);
        data.append('set_list', album.set_list);
        data.append('price', album.price);
    
        var config = {
          method: 'post',
          url: 'http://localhost:8080/api/albums',
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
        action="/album"
        onSubmit={handleSubmit}
        >
            <h1>Bienvenue {firstname}</h1>
            <form encType="multipart/form-data">
                <input
                    type="text"
                    name="title"
                    placeholder="Entre le titre de l'album"
                    value={album.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="date"
                    placeholder="Date de parution de l'album"
                    value={album.date}
                    onChange={handleChange}
                    required
                />
                <textarea
                    type="text"
                    name="set_list"
                    placeholder="Entre la liste des morceaux"
                    value={album.set_list}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Prix de l'album"
                    value={album.price}
                    onChange={handleChange}
                    required
                />
                <div>
                    <div>
                        <label htmlFor="Image">Sélectionne une image</label>
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
                        alt="Pochette d'Album"
                    />
                </div>
                <button type="submit">
                    Valider
                </button>
            </form>
        </div>
    )
}
