import { useState } from "react"
import { useMutation } from "@apollo/client"
import { FaUser } from "react-icons/fa"
import { ADD_CLIENT } from "../mutations/clientMutations"
import { GET_CLIENTS } from "../queries/clientQueries"

const AddClientModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS
      })

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] }
      })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    addClient(name, email, phone);
    document.getElementById("addClientBtn").click();

    setName("");
    setEmail("");
    setPhone("");
  }

  return (
		<>
			<button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#addClientModal"
			>
				<div className="d-flex align-items-center">
					<FaUser className="me-2" />
					<div>Add Client</div>
				</div>
			</button>

			<div
				className="modal fade"
				id="addClientModal"
				tabIndex="-1"
				aria-labelledby="addClientModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<form onSubmit={handleSubmit}>
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="addClientModalLabel">
									Add Client
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
									id="addClientBtn"
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
	);
}
export default AddClientModal