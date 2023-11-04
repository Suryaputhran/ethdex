import config from "../config.json"
import { loadTokens } from "../store/interactions"
import { useSelector, useDispatch } from "react-redux"

const Markets = () => {

    const provider = useSelector(state => state.provider.connection)
    const chainId = useSelector(state => state.provider.chainId)

    const dispatch = useDispatch()

    const marketHandler = async (e) => {
        loadTokens(provider, (e.target.value).split(","), dispatch)
    }

    return(
        <div className="component exchange__markets">
            <div className="component__header">
                <h2>Select Market</h2>
            </div>

            {chainId && config[chainId] ? (
                <select name="markets" id="markets" onChange={marketHandler}>
                    { /* Finix */ }
                    <option value={`${config[chainId].Finix.address},${config[chainId].Auriga.address}`}>Finix ➞ Auriga</option>
                    <option value={`${config[chainId].Finix.address},${config[chainId].Empyrean.address}`}>Finix ➞ Empyrean</option>
                    <option value={`${config[chainId].Finix.address},${config[chainId].Helix.address}`}>Finix ➞ Helix</option>
                    <option value={`${config[chainId].Finix.address},${config[chainId].Quantum.address}`}>Finix ➞ Quantum</option>
                    <option value={`${config[chainId].Finix.address},${config[chainId].Sirius.address}`}>Finix ➞ Sirius</option>
                    <option value={`${config[chainId].Finix.address},${config[chainId].Zeroconium.address}`}>Finix ➞ Zeroconium</option>
                    { /* Auriga */ }
                    <option value={`${config[chainId].Auriga.address},${config[chainId].Empyrean.address}`}>Auriga ➞ Empyrean</option>
                    <option value={`${config[chainId].Auriga.address},${config[chainId].Finix.address}`}>Auriga ➞ Finix</option>
                    <option value={`${config[chainId].Auriga.address},${config[chainId].Helix.address}`}>Auriga ➞ Helix</option>
                    <option value={`${config[chainId].Auriga.address},${config[chainId].Quantum.address}`}>Auriga ➞ Quantum</option>
                    <option value={`${config[chainId].Auriga.address},${config[chainId].Sirius.address}`}>Auriga ➞ Sirius</option>
                    <option value={`${config[chainId].Auriga.address},${config[chainId].Zeroconium.address}`}>Auriga ➞ Zeroconium</option>
                    {/*Empyrean*/}
                    <option value={`${config[chainId].Empyrean.address},${config[chainId].Auriga.address}`}>Empyrean ➞ Auriga</option>
                    <option value={`${config[chainId].Empyrean.address},${config[chainId].Finix.address}`}>Empyrean ➞ Finix</option>
                    <option value={`${config[chainId].Empyrean.address},${config[chainId].Helix.address}`}>Empyrean ➞ Helix</option>
                    <option value={`${config[chainId].Empyrean.address},${config[chainId].Quantum.address}`}>Empyrean ➞ Quantum</option>
                    <option value={`${config[chainId].Empyrean.address},${config[chainId].Sirius.address}`}>Empyrean ➞ Sirius</option>
                    <option value={`${config[chainId].Empyrean.address},${config[chainId].Zeroconium.address}`}>Empyrean ➞ Zeroconium</option>
                    {/*Helix*/}
                    <option value={`${config[chainId].Helix.address},${config[chainId].Auriga.address}`}>Helix ➞ Auriga</option>
                    <option value={`${config[chainId].Helix.address},${config[chainId].Empyrean.address}`}>Helix ➞ Empyrean</option>
                    <option value={`${config[chainId].Helix.address},${config[chainId].Finix.address}`}>Helix ➞ Finix</option>
                    <option value={`${config[chainId].Helix.address},${config[chainId].Quantum.address}`}>Helix ➞ Quantum</option>
                    <option value={`${config[chainId].Helix.address},${config[chainId].Sirius.address}`}>Helix ➞ Sirius</option>
                    <option value={`${config[chainId].Helix.address},${config[chainId].Zeroconium.address}`}>Helix ➞ Zeroconium</option>
                    {/*Quantum*/}
                    <option value={`${config[chainId].Quantum.address},${config[chainId].Auriga.address}`}>Quantum ➞ Auriga</option>
                    <option value={`${config[chainId].Quantum.address},${config[chainId].Empyrean.address}`}>Quantum ➞ Empyrean</option>
                    <option value={`${config[chainId].Quantum.address},${config[chainId].Finix.address}`}>Quantum ➞ Finix</option>
                    <option value={`${config[chainId].Quantum.address},${config[chainId].Helix.address}`}>Quantum ➞ Helix</option>
                    <option value={`${config[chainId].Quantum.address},${config[chainId].Sirius.address}`}>Quantum ➞ Sirius</option>
                    <option value={`${config[chainId].Quantum.address},${config[chainId].Zeroconium.address}`}>Quantum ➞ Zeroconium</option>
                    {/*Sirius*/}
                    <option value={`${config[chainId].Sirius.address},${config[chainId].Auriga.address}`}>Sirius ➞ Auriga</option>
                    <option value={`${config[chainId].Sirius.address},${config[chainId].Empyrean.address}`}>Sirius ➞ Empyrean</option>
                    <option value={`${config[chainId].Sirius.address},${config[chainId].Finix.address}`}>Sirius ➞ Finix</option>
                    <option value={`${config[chainId].Sirius.address},${config[chainId].Helix.address}`}>Sirius ➞ Helix</option>
                    <option value={`${config[chainId].Sirius.address},${config[chainId].Quantum.address}`}>Sirius ➞ Quantum</option>
                    <option value={`${config[chainId].Sirius.address},${config[chainId].Zeroconium.address}`}>Sirius ➞ Zeroconium</option>
                    {/*Zeroconium*/}
                    <option value={`${config[chainId].Zeroconium.address},${config[chainId].Auriga.address}`}>Zeroconium ➞ Auriga</option>
                    <option value={`${config[chainId].Zeroconium.address},${config[chainId].Empyrean.address}`}>Zeroconium ➞ Empyrean</option>
                    <option value={`${config[chainId].Zeroconium.address},${config[chainId].Finix.address}`}>Zeroconium ➞ Finix</option>
                    <option value={`${config[chainId].Zeroconium.address},${config[chainId].Helix.address}`}>Zeroconium ➞ Helix</option>
                    <option value={`${config[chainId].Zeroconium.address},${config[chainId].Sirius.address}`}>Zeroconium ➞ Sirius</option>
                    <option value={`${config[chainId].Zeroconium.address},${config[chainId].Quantum.address}`}>Zeroconium ➞ Quantum</option>
                </select>
            ) : (
                <div>
                    <p>The Network deployment has not been executed.</p>
                </div>
            )}
            <hr />
        </div>
    )
}

export default Markets;
