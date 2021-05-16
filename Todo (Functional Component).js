import { useState } from 'react'

export default function Todo() {
    const [getTodo, setgetTodo] = useState({ todo: '' })
    const [point, setpoint] = useState('')
    const [doneIndex, setDoneIndex] = useState(false)
    const [btn, setbtn] = useState('Add Todo');
    const [addTodo, setaddTodo] = useState([])

    const handleGetTodo = e => {
        e.preventDefault()
        setgetTodo({ todo: e.target.value })
    }

    const addTodoInList = () => {
        const add = [...addTodo]

        Array.prototype.update = () => {
            add[point] = getTodo.todo
        }

        if (btn === 'Update') {
            add.update()
            setaddTodo(add)
        }
        else {
            add.push(getTodo.todo)
            setaddTodo(add)
        }

        setgetTodo({
            todo: ''
        })
        setbtn('Add todo')
    }

    const deleteAll = () => {
        setaddTodo([])
    }

    const handleDelete = index => {
        const deleteTodo = [...addTodo]
        deleteTodo.splice(index, 1)
        setaddTodo(deleteTodo)
    }

    const handleEdit = index => {
        const editTodo = [...addTodo]
        const editted = editTodo.slice(index, index + 1)
        setgetTodo({ todo: editted })
        setpoint(index)
        setbtn('Update')
    }

    const done = (index, todo) => {
        const list = [...addTodo]
        if (list[index] === todo) {
            return setDoneIndex(!doneIndex)
        }
    }

    return (
        <>
            <h1>TODO APP</h1>

            <input placeholder='Type your todos' value={getTodo.todo} onChange={handleGetTodo} />
            <button disabled={!getTodo.todo} onClick={addTodoInList}>{btn}</button>
            <button onClick={deleteAll}>Delete All</button>



            <ol>
                {
                    addTodo.map((todo, index) => {
                        return (
                            <>
                                {doneIndex ?
                                    <li style={{ textDecoration: 'line-through' }} key={index} >{todo}</li>
                                    :
                                    <li key={index} >{todo}</li>
                                }

                                <button onClick={() => done(index, todo)}>Done</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                            </>
                        )
                    })
                }
            </ol>
        </>
    )
}
