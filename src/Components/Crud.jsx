import React from "react";
import { Component } from "react";
class CRUDAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      formValue: {
        name: "",
        age: "",
        joindate: "",
      },
    };
  }
  componentDidMount() {
    this.getMethod();
  }
  getMethod = () => {
    fetch(`http://localhost:5000/api/get`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) =>
        this.setState({
          Data: data,
          formValue: {
            name: "",
            age: "",
            joindate: "",
          },
          id: "",
        })
      )
      .catch((error) => {
        console.log("error fetching data:", error);
      });
  };
  handleEdit = (product, id) => {
    this.setState({
      formValue: product,
      id: id,
    });
  };
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      formValue: {
        ...this.state.formValue,
        [name]: value,
      },
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.id) {
      fetch(`http://localhost:5000/api/put/${this.state.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.formValue),
      })
        .then((response) => response.json())
        .then((data) => (data ? this.getMethod() : console.log(data, "EDIT")))
        .catch((err) => {
          console.log(err);
        });
    } else if (this.state.formValue.name) {
      fetch("http://localhost:5000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.formValue),
      })
        .then((response) => response.json())
        .then((data) => (data ? this.getMethod() : console.log(data, "POST")))
        .catch((err) => console.log(err));
    } else {
      console.log("something went wrong");
    }
  };
  handleDelete = (id) => {
    fetch(`http://localhost:5000/api/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => (data ? this.getMethod() : console.log(data, "DELETE")))
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      < >
      <div className="width-2/4 h-screen mt-20">
        <h1 className="text-4xl font-bold text-center">Employee Details</h1>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w- shadow-xl p-10 ">
            <form action="">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={this.state.formValue.name}
                  onChange={this.handleChange}
                  placeholder="Name"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base 
                  font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Age
                </label>
                <input
                  type="text"
                  required
                  name="age"
                  value={this.state.formValue.age}
                  onChange={this.handleChange}
                  placeholder="Age"
                  className="w-full rounded-md border border-[rgb(224,224,224)] bg-white py-3 px-6 text-base
                   font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="mb-3 block txt-base font-medium text-[#07074D]"
                >
                  JoinDate
                </label>
                <input
                  type="date"
                  required
                  name="joindate"
                  value={this.state.formValue.joindate}
                  onChange={this.handleChange}
                  placeholder="date"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base
                   font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div>
                <button
                  onClick={(e) => this.handleSubmit(e)}
                  className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold
                   text-white outline-none"
                >
                  {this.state.id ? "save" : "submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <h1 className="text-2xl text-center">Get Method</h1>
        <div>
          <div className="flex justify-center">
            <table className="text-center table-auto border-collapse">
              <thead className="text-2xl font-medium">
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>join date</th>
                  <th>edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Data.map((product) => {
                  return (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.age}</td>
                      <td>{product.joindate}</td>
                      <td>
                        <button
                          onClick={() => this.handleEdit(product, product._id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button onClick={() => this.handleDelete(product._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </>
    );
  }
}

export default CRUDAPI;
