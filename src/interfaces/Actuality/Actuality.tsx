import { useEffect, useState } from "react";
import { getActuality } from "utils/api/api";
import "./Actuality.scss";
import Article from "./Article/Article";

function Actuality() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getActuality().then((data) => {
      setArticles(data.articles);
    });
  }, []);
  return (
    <div id="actuality" className="actuality">
      <p className="page-title">Actuality</p>
      <div className="articles_container">
        {articles.map((article: any) => (
          <Article
            title={article.title}
            img={article.urlToImage}
            content={article.description}
            url={article.url}
          />
        ))}
      </div>
    </div>
  );
}

export default Actuality;
