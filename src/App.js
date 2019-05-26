import React, {useEffect, useState, Fragment} from "react"
import axios from "axios"
import Header from "./components/header"
import TeamsList from "./components/teamsList"
import Loader from "./components/loader"

const API_URL = "https://www.balldontlie.io/api/v1/teams"

export default () => {
    const [data, setState] = useState({teams: [], isFetching: true})

    useEffect(() => {
        const fetchUsersWithAxios = () => {
            axios.get(API_URL)
                .then(response => {
                const {data: {data: teams}} = response
                setState({teams: teams, isFetching: false})
            })
            .catch(e => {
                console.log(e)
                setState({teams:[], isFetching: false})
            })
        }
        fetchUsersWithAxios()
    }, [])

    const updateTeamStatus = (id) => {
        const updatedTeams = data.teams.map(t => {
            let team = {...t}
            if (team.id === id) {
                team.favourite = !t.favourite
            }
            return team
        })
        setState({...data, teams: updatedTeams})
    }

    const toggleShowFavourite = () => {
        setState({...data, showFavourite: !data.showFavourite})
    }

    const teamsToShow = data.showFavourite ? data.teams.filter(t => t.favourite) : data.teams

    return (
        <Fragment>
            <Header/>
            {data.isFetching ? <Loader/> : (
                <TeamsList
                    teams={teamsToShow}
                    showFavourite={!!data.showFavourite}
                    toggleShowFavourite={toggleShowFavourite}
                    updateTeamStatus={updateTeamStatus}/>
            )}
        </Fragment>
    )
}
