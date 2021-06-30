import "./Article.scss";

type ArticleProps = {
  title: string;
  img: string;
  content: string;
  url: string;
};
function Article({ title, img, content, url }: ArticleProps) {
  return (
    <a href={url}>
      <div className="article">
        <img src={img} alt="" />
        <h3 className="article_title">{title}</h3>
        <p>{content}</p>
      </div>
    </a>
  );
}

export default Article;
