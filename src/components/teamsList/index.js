import React, {Fragment} from "react"

export default ({teams, updateTeamStatus, showFavourite, toggleShowFavourite}) => {

    const favouriteButton = (
        <div id="favourite-button-wrapper">
            <button id="favourite-button" onClick={toggleShowFavourite}>
                {`${showFavourite ? "Show all" : "Show favourite"}`}
            </button>
        </div>
    )

    const listHeader = (
        <div id="list-header" className="row">
            <span className="row-cell bold">name</span>
            <div className="row-right-wrapper">
                <span className="row-cell bold">favourite</span>
                <span className="row-cell bold">conference</span>
            </div>
        </div>
    )

    const listBody = (
        <Fragment>
            {teams.map(t => (
                <div key={`team-${t.id}`} className="row">
                    <span className="row-cell bold">{t.full_name}</span>
                    <div className="row-right-wrapper">
                        <span 
                            className={`row-cell bold pointer ${!!t.favourite ? "favourite-team" : ""}`}
                            onClick={() => updateTeamStatus(t.id)}>
                            {!!t.favourite ? "Unlike" : "Like"}
                        </span>
                        <span className="row-cell">{t.conference}</span>
                    </div>
                </div>
            ))}
        </Fragment>
    )

    return (
        <div className="content">
            {favouriteButton}
            {teams.length > 0  ? (
                <div id="list">
                    {listHeader}
                    {listBody}
                </div>
            ) : (
                <span className="bold">There are no favourite teams yet...</span>
            )}
        </div>
    )
}