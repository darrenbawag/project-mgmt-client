import { FaTrash } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { DELETE_CLIENT } from "../mutations/clientMutations"
import { GET_CLIENTS } from "../queries/clientQueries"
import { GET_PROJECTS } from "../queries/projectQueries"
import EditClientModal from "./EditClientModal"

const Client = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({
    //     query: GET_CLIENTS
    //   })
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter(client => client.id !== deleteClient.id) }
    //   })
    // },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
  })

  const handleClick = () => {
    let text = `Are you sure you want to delete "${client.name}"?`;
    if (window.confirm(text) === true) {
			deleteClient();
		}
  }

  return (
		<tr>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td className="d-flex justify-content-end">
				<EditClientModal client={client} />
				<button className="btn btn-danger btn-sm" onClick={handleClick}>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
}
export default Client