import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PROJECTS } from "../query/projectQueries";
import Loader from "./Loader";
import ProjectCard from "./ProjectCard";

function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Loader />;
  if (error) return <p>Something is wrong...</p>;
  return (
    <>
      {data.projects.length > 0 ? (
        <>
          <div className="mt-4 row">
            {
                data.projects.map((project)=>(
                    <ProjectCard key={project.id} project={project} />
                ))
            }
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Projects;
