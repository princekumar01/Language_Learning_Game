import France from "../assets/india.jpg";
import Germany from "../assets/uk.jpg";
import { Link } from "react-router-dom";

export const GettingStarted = () => {
  const data = [
    { name: "Hindi", img: France, id: "Hindi" },
    { name: "English", img: Germany, id: "English" },
  ];
  return (
    <main className="bg-learn min-h-screen flex flex-col gap-14 justify-start items-center px-10 py-20">
      <h1 className="text-white text-3xl font-semibold">
        Please choose a language...
      </h1>
      <section className="flex gap-6">
        {data.map((item) => (
          <Link
            to={`${item.id}`}
            key={item.name}
            className="flex flex-col gap-6 items-center justify-center max-w-[260px] p-14 border-2 rounded-lg hover:bg-[#ffffff57] cursor-pointer"
          >
            <img src={item.img} alt={item.name} className="rounded-lg" />
            <h2 className="text-white font-semibold text-lg">{item.name}</h2>
          </Link>
        ))}
      </section>
    </main>
  );
};
