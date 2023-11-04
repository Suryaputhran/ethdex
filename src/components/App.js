import {useEffect} from "react";
import config from "../config.json"
import {useDispatch} from "react-redux"
import {
    loadAccount,
    loadAllOrders,
    loadExchange,
    loadNetwork,
    loadProvider,
    loadTokens,
    subscribeToEvents
} from "../store/interactions";

// Importing Components
import Order from "./Order"
import Trades from "./Trades"
import Navbar from "./Navbar"
import Markets from "./Markets"
import Balance from "./Balance"
import OrderBook from "./OrderBook"
import PriceChart from "./PriceChart"
import Transactions from  "./Transactions"
import TransactionStatus from  "./TransactionStatus"

function App() {

    const dispatch = useDispatch()

    const loadBlockchainData = async () => {

        // Connect Ethers to blockchain
        const provider = loadProvider(dispatch)

        // Fetch current network"s chainId (e.g. hardhat: 31337, kovan: 42)
        const chainId = await loadNetwork(provider, dispatch)

        // Reload page when network changes
        window.ethereum.on("chainChanged", () => {
            window.location.reload()
        })

        // Fetch current account & balance from Metamask when changed
        window.ethereum.on("accountsChanged", () => {
            loadAccount(provider, dispatch)
        })

        // Load Token Smart Contract
        const Finix = config[chainId].Finix
        const Auriga = config[chainId].Auriga
        await loadTokens(provider, [Finix.address, Auriga.address], dispatch)

        //Load Exchange Smart Contract
        const decentralizedexchangeConfig = config[chainId].decentralizedexchange
        const decentralizedexchange = await loadExchange(provider, decentralizedexchangeConfig.address, dispatch)

        //Fetch All Orders: Open, Filled, Cancelled
        loadAllOrders(provider, decentralizedexchange, dispatch)

        // Listen to events
        subscribeToEvents(decentralizedexchange, dispatch)
    }

    useEffect(() => {
        loadBlockchainData()
    })

    return (
        <div>

            <Navbar/>

            <main className="exchange grid">
                <section className="exchange__section--left grid">

                    <Markets/>

                    <Balance/>

                    <Order/>
                </section>

                <section className="exchange__section--right grid">

                    <PriceChart/>

                    <Transactions/>

                    <Trades/>

                    <OrderBook/>

                </section>
            </main>

            <TransactionStatus/>

        </div>
    );
}

export default App;