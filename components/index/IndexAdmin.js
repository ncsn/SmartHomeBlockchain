import { Card, Image, Grid } from 'semantic-ui-react';
import Layout from '../layout/Layout';
import { Link } from "../../routes";

function IndexAdmin() {
  return (
    <Layout>
      <Grid columns={3} padded textAlign='center'>
        <Grid.Row>
          <Grid.Column>
            <Link route="/devices">
              <Card as='a' centered className="indexCards">
                <Image
                  src="/index/devices.png"
                  wrapped ui={false}
                />
                <Card.Content>
                  <Card.Header>Eszközök</Card.Header>
                </Card.Content>
              </Card>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link route="/firmwares">
              <Card as='a' centered className='cards'>
                <Image
                  src="/index/firmware.png"
                  wrapped ui={false}
                />
                <Card.Content>
                  <Card.Header>Firmware Update</Card.Header>
                </Card.Content>
              </Card>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    </Layout>
  );


}

export default IndexAdmin;
