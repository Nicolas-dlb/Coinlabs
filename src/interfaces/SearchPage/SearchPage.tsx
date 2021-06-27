import './SearchPage.scss';
import PortfolioItem from "interfaces/Portfolio/PortfolioItem/PortfolioItem";
import StatItem from './StatItem/StatItem';
type SearchPageProps = {
    crypto: string;
}

function SearchPage({crypto}: SearchPageProps) {
    return (
        <div className="searchPage">
            <p className="page-title">Search</p>
            <div className="coins_container">
                <PortfolioItem name={crypto} />
            </div>
            <p className="title">Price</p>
            <div className="stats_container">
                <StatItem time="week" />
                <StatItem time="month" />
                <StatItem time="3Month" />
                <StatItem time="6Month" />
                <StatItem time="year" />
            </div>
        </div>
    )
}

export default SearchPage
