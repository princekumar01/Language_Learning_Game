import { Progressbar } from "@/components/Progressbar/";
import { Button } from "@/components/Button";
import { Heart } from "phosphor-react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "@/providers/context";
import { twMerge } from "tailwind-merge";

export const Lesson = () => {
  const { languageId } = useParams();
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState("Loading...");
  const [options, setOptions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(4);
  const [questionId, setQuestionId] = useState(null);
  const { user } = useAppContext();
  let option = ["A", "B", "C", "D"];
  const fetchNextQuestion = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/language/${languageId}`,
        {
          option: selectedIndex > 3 ? "" : `option${option[selectedIndex]}`,
          questionId: questionId || "",
          userId: user.userId,
          currentScore: score,
          flag: questionNumber !== 10,
        }
      );
      setQuestion(res.data.question);
      setOptions([
        res.data.optionA,
        res.data.optionB,
        res.data.optionC,
        res.data.optionD,
      ]);
      console.log(res);
      setScore(res.data.currentScore);
      setQuestionId(res.data._id);
      setQuestionNumber((prev) => prev + 1);
      setSelectedIndex(5);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNextQuestion();
  }, []);
  return (
    <main className="flex flex-col gap-8 px-32 py-10">
      <section className="flex items-center gap-6">
        <Progressbar percent={(questionNumber / 10) * 100} />
        <div role="score" className="flex items-center gap-2">
          <Heart size={32} weight="fill" className="text-[#FF4B4B]" />
          <h2 className="text-xl font-semibold text-[#FF4B4B]">{score}</h2>
        </div>
        <Link to="leaderboard" className="absolute top-1 right-1">
          <Button className="text-sm px-4">Leaderboard</Button>
        </Link>
      </section>
      <section className="flex flex-col items-center mt-16 px-16">
        <h1 className="text-4xl font-bold">{question}</h1>
        <ul className="mt-16 flex flex-wrap gap-8 text-xl">
          {options.map((option, index) => (
            <li
              key={option}
              onClick={() => setSelectedIndex(index)}
              className={twMerge(
                "min-w-20 border-2 hover:bg-blue-100 p-10 cursor-pointer rounded-lg",
                selectedIndex === index ? "bg-blue-100" : "bg-white"
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      </section>
      <section className="flex justify-between mt-16">
        <Button className="px-10" onClick={fetchNextQuestion}>
          Check
        </Button>
      </section>
    </main>
  );
};
