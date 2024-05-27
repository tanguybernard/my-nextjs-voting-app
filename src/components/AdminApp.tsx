//"use client"; // remove this line if you choose Pages Router
import {Admin, Resource, ListGuesser, EditGuesser, fetchUtils} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./AdminUsers";
import {adminAuthProvider} from "@/components/adminAuthProvider";
import { Dashboard } from './AdminDashboard';
import {CreateUser} from "@/components/CreateUser";
import fakeDataProvider from 'ra-data-fakerest';
import {useEffect, useState} from "react";


const getFile = async () =>
    await (
        await fetch(
            ("http://localhost:3000/server/db.json"))
    ).json();



//const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

/* <Resource name="server" /> informs react-admin
    to fetch the “server” records from the https://jsonplaceholder.typicode.com/users URL.*/
const AdminApp = () => {

    const [dataProvider, setDataProvider] = useState<any | null>(null);


    useEffect(() => {
        getFile()
            .then((data) => {
                setDataProvider(fakeDataProvider(data, true))
            });
    }, []);


    if (!dataProvider) return <p>Loading...</p>;

    return (
        <Admin
            authProvider={adminAuthProvider}
            dataProvider={dataProvider}
            dashboard={Dashboard}
        >
            <Resource
                name="users"
                list={UserList}
                edit={EditGuesser}
                create={CreateUser}
                recordRepresentation="name"
            />
        </Admin>
    );
}

export default AdminApp;