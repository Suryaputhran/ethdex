import config from "../config.json"
import { useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { myEventsSelector } from "../store/selectors"

const TransactionStatus = () => {

    const alertRef = useRef(null)

    const network = useSelector(state => state.provider.network)
    const account = useSelector(state => state.provider.account)
    const isPending = useSelector(state => state.decentralizedexchange.transaction.isPending)
    const isError = useSelector(state => state.decentralizedexchange.transaction.isError)
    const events = useSelector(myEventsSelector)

    const removeHandler = async (e) => {
        alertRef.current.className = "transactionStatus--remove"
    }

    useEffect(() => {
        if((events[0] || isPending || isError) && account) {
            alertRef.current.className = "transactionStatus"
        }
    }, [events, isPending, isError, account])

    return (
        <div>
            {isPending ? (

                <div className="transactionStatus transactionStatus--remove" onClick={removeHandler} ref={alertRef}>
                    <h1 style={{ color: "#00BFFF" }}>Transaction Pending...</h1>
                </div>

            ) : isError ? (

                <div className="transactionStatus transactionStatus--remove" onClick={removeHandler} ref={alertRef}>
                    <h1 style={{ color: "#FF0000" }}>Transaction Failed</h1>
                </div>

            ) : !isPending && events[0] ? (

                <div className="transactionStatus transactionStatus--remove" onClick={removeHandler} ref={alertRef}>
                    <h1 style={{ color: "#32CD32" }}>Transaction Successful</h1>
                    <a
                        href={config[network] ? `${config[network].explorerURL}/tx/${events[0].transactionHash}` : "#"}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {events[0].transactionHash.slice(0, 9) + "...." + events[0].transactionHash.slice(57, 66)}
                    </a>
                </div>

            ) : (
                <div className="transactionStatus transactionStatus--remove" onClick={removeHandler} ref={alertRef}></div>
            )}
        </div>
    );
}

export default TransactionStatus;