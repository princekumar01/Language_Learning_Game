import Achieve from "../assets/achieve.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Leaderboard = () => {
  const [data, setData] = useState([]);
  const { languageId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/leaderboard/${languageId}`
        );
        console.log(res);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="flex gap-8 px-10 py-10">
      <img src={Achieve} alt="" className="w-1/2" />
      <section className="flex flex-1 flex-col items-center">
        <h1 className="text-3xl font-semibold mb-10">Leaderboards !</h1>
        <section className="flex flex-col w-full max-h-[60vh] overflow-y-auto border-l-2 pl-2">
          {data.map((item, index) => (
            <article
              key={item.name}
              className="px-6 flex flex-1 items-center hover:font-bold hover:text-[#58cc02] py-3 hover:bg-[#d7feb8]"
            >
              <span className="text-xl mr-3">{index + 1}</span>
              <section className="flex items-center w-full justify-between">
                <div className="flex gap-4 items-center">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-full"
                  />
                  <h2 className="text-lg">{item.name}</h2>
                </div>
                <h2 className="text-xl text-current">{item.score} XP</h2>
              </section>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
};
