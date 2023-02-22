import { Card, Image } from "semantic-ui-react";
import { Link } from "../../routes";
import userValidate from "../validate/userValidate";

function UserCards(props) {
    const { name, mac, firmware, status, deviceAddress } = props;
    
    if(!userValidate()) {
        return (
        
            <Link route={`/devices/${deviceAddress}`}>
                <Card as='a' style={{marginTop: "20px"}}>
                    <Image src={`/deviceImages/${deviceAddress}.png`} centered style={{height : "200px", width : "200px"}}/>
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta textAlign="right">
                            <span className='date'>{mac}</span>
                        </Card.Meta>
                        <Card.Description>
                            {firmware}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra textAlign="center"> 
                        {status}
                    </Card.Content>
                    
                </Card>
            </Link>
    
        );
    }

}



export default UserCards;
