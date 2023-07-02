import axios from "axios";
import { useState, useEffect } from "react";
function Items() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/v2/users"
        );
        setUsers(response.data);
        console.log(response.data);
    }

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/v2/users",
                {
                    name: name,
                    email: email,
                    password: password
                });

            alert("User Registration successfully!!");
            setId("");
            setName("");
            setEmail("");
            setPassword("");
            Load();
        } catch (err) {
            alert("User Registration Failed!!");
        }
    }

    async function editItem(users) {
        setName(users.name);
        setEmail(users.email);
        setPassword(users.password);
        setId(users.id);
    }

    async function deleteItem(id) {
        await axios.delete("http://127.0.0.1:8000/api/v2/users/" + id);
        alert("User Deleted Successfully!!");
        Load();
    }

    async function update(event) {
        event.preventDefault();

        try {
            await axios.put("http://127.0.0.1:8000/api/v2/users/" + users.find(user => user.id === id).id || id, {
                id: id,
                name: name,
                email: email,
                password: password
            });

            alert("User Updated successfully!!");
            setId("");
            setName("");
            setEmail("");
            setPassword("");
            Load();
        } catch (error) {
            alert("User Updation Failed!!");
        }
    }

    return (
        <div class="container">
    <form>
        <div class="mb-3">
            <h1>Add and Update User Here</h1>
            <label for="user_id" class="form-label"></label>
            <input type="text" class="form-control" id="user_id" hidden
                value={id}
                onChange={(event) => {
                    setId(event.target.value);
                }}
            />
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">User Name</label>
            <input type="text" class="form-control" id="name" placeholder="Enter Your Name"
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Enter Your Email"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
            />
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Enter Your Password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
        </div>
        <button class="btn btn-primary" onClick={save}>Register</button>
        <button class="btn btn-primary" onClick={update}>Update</button>
    </form>

    <table class="table table-striped table-bordered">
        <thead class="table-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Options</th>
            </tr>
        </thead>
        <tbody>
            {users.map((item) => {
                return (
                    <tr>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>
                            <button type="button" class="btn btn-warning" onClick={() => editItem(item)}>Edit</button>
                            <button type="button" class="btn btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>

    );
}

export default Items;