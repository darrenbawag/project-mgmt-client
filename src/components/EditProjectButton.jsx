import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

const EditProjectButton = ({ project }) => {
  const statusObj = {
    "Not Started": "new",
    "In Progress": "progress",
    "Completed": "completed"
  }

  const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [clientId, setClientId] = useState(project.clientId.id);
	const [status, setStatus] = useState(statusObj[project.status]);

  const { loading, error, data } = useQuery(GET_CLIENTS)

  const [updateProject] = useMutation(EDIT_PROJECT, {
    variables: { id: project.id, name, description, status, clientId },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(name, description, status, clientId);
    document.getElementById("projectBtn").click();
  }

  if(loading) return null;
  if(error) return (
		<button type="button" className="btn btn-danger" disabled={true}>
			Something went wrong
		</button>
	);

  return (
		<>
			<button
				type="button"
				className="btn btn-secondary"
				data-bs-toggle="modal"
				data-bs-target="#editProjectModal"
			>
				<div className="d-flex align-items-center">
					<FaEdit className="me-2" />
					<div>Edit Project</div>
				</div>
			</button>

			<div
				className="modal fade"
				id="editProjectModal"
				tabIndex="-1"
				aria-labelledby="editProjectModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<form onSubmit={handleSubmit}>
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="editProjectModalLabel">
									Edit Project
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
									Save Changes
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
export default EditProjectButton