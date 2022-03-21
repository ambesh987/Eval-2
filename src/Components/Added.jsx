import React from "react";

function App() {
  const [data, setData] = React.useState({
    name: "",
    gender: "",
    department: "",
    role: "",
    salary: 0,
  });
  const [dataArray, setDataArray] = React.useState([]);
  const [filterArray, setFilterArray] = React.useState([]);
  const  handleChange = (e) => {
    let { value, checked, name, type } = e.target;
    setData((oldData) => {
      return {
        ...oldData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
  React.useEffect(() => {
    getData();
  },[])
  function getData(){
    fetch(`http://localhost:3001/employee`)
    .then((res) => res.json())
    .then((res) => setDataArray(res))
    .catch((err) => console.log(err));
    displayData(dataArray);
  }
  var showData ="";
  var displayData = (arr) => {
   showData = arr.map((o) => {
      return (
        <div style={{border:"black"}} key={o.id}>
          <div>Name: {o.name}</div>
        <div>Gender: {o.gender}</div>
        <div>Department: {o.department}</div>
        <div>Role: {o.role}</div>
        <div>Salary: {o.salary}</div>
        <br />
        </div>
      )
  })
  }
  // console.log(data);
function addToServer(){
    const payload = JSON.stringify(data);
    fetch(`http://localhost:3001/employee`, {
      method:'POST',
      body: payload,
      headers: {
        'content-type': 'application/json'
      }
    }).then(() => {
      getData();
    })
}
function filterResult(val) {
 var temp = dataArray.filter((o) => {
   return  val === o.department
  })
  console.log(temp)
  setFilterArray(temp);
  displayData(filterArray);
}
  return (
    <div className="App">
      <input
        name="name"
        type="text"
        value={data.name}
        placeholder="enter Name"
        onChange={handleChange}
      />
     <br />
      <input
        name="gender"
        type="text"
        value={data.gender}
        placeholder="enter Gender"
        onChange={handleChange}
      />
      <br />
      <input
        name="department"
        type="text"
        value={data.department}
        placeholder="enter Department"
        onChange={handleChange}
      />
      <br />
      <input
        name="role"
        type="text"
        value={data.role}
        placeholder="enter Role"
        onChange={handleChange}
      />
      <br />
      <input
        name="salary"
        type="text"
        value={data.salary}
        placeholder="enter Salary"
        onChange={handleChange}
      />
      <br />
      <button onClick={addToServer}>ADD EMPLOYEE</button>
      <hr/>
      <button onClick={() => filterResult(1)}>Show All Department</button>
      <button onClick={() => filterResult("Finance")}>Show Finance</button>
      <button onClick={() => filterResult("Marketing")}>Show Marketing</button>
      <button onClick={() => filterResult("HR")}>Show HR</button>
      <button onClick={() => filterResult("IT")}>Show IT</button>
      <hr />
      <div>{showData}</div>
    </div>
  );
}
export default App;