import React, { useEffect, useState } from "react";
import { Footer, Header, Table } from "../components/index";
import { getAllHistory } from "../utils/context";

const tokens = () => {
  const [history, setHistory] = useState([]);

  const loadData = async () => {
    const data = await getAllHistory();

    setHistory(data.reverse());
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(history);
  return (
    <div className="bg-[#1a1a1a] ">
      <Header />
      <div className="p-[80px] ">
        <Table history={history} />
      </div>
      <Footer />
    </div>
  );
};

export default tokens;
