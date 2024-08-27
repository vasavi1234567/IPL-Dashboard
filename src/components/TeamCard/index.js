// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamCardDetails} = props
  const {id, name, teamImageUrl} = teamCardDetails

  return (
    <li className="team-list">
      <Link className="link" to={`/team-matches/${id}`}>
        <img className="team-logo" src={teamImageUrl} alt={name} />
        <p className="name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
