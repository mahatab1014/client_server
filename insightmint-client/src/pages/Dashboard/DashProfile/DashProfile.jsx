import PageTitle from "../../../components/PageTitle/PageTitle";
import useAuth from "../../../hooks/useAuth";
import useSingleUserData from "../../../hooks/useSingleUserData";

const DashProfile = () => {
  const { user } = useAuth();
  const [singleUserData, singleUserDataRefetch] = useSingleUserData(
    user?.email
  );
  return (
    <>
      <PageTitle title="Profile" />

      <section className="">
        <div className="p-8">
          <figure>
            <img
              className="h-40 sm:h-60 w-full object-cover rounded"
              src="https://source.unsplash.com/random/1200×600/?abstract"
              alt=""
            />
          </figure>
          <div className="sm:flex sm:space-x-6 bg-gray-300 rounded">
            <div className="flex-shrink-0 mb-6 h-32 w-32 sm:mb-0">
              <img
                src={singleUserData?.profile_pic}
                alt=""
                className="object-cover object-center w-full h-full bg-gray-500 relative -top-8 left-5 rounded-full"
              />
            </div>
            <div className="flex flex-col space-y-1 pl-5">
              <div>
                <h2 className="text-2xl font-semibold">
                  {singleUserData?.name}
                </h2>
                <span className="text-sm">
                  <strong>Role:</strong> {singleUserData?.role}
                </span>
              </div>
              <div className="space-y-1">
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    aria-label="Email address"
                    className="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                    ></path>
                  </svg>
                  <span className="">{singleUserData?.email}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashProfile;
