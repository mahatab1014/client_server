import { useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useSingleData from "../../../hooks/useSingleData";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useState } from "react";
const DashAnalytics = () => {
  const { id } = useParams();
  const [singleSurveyData, refetch, isLoading] = useSingleData(id);
  // console.log(singleSurveyData);
  const { likes, dis_likes, options } = singleSurveyData;
  const [activeIndex, setActiveIndex] = useState(0);
  let userLikedData = [];
  let userVoteData = [];

  if (!isLoading) {
    userLikedData = [
      { name: "Liked User", value: likes },
      { name: "DisLiked User", value: dis_likes },
    ];
    userVoteData = [
      { name: "Vote : YES", value: options[0]?.vote_count },
      { name: "Vote : NO", value: options[1]?.vote_count },
    ];
  }

  const COLORS = ["#0088FE", "#FF8042"];

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`VOTE ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  return (
    <>
      <PageTitle title={"Analytics"} />
      <section>
        <div className="card remove_cart_outline">
          <div className="card-body p-3 my-10">
            <div>
              <h2 className="text-2xl text-center py-5">
                Survey Sentiments Snapshot
              </h2>
              <p className="text-center text-lg text-gray-500">
                Step into the arena of opinions with our 'User Verdict' chart,
                where every vote is a dance between 'Yes' and 'No.' This visual
                presentation captures the essence of user preferences,
                distilling complex sentiments into a binary rhythm. Explore the
                ebb and flow of agreement and disagreement, as users cast their
                votes and shape the collective verdict. Immerse yourself in the
                simplicity and power of binary choices in this dynamic snapshot
                of user sentiment.
              </p>
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={userVoteData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="card-body p-0 my-10">
            <div>
              <h2 className="text-2xl text-center py-5">
                Opinion Odyssey: Navigating Survey Seas
              </h2>
              <p className="text-center text-lg text-gray-500">
                Embark on a journey through the ebb and flow of opinions with
                our survey chart. 'Opinion Odyssey' unveils a captivating
                exploration of liked and disliked responses, guiding you through
                the diverse currents of perspectives. Chart your course through
                this visual narrative and discover the intriguing landscape of
                preferences within our community.
              </p>
              <div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={userLikedData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userLikedData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3">
                      <span>User Liked</span>
                      <span className="inline-block w-20 h-2 bg-[#0088FE] rounded-full"></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>User disliked</span>
                      <span className="inline-block w-20 h-2 bg-[#FF8042] rounded-full"></span>
                    </div>
                  </div>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashAnalytics;
