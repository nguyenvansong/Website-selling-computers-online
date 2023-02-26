import SideBar from "../Components/SideBar/SideBar"
function Admin({children}){
    return (
        <>
            <SideBar />
            <div>
                {children}
            </div>
        </>
    )
}

export default Admin;