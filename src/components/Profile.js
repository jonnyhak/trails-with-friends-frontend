import React from 'react'
import {connect} from 'react-redux'
import {getTrails, addUserTrail, deleteUserTrail} from '../redux/actions'

class Profile extends React.Component {
    
    myTrails = () => {
        let currentProfileTrails = this.props.user_trails.filter(userTrail => userTrail.user.user_id === this.props.userObj.id)

        currentProfileTrails.sort((a, b) => new Date(b.date) - new Date(a.date))


        return currentProfileTrails.map(userTrail => {
            return (
                <li>{userTrail.trail.trail_name}
                    <br /> 
                    Date: {userTrail.date}
                    {this.props.userObj.id === this.props.currentUser.user.id ?
                        <button onClick={this.onDelete} value={userTrail.id}>Delete Trail</button> :
                        null
                    }
                </li>
            )
        })
    }

    totalMiles = () => {
        let totalMiles = 0;
        this.props.userObj.trails.forEach(userTrail => totalMiles += userTrail.trail_length)
    return <h3>{this.props.userObj.name} has walked {totalMiles} miles</h3>
    }

    onDelete = (e) => {
        
        let userTrailId = parseInt(e.target.value)
        this.props.deleteUserTrail(userTrailId)
    }

    componentDidMount(){
        this.props.fetchTrails()
    }

    dropDownTrail(){
        return this.props.trails.map(trail => {
               return <option value={trail.id}>{trail.name}</option>
            })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const trailId = parseInt(e.target.trails.value)
        let date = new Date()

        this.props.addUserTrail({ 
            trail_id: trailId,
            user_id: this.props.currentUser.user.id,
            date: date
        })
    }

    render(){
        console.log(this.props.user_trails)
        return(
            
            <div>
                <h2>{this.props.userObj.name}</h2>
                <h2>{this.props.userObj.age} years old</h2>
                <h2>from {this.props.userObj.city}</h2>
                <h2>Trails:</h2>
                {this.props.currentUser ? 
                    <> 
                        {this.myTrails()}
                        {this.totalMiles()}
                        {this.props.userObj.id === this.props.currentUser.user.id ? 
                            <>
                            <h3>Add new trail</h3>
                            <form onSubmit={this.onSubmit}>
                                <select name="trails">
                                    {this.dropDownTrail()}
                                </select>
                                <button>Add Trail</button>
                            </form>
                            </>
                        : null
                        }
                    </>
                : null}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("Current redux state", state)
    return { 
        trails: state.trails,
        user_trails: state.user_trails 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrails: () => dispatch(getTrails()),
        addUserTrail: (userTrailObj) => dispatch(addUserTrail(userTrailObj)),
        deleteUserTrail: (userTrailId) => dispatch(deleteUserTrail(userTrailId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)