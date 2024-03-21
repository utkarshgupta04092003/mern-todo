import { Link } from "react-router-dom";
function Header(){


    return(

        <div className="border border-gray-600 flex justify-between w-full text-xl font-bold py-5 px-2 w-1/2">
            <div className="left ">
                Task Tracker
            </div>
            <div className="right w-1/4">
                <ul className="flex w-full justify-between  underline">
                    <li className="">
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/addTask">Add Task</Link>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Header;