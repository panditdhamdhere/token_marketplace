import React from "react";

const Table = ({ history }) => {
  return (
    <div className="container p-2 mx-auto sm:p-4 text-gray-100 bg-[#7765f3]">
      <h2 className="mb-4 text-2xl font-semibold">Recent Transaction</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup className="">
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="bg-[#18181b]">
            <tr className="text-left">
              <th className="p-3">Transaction Hash</th>
              <th className="p-3">User</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3 text-right">Input</th>
              <th className="p-3 text-right">Output</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((history, index) => (
              <tr
                key={index + 1}
                className="border-b border-opacity-20 border-gray-700 bg-[#27272a ] "
              >
                <td className="p-3 ">
                  <p>{history.historyId}</p>
                </td>

                <td className="p-3 ">
                  <p>{history.userAddress}</p>
                </td>
                <td className="p-3 ">
                  <p>{history.tokenB}</p>
                </td>
                <td className="p-3 ">
                  <p>{history.tokenA}</p>
                </td>
                <td className="p-3 text-right ">
                  <p>{history.inputValue}</p>
                </td>
                <td className="p-3 text-right ">
                  <p>{history.outputValue}</p>
                </td>
                <td className="p-3 text-right ">
                  <span className="px-3 py-1 font-semibold rounded-md bg-[#7765f3] text-gray-900">
                    <span>Completed</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
