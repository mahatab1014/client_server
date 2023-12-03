import { useState } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { UploadImageImgBB } from "../../../utility/utility";
import { useNavigate, useParams } from "react-router-dom";
import useSingleData from "../../../hooks/useSingleData";
import toast from "react-hot-toast";

const DashUpdateSurvey = () => {
  const axiosSecure = useAxiosSecure();
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const [singleSurveyData, refetch] = useSingleData(id);
  const navigate = useNavigate();
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

  const [postingLoader, setPostingLoader] = useState(false);
  const handleSurveyUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const cover = form.cover.files[0];
    const description = form.description.value;
    const currentDate = new Date().toISOString().split("T")[0];
    const date = form.expire_date.value;

    if (date <= currentDate) {
      return;
    }

    const cover_image = cover
      ? (await UploadImageImgBB(cover))?.data?.url || singleSurveyData?.cover
      : singleSurveyData?.cover;

    const postData = {
      title,
      cover: cover_image,
      description,
      category,
      timestamp: date,
      status: "active",
      inactive_reason: "",
    };

    try {
      setPostingLoader(true);
      const response = await axiosSecure.put(`/survey-update/${id}`, postData);
      console.log(response.data);
      refetch();
      toast.error("Error updating survey");
      setPostingLoader(false);
    } catch (err) {
      console.error(err);
      refetch();
      toast.success("Survey updated successfully");
      setPostingLoader(false);
    }
  };

  return (
    <>
      <PageTitle title="Survey Create" />
      <section>
        <div className="title py-10">
          <h2 className="text-3xl text-center">Update Survey</h2>
          <div className="border-b-2 pt-3 w-2/4 m-auto"></div>
        </div>

        <form className="px-10" onSubmit={handleSurveyUpdate}>
          {errorMessage && (
            <div>
              <p className="rounded mb-3 bg-error text-center py-2 fontme">
                {errorMessage}
              </p>
            </div>
          )}

          {singleSurveyData?.inactive_reason && (
            <div>
              <p className="rounded mb-3 bg-info text-white text-center py-2 fontme">
                <strong>Feedback: </strong>
                {singleSurveyData?.inactive_reason}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 [&>div>*]:h-fit [&>div>*]:w-full">
            <div>
              <label htmlFor="title">Survey Title :</label>
              <input
                className="search-form-field mt-1"
                type="text"
                name="title"
                id="title"
                placeholder="Survey Title"
                defaultValue={singleSurveyData?.title}
                required
              />
            </div>
            <div>
              <label htmlFor="cover">Survey Cover Image :</label>
              <input
                className="search-form-field mt-1"
                type="url"
                defaultValue={singleSurveyData?.cover}
                disabled
              />
              <input
                className="search-form-field mt-1"
                type="file"
                name="cover"
                id="cover"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="category">Category :</label>
              <select
                className="search-form-field mt-1"
                name="category"
                id="category"
                required
              >
                <option selected disabled value="">
                  Category
                </option>
                {categoryList?.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="description">Description :</label>
              <textarea
                name="description"
                id="description"
                className="search-form-field mt-1"
                required
                defaultValue={singleSurveyData?.description}
              ></textarea>
            </div>
            <div className="">
              <label htmlFor="expire_date">Expire Date :</label>
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                className="search-form-field mt-1"
                defaultValue={singleSurveyData?.timestamp}
                required
              />
            </div>
          </div>

          <div>
            <button type="submit" className="primary-button my-5">
              <span>Update Survey</span>
              {postingLoader && <span className="loading loading-dots"></span>}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default DashUpdateSurvey;
