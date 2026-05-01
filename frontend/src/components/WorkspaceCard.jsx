import { ArrowRight, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

const WorkspaceCard = ({ workspace }) => {
  return (
    <article className="workspace-card">
      <div>
        <h3>{workspace.title}</h3>
        <p>{workspace.description || "No description added."}</p>
      </div>
      <div className="workspace-card-footer">
        <span>
          <UsersRound size={16} />
          {workspace.members?.length || 0} members
        </span>
        <Link className="icon-link" to={`/workspaces/${workspace._id}`}>
          <span>Open</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
};

export default WorkspaceCard;
