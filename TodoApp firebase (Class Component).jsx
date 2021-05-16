import React, { Component } from 'react';
import firebase from '../config/Firebase'


class TodoApp extends Component {
    constructor() {
        super()
        this.state = {
            todos: [{ title: '', edit: false }],
            value: ''
        }
    }
    addItems = () => {
        let val = this.state.value
        let obj = { title: val }
        firebase.database().ref('todos').child("/").push(obj)
        let getData = firebase.database().ref('todos').on('child_added', (data) => {

            this.setState({
                todos: [...this.state.todos, obj],
                value: ''
            })
        })

    }
    deltAll = () => {
        this.setState({
            todos: []
        })
    }
    editBtn = (index) => {
        this.state.todos[index].edit = true
        this.setState({
            todos: this.state.todos
        })
    }
    updateBtn = (index) => {
        this.state.todos[index].edit = false
        let val = this.state.value
        this.setState({
            todos: this.state.todos
        })
    }
    handleBtn = (e, index) => {
        this.state.todos[index].title = e.target.value
        this.setState({
            todos: this.state.todos
        })
    }
    deleteBtn = (index) => {
        this.state.todos.splice(index, 1)
        this.setState({
            todos: this.state.todos
        })

    }
    render() {
        let { todos, value } = this.state
        return (
            <div>
                <input type="text" placeholder='enter value' value={value} onChange={(e) => this.setState({ value: e.target.value })} />
                <button onClick={this.addItems} >Add items</button>
                <button onClick={this.deltAll} >Delete All</button>
                <ul>
                    {
                        todos.map((v, i) => {
                            return (
                                <div>
                                    <li key={i}>
                                        {v.edit ? <input type='text' placeholder={v.title} onChange={(e) => this.handleBtn(e, i)} /> : v.title}
                                    </li>
                                    {v.edit ?
                                        <button onClick={() => this.updateBtn(i)}>Update</button>
                                        :
                                        <button onClick={() => this.editBtn(i)}>Edit</button>
                                    }
                                    <button onClick={() => this.deleteBtn(i)}>delt</button>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default TodoApp