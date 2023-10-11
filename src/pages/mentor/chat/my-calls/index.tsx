import React, { useEffect } from "react";
import { MentorLayout } from "../../../../layout";
import DataTable from "react-data-table-component";
import { AiOutlineCopy, AiOutlineVideoCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import { AppButton } from "../../../../component";
import { useNavigate } from "react-router-dom";
import { useGetMyVideoCallsQuery, useMentorProfileQuery } from "../../../../app/apis";
import moment from "moment";

export const MentorMyCallsPage = () => {
     const { data: mentor } = useMentorProfileQuery();
     const {
          data: calls,
          isLoading: isCallHistoryLoading,
          isError: isCallHistoryError,
          error: callHistoryError,
     } = useGetMyVideoCallsQuery(mentor?.data._id);
     const navigate = useNavigate();

     const CopyMeetingID = async (roomId: string) => {
          await navigator.clipboard.writeText(roomId);
          toast.success(`${roomId} is copied to clipboard`);
     };

     useEffect(() => {
          if (isCallHistoryError) {
               if ((callHistoryError as any).data) {
                    toast.error((callHistoryError as any).data.message);
               } else {
                    toast.error((callHistoryError as any).message);
               }
          }
     }, [isCallHistoryError, callHistoryError]);

     return (
          <MentorLayout>
               <div className="flex justify-between my-5 items-center">
                    <h6>Calls logs</h6>
                    <div>
                         <AppButton secondary onClick={() => navigate(`/mentor/join-mentor-meeting`)}>
                              <span className="capitalize">Join patient</span>
                         </AppButton>
                    </div>
               </div>
               {isCallHistoryLoading && <div>Loading...</div>}
               {!isCallHistoryLoading && calls?.data?.length !== 0 && calls?.data?.length !== 0 && (
                    <div>
                         <DataTable
                              responsive
                              noDataComponent={<div>No call history found</div>}
                              pagination
                              paginationPerPage={10}
                              paginationRowsPerPageOptions={[10, 25, 50, 100]}
                              data={calls?.data}
                              columns={[
                                   {
                                        id: "#",
                                        name: "#",
                                        center: true,
                                        width: "100px",
                                        cell: (_, index) => (
                                             <div className="flex items-center gap-3">
                                                  <AiOutlineVideoCamera className="fill-secondary-500" size={24} />
                                                  <p className="text-lg">{index + 1}</p>
                                             </div>
                                        ),
                                   },
                                   {
                                        center: true,
                                        id: "username",
                                        name: "user name",
                                        selector: (row: any) =>
                                             `${row.userOne.name.firstName} ${row.userOne.name.lastName}`,
                                   },
                                   {
                                        center: true,
                                        id: "CreatedAt",
                                        name: "Call On",
                                        width: "200px",
                                        selector: (row: any) => moment(row.createdAt).format("MMM Do YYYY h:mm:ss A"),
                                   },
                                   {
                                        center: true,
                                        id: "UpdatedAt",
                                        name: "Completed On",
                                        width: "200px",
                                        selector: (row: any) => moment(row.updatedAt).format("MMM Do YYYY h:mm:ss A"),
                                   },

                                   {
                                        id: "roomId",
                                        name: "meeting ID",
                                        width: "200px",
                                        selector: ({ roomId }) => roomId,
                                        cell: ({ roomId }) => (
                                             <div className="flex gap-3 items-center">
                                                  <button
                                                       onClick={async () => {
                                                            await CopyMeetingID(roomId);
                                                       }}
                                                  >
                                                       <AiOutlineCopy size={22} />
                                                  </button>
                                                  {roomId}
                                             </div>
                                        ),
                                   },
                                   {
                                        id: "message",
                                        center: true,
                                        width: "100px",
                                        name: "messages",
                                        selector: ({ message }) => message.length,
                                   },
                                   {
                                        id: "status",
                                        name: "call status",
                                        center: true,
                                        width: "200px",
                                        selector: ({ status }) => status,
                                        cell: ({ status }) => (
                                             <div className="text-center">
                                                  {status === "PENDING" && (
                                                       <p className="text-yellow-500 px-10 py-2 rounded-lg">
                                                            <span className="uppercase">{status}</span>
                                                       </p>
                                                  )}
                                                  {status === "ONGOING" && (
                                                       <p className="text-gray-500 px-10 py-2 rounded-lg">
                                                            <span className="uppercase">{status}</span>
                                                       </p>
                                                  )}
                                                  {status === "COMPLETED" && (
                                                       <p className="text-emerald-500 px-10 py-2 rounded-lg">
                                                            <span className="uppercase">{status}</span>
                                                       </p>
                                                  )}
                                                  {status === "REJECTED" && (
                                                       <p className="text-red-500 px-10 py-2 rounded-lg">
                                                            <span className="uppercase">{status}</span>
                                                       </p>
                                                  )}
                                             </div>
                                        ),
                                   },
                                   {
                                        id: "action",
                                        name: "actions",
                                        center: true,
                                        cell: ({ status }) => (
                                             <div>
                                                  <button type="button" className="text-red-500">
                                                       Report chat
                                                  </button>
                                             </div>
                                        ),
                                   },
                              ]}
                         />
                    </div>
               )}
          </MentorLayout>
     );
};
