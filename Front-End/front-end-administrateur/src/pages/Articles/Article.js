import React, {useState} from 'react';
import { useHistory } from 'react-router';
var axios = require('axios');

export default function Article() {
    const history = useHistory();
    const [article,setArticle] = useState({
        title : '',
        content : '',
        date : '',
        image : ''
    });
    const [image,setImage] = useState(null);
    const [previewImage,setPreviewImage] = useState(
        'http://localhost:8080/images/image-neutre.png'
    );
    const token = localStorage.getItem('token');
    const firstname = localStorage.firstname;
    const handleChange = (event) => {
        setArticle({...article, [event.target.name] : event.target.value});
    };
    const handleFile = (event) => {
        const [filename] = event.target.files;
        try{
            setImage({image : filename});
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
        data.append('title', article.title);
        data.append('content', article.content);
        data.append('date', article.date);
    
        var config = {
          method: 'post',
          url: 'http://localhost:8080/api/articles',
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
        action="/article"
        onSubmit={handleSubmit}
        >
            <h1>Bienvenue {firstname}</h1>
            <form encType="multipart/form-data">
            <input
                type="text"
                name="title"
                placeholder="Entre le titre de ton article"
                value={article.title}
                onChange={handleChange}
                required
            />
            <textarea
                type="text"
                name="content"
                placeholder="Contenu de l'article"
                value={article.content}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="date"
                placeholder="Date de diffusion de l'article"
                value={article.date}
                onChange={handleChange}
                required
            />
            <div>
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
