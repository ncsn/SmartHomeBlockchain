import { Button, Image, Label, Item, Icon, Divider, Grid } from "semantic-ui-react";
import Layout from "../../components/layout/Layout";
import device from "../../ethereum/device";
import { Link } from "../../routes";
import userValidate from "../../components/validate/userValidate";


function DeviceShow(props) {

  if (userValidate()) {
    return (
      <Layout>
        <Link route="/devices/">
          <Button animated>
            <Button.Content visible>Vissza</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow left' />
            </Button.Content>
          </Button>
        </Link>

        <Grid columns={2} divided>
          <Grid.Column>
            <Image centered src={`/deviceImages/${props.deviceItem.deviceAddress}.png`} size="large" />
          </Grid.Column>
          <Grid.Column>
            <Item>
              <Grid.Row><Item.Header>
                <h2>{props.deviceItem.name}</h2>
              </Item.Header></Grid.Row>
              <Grid.Row><Divider /></Grid.Row>
              <Grid.Row><Item.Description>
                <Label color='teal' ribbon size='medium' style={{ left: '0' }}>Mac Address</Label>
                <p style={{ padding: '4%', marginLeft: '5%' }}>{props.deviceItem.mac}</p>
              </Item.Description></Grid.Row>
              <Grid.Row><Item.Description>
                <Label color='teal' ribbon size='medium' style={{ left: '0' }}>Firmware</Label>
                <p style={{ padding: '4%', marginLeft: '5%' }}>{props.deviceItem.firmware} </p>
              </Item.Description></Grid.Row>
              <Grid.Row><Item.Description>
                <Label color='teal' ribbon size='medium' style={{ left: '0' }}>Típus</Label>
                <p style={{ padding: '4%', marginLeft: '5%' }}>{props.deviceItem.tipus}</p>
              </Item.Description></Grid.Row>
              <Grid.Row><Item.Description>
                <Label color='teal' ribbon size='medium' style={{ left: '0' }}>Státusz</Label>
                <p style={{ padding: '4%', marginLeft: '5%' }}>{props.deviceItem.status}</p>
              </Item.Description></Grid.Row>
                <Grid.Row><Item.Description>
                 <Label color='teal' ribbon size='medium' style={{ left: '0' }}>Naplózás(Kitöltésre vár)</Label>
                  <p style={{ padding: '4%', marginLeft: '5%' }}>{props.deviceItem.xyz}</p>
              </Item.Description></Grid.Row>
              <Grid.Row><Item.Description>
                <Label color='black' ribbon size='medium' style={{ left: '0' }}>Tulajdonos</Label>
                  <p style={{ padding: '4%', marginLeft: '5%' }}>{props.deviceItem.owner}</p>
              </Item.Description></Grid.Row>
            </Item>
          </Grid.Column>

        </Grid>

      </Layout>
    );
  }
  else {
    return (
      <Layout>
        <Link route="/devices/">
          <Button animated>
            <Button.Content visible>Vissza</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow left' />
            </Button.Content>
          </Button>
        </Link>

        <Grid columns={2} divided>
          <Grid.Column>
            <Image centered src={`/deviceImages/${props.deviceItem.deviceAddress}.png`} size="large" />
          </Grid.Column>
          <Grid.Column>
            <Item>
              <Grid.Row><Item.Header>
                <h3>{props.deviceItem.name}</h3>
              </Item.Header></Grid.Row>
              <Grid.Row><Divider /></Grid.Row>
              
              <Grid.Row><Item.Description>
                <Label color='teal' ribbon size='medium' style={{ left: '0' }}>Mac Address</Label>
                <p style={{ padding: '4%', marginLeft: '5%' }}>{props.deviceItem.mac}</p>
              </Item.Description></Grid.Row>
              <Grid.Row><Item.Description>
                <Label color='teal' ribbon size='medium' style={{ left: '0' }}>Firmware</Label>
               <p style={{ padding: '4%', marginLeft: '5%' }}>{props.deviceItem.firmware} </p>
              </Item.Description></Grid.Row>
              <Grid.Row><Item.Description>
                <Label color='teal' ribbon size='medium' style={{ left: '0' }}>Típus</Label>
                <p style={{ padding: '4%', marginLeft: '5%' }}>{props.deviceItem.tipus}</p>
              </Item.Description></Grid.Row>
              <Grid.Row><Item.Description>
                <Label color='teal' ribbon size='medium' style={{ left: '0' }}>Státusz</Label>
                <p style={{ padding: '4%', marginLeft: '5%' }}>{props.deviceItem.status}</p>
              </Item.Description></Grid.Row>
              <Grid.Row><Item.Description>
                <Label color='black' ribbon size='medium' style={{ left: '0' }}>Tulajdonos</Label>
                <p style={{ padding: '4%', marginLeft: '5%' }}>{props.deviceItem.owner}</p>
              </Item.Description></Grid.Row>
              <Grid.Row><Item.Description>
                <Button animated color="green" floated="right" onClick={onBuy}>
                  <Button.Content visible>Vásárlás</Button.Content>
                  <Button.Content hidden>
                    <Icon name='shopping bag' />
                  </Button.Content>
                </Button>
              </Item.Description></Grid.Row>
            </Item>
          </Grid.Column>

        </Grid>


      </Layout>
    );
  }


}

DeviceShow.getInitialProps = async (props) => {
    const deviceItem = await device.methods.devices(props.query.address).call();

    return { deviceItem };
}

export default DeviceShow;
