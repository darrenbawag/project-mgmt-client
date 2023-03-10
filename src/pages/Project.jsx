import { Link, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_PROJECT } from "../queries/projectQueries"
import Spinner from "../components/Spinner"
import ClientInfo from "../components/ClientInfo"
import DeleteProjectButton from "../components/DeleteProjectButton"
import EditProjectButton from "../components/EditProjectButton"

const Project = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  })

  if(loading) return <Spinner />
  if(error) return <p>Something went wrong</p>

  return (
		<>
			{!loading && !error && (
				<div
					className="mx-auto w-100 card p-4 p-lg-5"
					style={{ maxWidth: 700 }}
				>
					<Link
						to="/"
						className="btn btn-secondary d-inline ms-auto px-3 mb-3"
					>
						Back
					</Link>

					<h1>{data.project.name}</h1>
					<p>{data.project.description}</p>

					<h5 className="mt-3">Project Status</h5>
					<p className="lead fw-normal">{data.project.status}</p>

					<ClientInfo client={data.project.clientId} />

					<div className="d-flex gap-3 mt-5 ms-auto">
						<EditProjectButton project={data.project} />
						<DeleteProjectButton
							projectId={data.project.id}
							projectName={data.project.name}
						/>
					</div>
				</div>
			)}
		</>
	);
}
export default Project