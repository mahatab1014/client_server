import { AiOutlineSearch } from "react-icons/ai";
import Container from "../../components/Container/Container";
import SectionBanner from "../../components/SectionBanner/SectionBanner";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SurveyCard from "../../components/Cards/SurveyCard";
import useSurveysData from "../../hooks/useSurveysData";

const Surveys = () => {
  const axiosPublic = useAxiosPublic();
  const [surveyCount, setSurveyCount] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const [perPageSurvey, setPerPageSurvey] = useState(10);
  // const [currentPage, setCurrentPage] = useState(0);
  const numberOfPages = Math.ceil(surveyCount / perPageSurvey);
  const pages = [...Array(numberOfPages).keys()];

  const categoryList = [
    "Technology",
    "Health and Wellness",
    "Entertainment",
    "Travel",
    "Workplace",
    "Sports",
    "Food and Dining",
    "Social Media",
    "Education",
    "Fashion",
    "Finance",
    "Environment",
    "Politics",
    "Hobbies",
    "Relationships",
    "Pets",
    "Art and Culture",
    "Science",
    "Automotive",
    "Fitness",
    "Music",
    "Movies",
    "Books",
    "Gaming",
    "Home and Garden",
  ];

  const [surveyData] = useSurveysData();

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  const handleFilter = async (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.search_text.value;
    const categoryList = form.category.value;
    setSearchText(searchText);
    setCategory(categoryList);
  };
  useEffect(() => {
    axiosPublic.get("total-surveys").then((survey) => {
      setSurveyCount(survey.data?.total);
    });

    axiosPublic
      .get(
        `/survey-filter?search=${searchText}&category=${category}&page=&size=${perPageSurvey}`
      )
      .then((data) => setFilterData(data.data));
  }, [axiosPublic, category, perPageSurvey, searchText]);

  return (
    <>
      <section>
        <SectionBanner
          heading="Surveys"
          description="Surveys are concise tools for gathering insights through structured questions. Widely used in market research and academia, they capture opinions and preferences from a targeted audience. Whether online or offline, surveys provide essential data to inform decisions, refine strategies, and understand audience dynamics, making them indispensable for informed decision-making."
        />

        <Container>
          <div className="form my-10 py-3 rounded-box bg-gray-100">
            <p className="text-center text-sm py-3">
              Sometimes it's not working, make sure to select right category
            </p>
            <form
              className="flex justify-center gap-5 flex-wrap"
              onSubmit={handleFilter}
            >
              <div className="w-full text-center">
                <input
                  className="search-form-field"
                  type="search"
                  name="search_text"
                  id="search_text"
                  placeholder="search by title"
                  title="Write atleast 5 characters"
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="category" className="text-sm pr-2">
                  Sort By:
                </label>
                <select
                  className="search-form-field"
                  name="category"
                  id="category"
                >
                  <option selected disabled>
                    Category
                  </option>
                  {categoryList?.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <select
                  className="search-form-field"
                  name="sort_by"
                  id="sort_by"
                >
                  <option value="asc" selected>
                    Ascending
                  </option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <div className="flex items-center">
                <label htmlFor="show" className="text-sm pr-2">
                  Show:
                </label>
                <select
                  className="search-form-field"
                  name="show"
                  id="show"
                  onChange={(e) => setPerPageSurvey(parseInt(e.target.value))}
                >
                  <option value="10" selected>
                    10
                  </option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div className="">
                <button className="primary-button !rounded" type="submit">
                  <AiOutlineSearch className="text-2xl" />
                </button>
              </div>
            </form>
          </div>

          {filterData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-5">
              <>
                {" "}
                {filterData?.map((data) => {
                  const surveyTotalVote = data.options.reduce(
                    (acc, option) => acc + parseInt(option.vote_count),
                    0
                  );
                  return (
                    <SurveyCard
                      key={data._id}
                      surveyTotalVote={surveyTotalVote}
                      card={data}
                      badge={"Featured"}
                    />
                  );
                })}
              </>
            </div>
          ) : (
            <>{searchText && <h2 className="text-3xl text-center">No data found by search</h2>}</>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-5">
            {filterData.length === 0 && (
              <>
                {surveyData?.map((data) => {
                  const surveyTotalVote = data.options.reduce(
                    (acc, option) => acc + parseInt(option.vote_count),
                    0
                  );
                  return (
                    <SurveyCard
                      key={data._id}
                      surveyTotalVote={surveyTotalVote}
                      card={data}
                      badge={"Featured"}
                    />
                  );
                })}
              </>
            )}
          </div>

          {/* <div className="join [&>button]:join-item [&>button]:btn">
            <button
              onClick={() => {
                if (currentPage > 0) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              Prev
            </button>

            {pages?.map((page, index) => (
              <button
                onClick={() => setCurrentPage(page)}
                key={index}
                className={currentPage === page ? "selectedButton " : ""}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => {
                if (currentPage < numberOfPages - 1) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
            </button>
          </div> */}
        </Container>
      </section>
    </>
  );
};

export default Surveys;
