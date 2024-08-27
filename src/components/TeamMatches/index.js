// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {teamMatchesData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatchData()
  }

  getConvertedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const responseData = await response.json()
    const convertedData = {
      teamBannerUrl: responseData.team_banner_url,
      latestMatch: this.getConvertedData(responseData.latest_match_details),
      recentMatches: responseData.recent_matches.map(matchItem =>
        this.getConvertedData(matchItem),
      ),
    }
    this.setState({teamMatchesData: convertedData, isLoading: false})
  }

  renderRecentMatches = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent-matches-container">
        {recentMatches.map(matchItem => (
          <MatchCard key={matchItem.id} matchCardDetails={matchItem} />
        ))}
      </ul>
    )
  }

  renderLatestMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatch} = teamMatchesData

    return (
      <div className="match-container">
        <img className="banner" src={teamBannerUrl} alt="team banner" />
        <LatestMatch latestMatchDetails={latestMatch} />
        {this.renderRecentMatches()}
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container-1">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  getClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SRH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const matchClassName = `container ${this.getClassName()}`

    return (
      <div className={matchClassName}>
        {isLoading ? this.renderLoader() : this.renderLatestMatches()}
      </div>
    )
  }
}

export default TeamMatches
