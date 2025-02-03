import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { GET_CLIENTS } from "../query/clientQueries";
import Loader from "./Loader";
import { ADD_PROJECT } from "../mutations/ProjectMutation";
import { GET_PROJECTS } from "../query/projectQueries";

function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  //get clients for select

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addProject(name, description, clientId, status);

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  if (loading) return <Loader />;
  if (error) return <p>Something is wrong...</p>;
  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProject"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>Add Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProject"
            tabIndex="-1"
            aria-labelledby="addProjectLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectLabel">
                    Add Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        Project Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        type="email"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="status">
                        Status
                      </label>
                      <select
                        id="status"
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Client</label>
                        <select name="" id="clientId" className="form-select" value={clientId} onChange={(e)=>setClientId(e.target.value)}>
                            <option value="">Select Client</option>
                            {
                                data.clients.length>0 && data.clients.map((client)=><option key={client.id} value={client.id}>{client.name}</option>)
                            }
                        </select>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-priamry"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddProjectModal;
