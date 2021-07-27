import React, {useState, useEffect} from 'react'
var axios = require('axios');

export default function ArticlesList() {
    const token = localStorage.getItem('token');
    const [allArticles, setAllArticles] = useState([]);

    const handleDelete = (event) => {
        event.preventDefault();
    
        const id = event.target.id;
        
        var config = {
          method: 'delete',
          url: `http://localhost:8080/api/articles/${id}`,
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };
    
        axios(config)
          .then(function (response) {
            const articles = allArticles.filter((article) =>{
              return article.id !== parseInt(id)
            })
            setAllArticles(articles);
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      useEffect(() => {
        const getArticles = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/articles');
            setAllArticles(response.data.reverse());
          } catch (error) {
            console.error(error);
          }
        };
        getArticles();
      }, []);

    return (
    <div>
      <h1>
        Voici la liste des différents articles !
      </h1>
      {allArticles.map((article, index) => (
        <div method="POST" key={index}>
            <div>{article.title}</div>
            <button
              id={article.id}
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
