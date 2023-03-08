import {Button, Input, Form} from "semantic-ui-react";

const SearchBox = ({ searchChange, placeholder }) => {         

    return (
        <Form onSubmit={searchChange} >            
            <Input icon='search' placeholder={placeholder}  />           
            <Button color='#77797A'>Keresés</Button>
        </Form>
    );
};

export default SearchBox;