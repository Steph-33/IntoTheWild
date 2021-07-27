import React, { useState } from 'react'
import { useHistory } from 'react-router';
var axios = require('axios');

export default function Member() {
    const history = useHistory();
    const [member, setMember] = useState({
        name : '',
        introduction : '',
        description : '',
        image :''
    });
    const [image,setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        'http://localhost:8080/images/image-neutre.png'
    );
    const token = localStorage.getItem('token');
    const firstname = localStorage.firstname;
    const handleChange = (event) => {
        setMember({...member, [event.target.name] : event.target.value})
    };
    const handleFile = (event) => {
        const [filename] = event.target.files;
        try{
            setImage ({image : filename});
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
        data.append('name', member.name);
        data.append('introduction', member.introduction);
        data.append('description', member.description);
    
        var config = {
          method: 'post',
          url: 'http://localhost:8080/api/members',
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
      action="/member"
      onSubmit={handleSubmit}
    >
      <h1>Bienvenue {firstname}</h1>
      <form encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Entre le nom du membre que tu souhaites ajouter"
          value={member.name}
          onChange={handleChange}
          required
        />
        <textarea
          type="text"
          name="introduction"
          placeholder="Texte d'introduction"
          value={member.introduction}
          onChange={handleChange}
          required
        />
        <textarea
          type="text"
          name="description"
          placeholder="Description du Membre"
          value={member.description}
          onChange={handleChange}
          required
        />
        <div>
          <div>
            <label htmlFor="image">Sélectionne une image </label>
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
        <button type="submit">
          Valider
        </button>
      </form>
    </div>
    )
}
