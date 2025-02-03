import { useQuery } from "@apollo/client";
import React from "react";
import { GET_CLIENTS } from "../query/clientQueries";
import ClientRow from "./ClientRow";
import Loader from "./Loader";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Loader />;
  if (error) return <p className="text-warning">Something went wrong...</p>;
  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client, idx) => (
              <ClientRow key={idx} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
