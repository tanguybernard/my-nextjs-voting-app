import {Create, ReferenceInput, SimpleForm, TextInput} from "react-admin";

export const CreateUser = () => (
      <Create>
            <SimpleForm>
              <TextInput source="name" />
              <TextInput source="email" />
              <TextInput source="phone" />
            </SimpleForm>
          </Create>
    );