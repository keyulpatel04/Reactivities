import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
}

export default function NavBar({ openForm }: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assests/logo.png' alt='Logo' style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'></Menu.Item>
                <Menu.Item>
                    <Button positive content='Create Activity' onClick={openForm}></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}