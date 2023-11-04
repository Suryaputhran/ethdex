import eth from "../assets/eth.png"
import config from "../config.json"
import Blockies from "react-blockies"
import logo from "../assets/logo.png"
import {loadAccount} from "../store/interactions"
import {useDispatch, useSelector} from "react-redux"

const Navbar = () => {

    const provider = useSelector(state => state.provider.connection)
    const chainId = useSelector(state => state.provider.chainId)
    const account = useSelector(state => state.provider.account)
    const balance = useSelector(state => state.provider.balance)

    const dispatch = useDispatch()

    const connectHandler = async () => {
        await loadAccount(provider, dispatch)
    }

    const networkHandler = async (e) => {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{chainId: e.target.value}],
        })
    }

    return (
        <div className="exchange__header grid">

            <div className="exchange__header--brand flex">
                {/*<img src={logo} className="logo" alt="Exchange Logo"></img>*/}
                <h1>Trustless Exchange</h1>
            </div>

            <div className="exchange__header--networks flex">
                <img src={eth} alt="ETH Logo" className="Eth Logo"/>

                {chainId && (
                    <select name="networks" id="networks" value={config[chainId] ? `0x${chainId.toString(16)}` : `0`}
                            onChange={networkHandler}>
                        <option value="0" disabled>Select Network</option>
                        <option value="0xaa36a7" >Sepolia</option>
                        <option value="0x7A69" >Localhost</option>
                        <option value="0x5" >Goerli</option>
                        <option value="0x61" disabled>Binance SC Testnet</option>
                        <option value="0x2328" disabled>Evmos Testnet</option>
                        <option value="0xfa2" disabled>Fantom Testnet</option>
                        <option value="0x1252" disabled>IoTeX Testnet</option>
                        <option value="0x2a" disabled>Kovan</option>
                        <option value="0x44d" disabled>Polygon zkEVM</option>
                        <option value="0x118" disabled>zkSync Era Testnet</option>
                        <option value="0x1" disabled>Ethereum</option>
                        <option value="0xa4b1" disabled>Arbitrum</option>
                        <option value="0xa86a" disabled>Avalanche(C-Chain)</option>
                        <option value="0x38" disabled>Binance SC</option>
                        <option value="0x2329" disabled>Evmos</option>
                        <option value="0xfa" disabled>Fantom Opera</option>
                        <option value="0x64" disabled>Gnosis</option>
                        <option value="0x1251" disabled>IoTeX</option>
                        <option value="0x440" disabled>Metis Andromeda</option>
                        <option value="0xa" disabled>Optimism</option>
                        <option value="0x89" disabled>Polygon</option>
                        <option value="0x144" disabled>zkSync Era</option>
                    </select>
                )}
            </div>

            <div className="exchange__header--account flex">
                {balance ? (
                    <p><small>Account Balance</small>{Number(balance).toFixed(4)}</p>
                ) : (
                    <p><small>Account Balance</small>0 ETH</p>
                )}
                {account ? (
                    <a
                        href={config[chainId] ? `${config[chainId].explorerURL}/address/${account}` : `#`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {account.slice(0, 5) + "..." + account.slice(38, 42)}
                        <Blockies
                            seed={account}
                            size={10}
                            scale={3}
                            color="#2187D0"
                            bgColor="#F1F2F9"
                            spotColor="#767F92"
                            className="identicon"
                        />
                    </a>
                ) : (
                    <button className="button" onClick={connectHandler}>Connect</button>
                )}
            </div>
        </div>
    )
}

export default Navbar;
