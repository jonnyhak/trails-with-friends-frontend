
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

class Navbar extends Component {
    
    state = {
        refresh: ""
    }
    
    localLogout = (e) => {
        console.log(this.props)
        this.props.logout()
    }
    
    render() {
        console.log(this.props)
        return (
            <div>
                <NavLink to="/trails">
                    <span>Trails</span>
                </NavLink>
                <NavLink to="/">
                    <span>Home</span>
                </NavLink>
                {this.props.user ? 
                    <>
                    <NavLink to={`/users/${this.props.user.user.id}`}>
                        <span>Hello {this.props.user.user.name}</span>
                    </NavLink>
                    <span onClick={this.localLogout}>Logout</span>
                    </>
                 : 
                    <>
                    <NavLink to={'/users/new'}>
                        Signup
                    </NavLink>
                    <NavLink to={'/'}>
                        Login
                    </NavLink>
                    </>
                }
            </div>
        )
    }
}



// connect(msp)

export default withRouter( Navbar )

