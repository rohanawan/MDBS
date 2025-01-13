import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MovieCard from "@/components/movie-card";
import Pagination from "@/components/pagination";
import Layout from "@/components/layout";
import MovieService from "@/services/movieService";
import showToast from "../showtoast";
import Header from "../header";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const getAllMovies = async () => {
    try {
      const response = await MovieService.getAll(currentPage, pageSize);
      if (response) {
        setMovies(response.movies?.results);
        setPageSize(response.movies?.limit);
        setCurrentPage(response.movies?.page);
        setTotalPages(response.movies?.totalPages);
      }
    } catch (error) {
      showToast("error", "Error fetching outlets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router && router.isReady) {
      getAllMovies();
    }
  }, [pageSize, currentPage, router.isReady]);

  const handleEdit = (item) => {
    router.push({
      pathname: "/movie-detail",
      query: {
        id: item?.id,
        title: item?.title,
        year: item?.publishingYear,
        image: item?.image,
      },
    });
  };

  const handleRemove = async (id) => {
    try {
      await MovieService.DeleteMovie(id);
      showToast("success", "Movie deleted successfully");
      getAllMovies();
    } catch (error) {
      showToast("error", "Error deleting movie");
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <div className="flex items-center justify-center h-[75vh]">
          <p className="text-white text-3xl">Loading...</p>{" "}
        </div>
      ) : (
        <main className="w-[100vh]">
          {movies && movies.length > 0 ? (
            <>
              <Header />
              <div className="p-6 min-h-[75vh] flex flex-col justify-between">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {movies.length > 0 &&
                    movies?.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        onEdit={() => handleEdit(movie)}
                        onRemove={() => handleRemove(movie.id)}
                        title={movie.title}
                        year={movie.publishingYear}
                        image={movie.image}
                      />
                    ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h2 class="text-[#FFFFFF] text-4xl font-semibold leading-tight text-center mb-4">
                Your movie list is empty
              </h2>
              <button
                className="rounded-md bg-[#2BD17E] px-14 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
                onClick={() => router.push("/movie-detail")}
              >
                Add a new movie
              </button>
            </div>
          )}
        </main>
      )}
    </Layout>
  );
}
