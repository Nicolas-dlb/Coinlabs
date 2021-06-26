import './Transactions.scss';
import Transaction from './Transaction/Transaction';
import { useSelector } from 'react-redux';
import { selectWalletHistory } from 'redux/reducers/walletsSlice';

function Transactions() {
    const walletHistory = useSelector(selectWalletHistory);
    const history = walletHistory?.slice(0, 6);
    return (
        <div className="transactions">
    
    
{history?.map((history: any) => {
    return <Transaction name={history.name} status={history.status} price={Number(history.price)} />
})}
        </div>
    )
}

export default Transactions
