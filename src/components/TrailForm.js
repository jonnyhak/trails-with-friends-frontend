import React from 'react'
import { connect } from 'react-redux'
import { addTrail } from '../redux/actions'

class TrailForm extends React.Component {

    state = {
        name: "",
        length: "",
        location: "",
        duration: "",
        difficulty: "",
        image_url: ""
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)

        // this.setState({
        //     name: "",
        //     length: "",
        //     location: "",
        //     duration: "",
        //     difficulty: ""
        // })
    }
    
    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onChange}/>
                <input type="text" placeholder="length" name="length" value={this.state.length} onChange={this.onChange}/>
                <input type="text" placeholder="location" name="location" value={this.state.location} onChange={this.onChange}/>
                <input type="text" placeholder="duration" name="duration" value={this.state.duration} onChange={this.onChange}/>
                <input type="text" placeholder="difficulty" name="difficulty" value={this.state.difficulty} onChange={this.onChange}/>
                <input type="text" placeholder="image URL" name="image_url" value={this.state.image_url} onChange={this.onChange}/>
                <button>Submit</button>
            </form>
        )
    }
}

const mdp = (dispatch) => {
    return {submitHandler: (trailObj) => dispatch(addTrail(trailObj)) }
}

export default connect(null, mdp)(TrailForm)