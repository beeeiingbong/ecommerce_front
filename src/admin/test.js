import React, {useState} from 'react';
import Layout from '../core/Layout';

const test =()=> {

    // const [inputs, setInputs] = useState({})
    
    // const handleInputChange = (event) => {
    //     event.persist();
    //     setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    //   }
   
    //   const test_form= () => {
    //     return(<form>
    //     <div>
    //       <label>First Name</label>
    //       <input type="text" name="firstName" onChange={handleInputChange} value={inputs.firstName} required />
    //       <label>Last Name</label>
    //       <input type="text" name="lastName" onChange={handleInputChange} value={inputs.lastName} required />
    //     </div>
    //     <div>
    //       <label>Email Address</label>
    //       <input type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
    //     </div>
    //     <div>
    //       <label>Password</label>
    //       <input type="password" name="password1" onChange={handleInputChange} value={inputs.password1}/>
    //     </div>
    //     <div>
    //       <label>Re-enter Password</label>
    //       <input type="password" name="password2" onChange={handleInputChange} value={inputs.password2}/>
    //     </div>
    //     <button type="submit">Sign Up</button>
    //   </form>)
    //     }

    return (
        <Layout title ="Testing this Page"
        description = {"test Page"}
        >
    
    <div className="row">
        <div className="col-md-8 offset-md-2">
                {/* {test_form()} */}
        </div>

    </div>

    </Layout>
    )

}
export default test;