const ProjectCard = ({ project }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>
            <a href={`/projects/${project.id}`} className="btn btn-secondary">View</a>
          </div>
          <p className="small mb-0">Status: <span className="fw-semibold">{project.status}</span></p>
          <p className="small">Client: <span className="fw-semibold">{project.client.name}</span></p>
        </div>
      </div>
    </div>
  )
}
export default ProjectCard