import Hero from "@/assets/hero.jpg";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <nav className="flex justify-end p-6">
        <section className="flex gap-6">
          <Link to="/signup">
            <Button className="px-10">Sign Up</Button>
          </Link>
          <Link to="/signin">
            <Button className="px-10">Sign In</Button>
          </Link>
        </section>
      </nav>
      <main className="flex items-center justify-center px-32">
        <img src={Hero} alt="Learn" className="w-1/3" />
        <section className="flex flex-col gap-6">
          <h1 className="text-5xl font-semibold">
            The free, fun, and effective way to learn a language!
          </h1>
          <section className="flex flex-col gap-4 items-center">
            {/* <Link to="/leaderboard">
              <Button className="px-10">Leaderboard</Button>
            </Link> */}
          </section>
        </section>
      </main>
    </>
  );
};
