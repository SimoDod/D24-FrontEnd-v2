import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchAllLearningReports } from "../../store/thunks/report/fetchAllLearningReports";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../routerConfig";
import clsx from "clsx";
import { ReportStatus } from "../../types/Report";
import { usePagination } from "../../hooks/usePagination";
import formatDateToString from "../../utils/date/formatDateToString";
import Pagination from "../common/Pagination/Pagination";

//TODO translate

const ReportsTable = () => {
  const { filteredReports, areAllReportsLoading } = useAppSelector(
    (state) => state.report
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    currentItems,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    totalPages,
  } = usePagination(filteredReports);

  useEffect(() => {
    dispatch(fetchAllLearningReports());
  }, [dispatch]);

  return (
    <div className="mockup-window shadow-xl bg-base-300 mb-10">
      <div className="flex justify-between items-center flex-wrap pl-6 pr-6 mb-4">
        <h1 className="text-3xl text-primary">Learning Reports</h1>
        <Pagination
          nextPage={goToNextPage}
          previousPage={goToPreviousPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
      {areAllReportsLoading ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-bars loading-lg mt-52 mb-40" />
        </div>
      ) : (
        <div className="overflow-y-scroll overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Number</th>
                <th>Segment</th>
                <th>Office</th>
                <th>Date of Craftsmanship</th>
                <th className="flex justify-center">Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="overflow-x-auto overflow-y-scroll">
              {currentItems.length !== 0 ? (
                currentItems.map(
                  ({
                    segment,
                    reportNumber,
                    office,
                    timestampCraftsmanship,
                    status,
                  }) => (
                    <tr key={reportNumber}>
                      <td>
                        <p className="text text-primary">{reportNumber}</p>
                      </td>
                      <td>{segment}</td>
                      <td>{office}</td>
                      <td>{formatDateToString(timestampCraftsmanship)}</td>
                      <td className="flex justify-center">
                        <div
                          className={clsx("badge p-3 m-1 badge-outline", {
                            "badge-error": status === ReportStatus.CLOSED,
                            "badge-success": status === ReportStatus.NEW,
                            "badge-warning": status === ReportStatus.REVIEWED,
                            "badge-primary": status === ReportStatus.SUBMITTED,
                          })}
                        >
                          {status}
                        </div>
                      </td>
                      <th>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() =>
                            navigate(
                              routePaths.dashboard.reportPath + reportNumber
                            )
                          }
                        >
                          Edit
                        </button>
                      </th>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-lg text-primary"
                  >
                    No reports found. Please adjust your search or filters to
                    see available reports
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>Number</td>
                <td>Segment</td>
                <td>Office</td>
                <td>Date of Craftsmanship</td>
                <td className="flex justify-center">Status</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportsTable;
