import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { DELETE_PROJECT } from "../mutations/projectMutations"
import { useMutation } from "@apollo/client"


const DeleteProjectButton = ({ projectId, projectName }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
  })

  const handleClick = () => {
    let text = `Are you sure you want to delete "${projectName}" Project?`;
    if (window.confirm(text) === true) {
			deleteProject();
      navigate("/");
		}
  }

  return (
    <button className="btn btn-danger" onClick={handleClick}>
      <FaTrash className="icon" /> Delete Project
    </button>
	);
}
export default DeleteProjectButton