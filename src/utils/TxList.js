export default function TxList({ txs, flag }) {
  if (txs.length === 0) return null;

  return (
    <>
      {txs.map((item) => (
        <div key={item} className="alert alert-info mt-5">
          <div className="flex-1">
            <label className="text-green-600">
              TransactionHash : {flag ? item.hash : item.transactionHash}
            </label>
          </div>
        </div>
      ))}
    </>
  );
}
