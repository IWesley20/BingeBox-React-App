import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState();
  const sliderRef = useRef(null);

  useEffect(() => {
    axios.get(fetchURL).then((res) => {
      setMovies(res.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => (sliderRef.current.scrollLeft -= 500);

  const slideRight = () => (sliderRef.current.scrollLeft += 500);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          size={40}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          onClick={slideLeft}
        />
        <div
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth no-scrollbar relative"
        >
          {movies?.map((item, id) => {
            return item.backdrop_path ? <Movie item={item} key={id} /> : null;
          })}
        </div>
        <MdChevronRight
          size={40}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          onClick={slideRight}
        />
      </div>
    </>
  );
};

export default Row;
