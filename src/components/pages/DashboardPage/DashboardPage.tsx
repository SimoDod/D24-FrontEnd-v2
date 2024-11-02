import NewReportForm from "../../NewReportForm/NewReportForm";
import { useNavigate, useParams } from "react-router-dom";
import { routePaths } from "../../../routerConfig";
import ReportsTable from "../../ReportsTable/ReportsTable";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../common/Icon/Icon";
import { ReportStatus } from "../../../types/Report";
import { useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { searchReportsByCriteria } from "../../../store/slices/reportSlice";

//TODO translate

const Dashboard = () => {
  const navigate = useNavigate();
  const { reportNumber } = useParams();
  const [searchValue, setSetsearchValue] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("");
  const dispatch = useAppDispatch();

  return (
    <>
      {reportNumber && (
        <NewReportForm
          reportNumber={reportNumber}
          onClose={() => navigate(routePaths.dashboard.path)}
        />
      )}
      <div className="2xl:pr-52 2xl:pl-52">
        <div className="flex flex-wrap justify-between pr-4 pl-4 mt-10 mb-2">
          <button
            onClick={() => navigate(routePaths.dashboard.pathNew)}
            className="btn btn-secondary xxxs:mb-2"
          >
            <Icon icon={faPlusCircle} />
          </button>
          <div className="join">
            <input
              className="input input-bordered join-item w-40 focus:border-primary"
              onChange={({ target }) => setSetsearchValue(target.value)}
              placeholder="Search"
            />
            <select
              value={searchCriteria as string}
              onChange={({ target }) =>
                setSearchCriteria(target.value as ReportStatus)
              }
              className="select select-bordered focus:border-primary join-item"
            >
              <option value="">All statuses</option>
              {Object.values(ReportStatus).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                dispatch(
                  searchReportsByCriteria({
                    searchCriteria,
                    searchValue,
                  })
                )
              }
              className="btn btn-primary join-item"
            >
              <Icon icon={faSearch} />
            </button>
          </div>
        </div>
        <ReportsTable />
      </div>
    </>
  );
};

export default Dashboard;
