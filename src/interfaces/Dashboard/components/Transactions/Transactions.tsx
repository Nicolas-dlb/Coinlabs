import './Transactions.scss';
import Transaction from './Transaction/Transaction';

function Transactions() {
    return (
        <div className="transactions">
    <Transaction name="Bitcoin" statut="Receive" price={123.42} />
    <Transaction name="Ethereum" statut="Buy" price={123.42} />
    <Transaction name="Neo" statut="Receive" price={123.42} />
    <Transaction name="Litecoin" statut="Receive" price={123.42} />
    <Transaction name="Ripple" statut="Buy" price={123.42} />
    

        </div>
    )
}

export default Transactions
