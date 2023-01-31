import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { EDIT_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const EditClientModal = ({ client }) => {
  const [name, setName] = useState(client.name);
	const [email, setEmail] = useState(client.email);
	const [phone, setPhone] = useState(client.phone);

  const [updateClient] = useMutation(EDIT_CLIENT, {
    variables: { id: client.id, name, email, phone },
    refetchQueries: [{ query: GET_CLIENTS }]
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    updateClient(name, email, phone);
    document.getElementById(`editClientBtn${client.id}`).click();
  }

  return (
		<>
			<button
				className="btn btn-primary btn-sm me-2"
				data-bs-toggle="modal"
				data-bs-target={`#editClientModal${client.id}`}
			>
				<FaEdit />
			</button>

			<div
				className="modal fade"
				id={`editClientModal${client.id}`}
				tabIndex="-1"
				aria-labelledby={`editClientModalLabel${client.id}`}
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<form onSubmit={handleSubmit}>
						<div className="modal-content">
							<div className="modal-header">
								<h1
									className="modal-title fs-5"
									id={`editClientModalLabel${client.id}`}
								>
									Edit Client
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
									<label htmlFor="email" className="form-label">
										Email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										className="form-control"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required={true}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="phone" className="form-label">
										Phone
									</label>
									<input
										type="tel"
										name="phone"
										id="phone"
										className="form-control"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										required={true}
									/>
								</div>
							</div>
							<div className="modal-footer">
								<button
									id={`editClientBtn${client.id}`}
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
export default EditClientModal