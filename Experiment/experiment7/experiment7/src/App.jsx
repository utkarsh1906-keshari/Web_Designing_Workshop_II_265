import StudentCard from "./StudentCard";

function App() {
  return (
    <div className="App_Class">
    <h1>Student Information</h1>
    
    <div className="container">
    <StudentCard name="Rahul Sharma" course="Computer Science" marks="85"/></div>
    <div className="container">
    <StudentCard name="Anita Verma" course="Information Technology" marks="92"/>
    </div>
    <div className="container">
    <StudentCard name="Rohan Gupta" course="Electronics" marks="78"/>
    </div>
    </div>
  );
  
}
export default App;