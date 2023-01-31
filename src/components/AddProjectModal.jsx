import { useState } from "react"
import { FaList } from "react-icons/fa"
import { useMutation, useQuery } from "@apollo/client"
import { ADD_PROJECT } from "../mutations/projectMutations"
import { GET_PROJECTS } from "../queries/projectQueries"
import { GET_CLIENTS } from "../queries/clientQueries"

const AddProjectModal = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [clientId, setClientId] = useState("")
  const [status, setStatus] = useState("new")

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: {addProject} }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS
      })

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] }
      })
    }
  })

  const handleSubmit = (e) => {
		e.preventDefault();

    addProject(name, description, status, clientId);
		document.getElementById("projectBtn").click();

		setName("");
		setDescription("");
		setClientId("");
    setStatus("new")
	};

  const { loading, error, data } = useQuery(GET_CLIENTS)

  if(loading) return null;
  if(error) return (
		<button
			type="button"
			className="btn btn-danger"
      disabled={true}
		>
			Something went wrong
		</button>
	);

  return (
		<>
			{!loading && !error && (
				<>
					<button
						type="button"
						className="btn btn-secondary"
						data-bs-toggle="modal"
						data-bs-target="#addProjectModal"
					>
						<div className="d-flex align-items-center">
							<FaList className="me-2" />
							<div>Add Project</div>
						</div>
					</button>

					<div
						className="modal fade"
						id="addProjectModal"
						tabIndex="-1"
						aria-labelledby="addProjectModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog">
							<form onSubmit={handleSubmit}>
								<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id="addProjectModalLabel">
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
										<div className="mb-3">
											<label htmlFor="name" className="form-label">
												Name
											</label>
											<input
												type="text"
												name="name"
												id="name"
												className="form-control"
												value={name}
												onChange={(e) => setName(e.target.value)}
												required={true}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="description" className="form-label">
												Description
											</label>
											<textarea
												name="description"
												id="description"
												className="form-control"
												value={description}
												onChange={(e) => setDescription(e.target.value)}
												required={true}
											></textarea>
										</div>
										<div className="mb-3">
											<label htmlFor="status" className="form-label">
												Status
											</label>
											<select
												name="status"
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
											<label htmlFor="clientId" className="form-label">
												Client
											</label>
											<select
												name="clientId"
												id="clientId"
												className="form-select"
												value={clientId}
												onChange={(e) => setClientId(e.target.value)}
												required={true}
											>
												<option value="">Select Client</option>
												{data.clients.map((client) => (
													<option key={client.id} value={client.id}>
														{client.name}
													</option>
												))}
											</select>
										</div>
									</div>
									<div className="modal-footer">
										<button
											id="projectBtn"
											type="button"
											className="btn btn-secondary"
											data-bs-dismiss="modal"
										>
											Close
										</button>
										<button type="submit" className="btn btn-primary">
											Submit
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
}
export default AddProjectModal