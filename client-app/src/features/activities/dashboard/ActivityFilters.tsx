import Calendar from "react-calendar";
import { Header, Menu, MenuItem } from "semantic-ui-react";

function ActivityFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <MenuItem content='All Activities'></MenuItem>
                <MenuItem content="I'm going"></MenuItem>
                <MenuItem content="I'm hosting"></MenuItem>
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}

export default ActivityFilters;