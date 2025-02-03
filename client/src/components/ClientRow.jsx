import { useMutation } from "@apollo/client";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/ClientMutations";
import { GET_CLIENTS } from "../query/clientQueries";
export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT,{
    variables:{id:client.id},
    // refetchQueries:[{query:GET_CLIENTS}]  // one way to manage statet dynamically
    update(cache,{data:{deleteClient}}){
      const {clients} = cache.readQuery({query:GET_CLIENTS});
      cache.writeQuery({
        query:GET_CLIENTS,
        data:{clients:clients.filter(client=>client.id!==deleteClient.id)}
      });
    }
  });
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className=" btn btn-danger  btn-sm" onClick={deleteClient}>
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  );
}
