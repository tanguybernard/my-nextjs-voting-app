//"use client"; // remove this line if you choose Pages Router
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./AdminUsers";
import {adminAuthProvider} from "@/components/adminAuthProvider";
import { Dashboard } from './AdminDashboard';



const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

/* <Resource name="users" /> informs react-admin
    to fetch the “users” records from the https://jsonplaceholder.typicode.com/users URL.*/
const AdminApp = () => (
    <Admin
        authProvider={adminAuthProvider}
        dataProvider={dataProvider}
        dashboard={Dashboard}
    >
        <Resource
            name="users"
            list={UserList}
            edit={EditGuesser}
            recordRepresentation="name"
        />
        <Resource
            name="posts"
            list={ListGuesser}
            edit={EditGuesser}
            recordRepresentation="title"
        />
        <Resource name="comments" list={ListGuesser} edit={EditGuesser} />
    </Admin>
);

export default AdminApp;