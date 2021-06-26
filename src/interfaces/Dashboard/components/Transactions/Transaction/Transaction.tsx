import { numberWithSpaces } from "utils/utils";
import "./Transaction.scss";

type TransactionProps = {
    name: string,
    status: string,
    price: number
}

function Card({name, status, price}: TransactionProps) {
    const icon = name === "Ethereum" ? 
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#2c3a61"/><g fill="#3d97d4" fill-rule="nonzero"><path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z"/><path d="M16.498 4L9 16.22l7.498-3.35z"/><path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z"/><path d="M16.498 27.995v-6.028L9 17.616z"/><path fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/><path fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/></g></g></svg> 
    : name === "Bitcoin" ? 
    <svg xmlns="http://www.w3.org/2000/svg" ><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#2a4245"/><path fill="#73cb9c" fill-rule="nonzero" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"/></g></svg> 
    : name === "Ripple" ? 
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#41305f"/><path fill="#b96bd9" fill-rule="nonzero" d="M21.96 18.205c-.69-.408-1.467-.526-2.237-.554-.646-.023-1.61-.447-1.61-1.65 0-.898.71-1.62 1.61-1.652.77-.027 1.548-.146 2.238-.554 1.713-1.014 2.47-3.141 1.793-5.046-.677-1.905-2.591-3.037-4.54-2.685-1.949.352-3.37 2.086-3.37 4.114 0 .809.282 1.554.64 2.244.302.581.454 1.66-.58 2.271-.77.455-1.73.167-2.21-.619-.404-.664-.893-1.286-1.578-1.691-1.713-1.014-3.89-.62-5.162.932a4.255 4.255 0 0 0 0 5.37c1.272 1.553 3.449 1.946 5.162.932.685-.404 1.174-1.026 1.579-1.69.332-.545 1.162-1.24 2.209-.62.768.455 1.006 1.45.58 2.271-.359.69-.64 1.435-.64 2.245 0 2.027 1.421 3.761 3.37 4.113 1.949.352 3.863-.78 4.54-2.685.676-1.905-.08-4.032-1.793-5.046z"/></g></svg>
    : name === "Litecoin" ?
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#534840"/><path fill="#ed9b54" d="M10.427 19.214L9 19.768l.688-2.759 1.444-.58L13.213 8h5.129l-1.519 6.196 1.41-.571-.68 2.75-1.427.571-.848 3.483H23L22.127 24H9.252z"/></g></svg>
    : name === "Neo" ?
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#263552"/><path fill="#4a9cc0" fill-rule="nonzero" d="M25 22.58l-6.99-3.258v-7.22L25 9.623V22.58zM14.823 26L8 22.821V9.958l6.823 3.18V26zm10.01-16.843l-.113.04-6.71 2.381-.168.06-2.843 1.008-6.73-3.136 9.573-3.396.084-.03.177-.063.062-.021 6.73 3.136-.063.021z"/></g></svg>
    : 
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#2c3a61"/><g fill="#3d97d4" fill-rule="nonzero"><path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z"/><path d="M16.498 4L9 16.22l7.498-3.35z"/><path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z"/><path d="M16.498 27.995v-6.028L9 17.616z"/><path fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/><path fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/></g></g></svg>

    
    return (
      
            <div className="transaction">
        <div className="transaction_name">
            {icon}
            <p>{name}</p>
        </div>
        <div className={status === "Buy" ? "transaction_statut transaction_buy" : "transaction_statut"}>
            <div>{status}</div>
        </div>
        <div className="transaction_price">
            <p>${numberWithSpaces(price)}</p>
        </div>
    </div>
    
    )
}

export default Card
